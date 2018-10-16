/**
 * Requests the current location of the user
 * @return {Promise} Resolves with location, or fails with error explaining why
 * */
import { Platform } from 'react-native';
import { Constants, Permissions, Location } from 'expo';

export async function getLocation() {
  // Geolocation fails on android emulators,
  // with strange errors. As a fallback send a rejection
  if (Platform.OS === 'android' && !Constants.isDevice) {
    throw new Error('Cannot fetch the geolocation on an Android Emulator. Try it on an device!');
  }

  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status !== 'granted') {
    throw new Error('[Location Not Granted] Could not get access to geolocation in Expo');
  }

  return Location.getCurrentPositionAsync({});
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
