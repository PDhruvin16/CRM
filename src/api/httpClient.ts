import AsyncStorage from '@react-native-async-storage/async-storage';
import ENDPOINTS from './endpoints';
import Config from 'react-native-config';

const ENV_BASE_URL = (Config && (Config as any).BASE_URL) || 'http://192.168.7.7:8005';

function generateCurl(config: any) {
  const method = (config.method || 'GET').toUpperCase();
  const parts: string[] = [`curl -X ${method}`];

  const base = (config.baseURL ?? ENV_BASE_URL).replace(/\/$/, '');
  const url = config.url?.startsWith('http') ? config.url : `${base}${config.url}`;
  parts.push(`"${url}"`);

  const headers = config.headers || {};
  Object.keys(headers).forEach((key) => {
    const value = headers[key];
    if (typeof value !== 'undefined') {
      parts.push(`-H "${key}: ${String(value)}"`);
    }
  });

  if (typeof config.body !== 'undefined' && config.body !== null) {
    let data = config.body;
    try {
      if (typeof data === 'string') {
        try {
          const parsed = JSON.parse(data);
          data = JSON.stringify(parsed);
        } catch (_) {
          // leave as-is
        }
      } else if (typeof data === 'object' && !(data instanceof FormData)) {
        data = JSON.stringify(data);
      }
      parts.push(`-d '${data}'`);
    } catch (err) {
      console.warn('Could not serialize request data for cURL:', err);
    }
  }

  return parts.join(' \\\n+  ');
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  baseURL?: string;
  url: string;
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  _retry?: boolean;
}

async function request<T = any>(options: RequestOptions): Promise<T> {
  const baseURL = (options.baseURL ?? ENV_BASE_URL).replace(/\/$/, '');
  const url = options.url.startsWith('http') ? options.url : `${baseURL}${options.url}`;

  const headers: Record<string, string> = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const fetchInit: RequestInit = {
    method: options.method || 'GET',
    headers,
  };

  if (typeof options.body !== 'undefined' && options.body !== null) {
    if (options.body instanceof FormData) {
      delete headers['Content-Type'];
      fetchInit.body = options.body as any;
    } else if (typeof options.body === 'string') {
      fetchInit.body = options.body;
    } else {
      fetchInit.body = JSON.stringify(options.body);
    }
  }

  if (__DEV__) {
    console.log('🚀 Fetch Request -> cURL equivalent:');
    console.log(
      generateCurl({
        method: fetchInit.method,
        baseURL,
        url: options.url,
        headers,
        body: fetchInit.body,
      })
    );
  }

  const res = await fetch(url, fetchInit);
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await res.json() : await res.text();

  if (res.ok) {
    return data as T;
  }

  // Handle 401 -> try refresh once
  if (res.status === 401 && !options._retry) {
    try {
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
      if (storedRefreshToken) {
        const refreshRes = await fetch(`${baseURL}${ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: storedRefreshToken }),
        });
        const refreshData = await refreshRes.json();
        if (refreshRes.ok && refreshData?.access && refreshData?.refresh) {
          await AsyncStorage.setItem('authToken', refreshData.access);
          await AsyncStorage.setItem('refreshToken', refreshData.refresh);
          // retry original request once
          return request<T>({ ...options, _retry: true });
        }
      }
    } catch (e) {
      // fallthrough
    }
  }

  const error: any = new Error('HTTP error');
  error.status = res.status;
  error.data = data;
  throw error;
}

export const httpClient = {
  get: <T = any>(url: string, init?: Omit<RequestOptions, 'url' | 'method'>) =>
    request<T>({ ...(init || {}), url, method: 'GET' }),
  post: <T = any>(url: string, body?: any, init?: Omit<RequestOptions, 'url' | 'method' | 'body'>) =>
    request<T>({ ...(init || {}), url, method: 'POST', body }),
  put: <T = any>(url: string, body?: any, init?: Omit<RequestOptions, 'url' | 'method' | 'body'>) =>
    request<T>({ ...(init || {}), url, method: 'PUT', body }),
  patch: <T = any>(url: string, body?: any, init?: Omit<RequestOptions, 'url' | 'method' | 'body'>) =>
    request<T>({ ...(init || {}), url, method: 'PATCH', body }),
  delete: <T = any>(url: string, init?: Omit<RequestOptions, 'url' | 'method'>) =>
    request<T>({ ...(init || {}), url, method: 'DELETE' }),
};

export default httpClient;


