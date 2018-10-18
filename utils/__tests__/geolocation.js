import { getLocation, getLocationOrNull } from '../geolocation';

// Mock out Expo's permission and location api, for geolocation.js
// This will unfortunately mean that we cannot test when Location does not work,
// as it is set to approve before all tests are run
jest.mock('expo', () => ({
  Permissions: {
    askAsync: jest.fn().mockImplementation(() => Promise.resolve({ status: 'granted' })),
  },
  Location: {
    getCurrentPositionAsync: jest.fn().mockImplementation(() => Promise.resolve({
      coords: {
        accuracy: 65,
        altitude: 48.78725814819336,
        altitudeAccuracy: 10,
        heading: -1,
        latitude: 63.41534484650637,
        longitude: 10.407017921963266,
        speed: -1,
      },
      timestamp: 1539689316677.935,
    })),
  },
}));

describe('getLocation', () => {
  it('should return a geolocation', async () => {
    const location = await getLocation();

    // We don't care about the actual values, but we want
    // to verify the general form of the returned object
    expect(typeof location).toBe('object');
    expect('coords' in location).toBeTruthy();
    expect('timestamp' in location).toBeTruthy();

    expect('latitude' in location.coords).toBeTruthy();
    expect('longitude' in location.coords).toBeTruthy();
    expect('accuracy' in location.coords).toBeTruthy();
  });
});

describe('getLocationOrNull', () => {
  it('should return the same as getLocation', async () => {
    const expectedLocation = await getLocation();
    const locationToTest = await getLocationOrNull();

    expect(locationToTest).toEqual(expectedLocation);
  });
});
