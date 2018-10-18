import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import MapScreen from '../MapScreen';
import { TodoContext } from '../../utils/TodoContext';

// Mock out Expo's permission and location api, for geolocation.js
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

const mockedTodos = [
  {
    completed: false,
    coordinates: {
      latitude: 63.41531291552631,
      longitude: 10.405357924043026,
    },
    date: '2018-10-20',
    distance: 7,
    id: 'Gkrkt2018-10-20',
    name: 'Gkrkt',
  },
];

TodoContext.Consumer = jest.fn(props => props.children({ todos: mockedTodos }));

describe('<MapScreen/>', () => {
  it('should render without failing', () => {
    const tree = renderer.create(<MapScreen/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
