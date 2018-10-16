import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Todo from '..';

const mockedTodos = [{
  completed: false,
  coordinates: {
    latitude: 37.785834,
    longitude: -122.406417,
  },
  date: '2018-10-16',
  distance: 0,
  id: 'Sadfas2018-10-16',
  name: 'Sadfas',
},
{
  completed: true,
  coordinates: {
    latitude: 37.785834,
    longitude: -122.406417,
  },
  date: '2018-10-16',
  distance: 0,
  id: 'Sadfas2018-10-16',
  name: 'Sadfas',
},
];

describe('<Todo/>', () => {
  it('renders without breaking', () => {
    const tree = renderer.create(
      <Todo
        onTodoAdd={jest.fn()}
        onCheckBoxPress={jest.fn()}
        todos={[]}
      />,
    ).toJSON;

    expect(tree).toBeTruthy();
  });

  it('propagates onTodoAdd and onCheckBoxPress to parent', () => {
    const mockedOnTodoAdd = jest.fn();
    const mockedOnCheckBoxPress = jest.fn();
    const wrapper = shallow(
      <Todo
        onTodoAdd={mockedOnTodoAdd}
        onCheckBoxPress={mockedOnCheckBoxPress}
        todos={mockedTodos}
      />,
    );

    // Force the function onTodoAdd to be called,
    // by calling a child component's prop
    wrapper.find('TodoInput').props().onTodoAdd();
    expect(mockedOnTodoAdd).toHaveBeenCalled();

    wrapper.find('TodoList').props().onCheckBoxPress();
    expect(mockedOnCheckBoxPress).toHaveBeenCalled();
  });
});
