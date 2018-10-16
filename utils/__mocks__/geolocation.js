
// eslint-disable-next-line import/prefer-default-export
export const getLocation = jest.fn().mockImplementation(() => Promise.resolve({
  coords: {
    accuracy: 65,
    altitude: 48.53783416748047,
    altitudeAccuracy: 10,
    heading: -1,
    latitude: 63.4153693875837,
    longitude: 10.406994364784312,
    speed: -1,
  },
  timestamp: 1539686145402.606,
}));
