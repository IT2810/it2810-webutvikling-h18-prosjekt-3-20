/**
 * Requests the current location of the user
 * @return {Promise} Resolves with location, or fails with error explaining why
 * */
import { Platform } from 'react-native';
import { Constants } from 'expo';

export function getLocation() {
  return new Promise((rsv, rr) => {
    // Geolocation fails on android emulators,
    // with strange errors. As a fallback send a rejection
    if (Platform.OS === 'android' && !Constants.isDevice) {
      rr(new Error('Cannot fetch the geolocation on an Android Emulator. Try it on an device!'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      rsv,
      (err) => {
        console.warn('Failed to access geolocation', err);
        rr(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
      },
    );
  });
}

/**
 * Fetches the current location of the user,
 * or returns null
 * @return {Promise}
 * */
export async function getLocationOrNull() {
  try {
    return await getLocation();
  } catch (e) {
    return null;
  }
}
