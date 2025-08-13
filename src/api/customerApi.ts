import axiosClient from './axiosClient';
import { ENDPOINTS } from './endpoints';

export const customerApi = {
  // Get all customers
  getCustomers: async (params = {}) => {
    try {
      const response = await axiosClient.get(ENDPOINTS.CUSTOMERS.LIST, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get customer by ID
  getCustomerById: async (id : string) => {
    try {
      const response = await axiosClient.get(ENDPOINTS.CUSTOMERS.DETAIL(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create new customer
  createCustomer: async (customerData : Record<string, any>) => {
    try {
      const response = await axiosClient.post(ENDPOINTS.CUSTOMERS.CREATE, customerData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update customer
  updateCustomer: async (id: string, customerData: Record<string, any>) => {
    try {
      const response = await axiosClient.put(ENDPOINTS.CUSTOMERS.UPDATE(id), customerData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete customer
  deleteCustomer: async (id: string) => {
    try {
      const response = await axiosClient.delete(ENDPOINTS.CUSTOMERS.DELETE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Search customers
  searchCustomers: async (searchTerm: string, params = {}) => {
    try {
      const response = await axiosClient.get(ENDPOINTS.CUSTOMERS.SEARCH, {
        params: { ...params, q: searchTerm },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default customerApi; 