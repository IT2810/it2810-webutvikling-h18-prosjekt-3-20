import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TodoInput from '../TodoInput';

describe('<TodoInput/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TodoInput onTodoAdd={jest.fn()}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // test tekst input
});
