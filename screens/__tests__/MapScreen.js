import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import MapScreen from '../MapScreen';
import { TodoContext } from '../../utils/TodoContext';

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

const mockedCoord = {
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
};

// Mock out Expo's permission and location api, for geolocation.js
jest.mock('expo', () => ({
  Permissions: {
    askAsync: jest.fn().mockImplementation(() => Promise.resolve({ status: 'granted' })),
  },
  Location: {
    getCurrentPositionAsync: jest.fn().mockImplementation(() => Promise.resolve(mockedCoord)),
  },
}));

// A component using Consumer might fail if it isn't renderer through a parent component
// having the Provider, because the expected values aren't passed down.
// We mock the Consumer to give our components som mock values
TodoContext.Consumer = jest.fn(props => props.children({ todos: mockedTodos }));

describe('<MapScreen/>', () => {
  it('should render without failing', (done) => {
    const wrapper = shallow(<MapScreen/>);

    wrapper.update();

    setTimeout(() => {
      // The snapshot doesn't provide us with much use,
      // but it gives us a simple verification that the component didn't fail
      expect(wrapper).toMatchSnapshot();

      // Expect to have found the users position
      expect(wrapper.state().currentRegion).not.toBe(null);
      done();
    }, 1);
  });
});
