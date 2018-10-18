import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TodoMarker from '../TodoMarker';

const mockedTodo = {
  completed: false,
  coordinates: {
    latitude: 63.41531291552631,
    longitude: 10.405357924043026,
  },
  date: '2018-10-20',
  distance: 7,
  id: 'Gkrkt2018-10-20',
  name: 'Gkrkt',
};

/**
 * TodoMarker is only a wrapper component around react-native-maps's Marker,
 * which makes the tests necessary to run quite limited.
 * Input validation is done by PropTypes and the actual rendering and user
 * interaction is handled by Marker. This is why
 * */
describe('<TodoMarker/>', () => {
  it('should render without failing', () => {
    const tree = renderer.create(<TodoMarker todo={mockedTodo}/>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
