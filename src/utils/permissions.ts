import { PermissionsAndroid, Platform } from 'react-native';

// Request camera permission
export const requestCameraPermission = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera to take photos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

// Request storage permission
export const requestStoragePermission = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to save files.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

// Request location permission
export const requestLocationPermission = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

// Request microphone permission
export const requestMicrophonePermission = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'This app needs access to your microphone.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

// Request multiple permissions
export const requestMultiplePermissions = async (permissions) => {
  if (Platform.OS !== 'android') {
    return permissions.reduce((acc, permission) => {
      acc[permission] = true;
      return acc;
    }, {});
  }

  try {
    const results = await PermissionsAndroid.requestMultiple(permissions);
    return results;
  } catch (err) {
    console.warn(err);
    return permissions.reduce((acc, permission) => {
      acc[permission] = false;
      return acc;
    }, {});
  }
};

// Check if permission is granted
export const checkPermission = async (permission) => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const result = await PermissionsAndroid.check(permission);
    return result;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

// Get permission status
export const getPermissionStatus = (granted) => {
  switch (granted) {
    case PermissionsAndroid.RESULTS.GRANTED:
      return 'granted';
    case PermissionsAndroid.RESULTS.DENIED:
      return 'denied';
    case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
      return 'never_ask_again';
    default:
      return 'unknown';
  }
};

export default {
  requestCameraPermission,
  requestStoragePermission,
  requestLocationPermission,
  requestMicrophonePermission,
  requestMultiplePermissions,
  checkPermission,
  getPermissionStatus,
}; 