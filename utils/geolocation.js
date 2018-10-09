/**
 * Requests the current location of the user
 * @return {Promise} Resolves with location, or fails with error explaining why
 * */
export function getLocation() {
  return new Promise((rsv, rr) => {
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
