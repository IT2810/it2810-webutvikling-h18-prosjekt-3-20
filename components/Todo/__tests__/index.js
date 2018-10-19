import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Todo from '..';

const mockedTodos = [
  {
    completed: true,
    coordinates: {
      latitude: 59.916928,
      longitude: 10.728098,
    },
    date: '2017-10-16',
    distance: 390606,
    id: '73289---9daf=-82734',
    name: 'Se på Slottet',
  },
  {
    completed: false,
    coordinates: {
      latitude: 63.422764,
      longitude: 10.394765,
    },
    date: '2018-10-16',
    distance: 611,
    id: '234287908375-16',
    name: 'Feste på Samfundet',
  },
  {
    completed: true,
    coordinates: {
      latitude: 63.450994,
      longitude: 10.383271,
    },
    date: '2012-01-22',
    distance: 3739,
    id: '199992-234925-16',
    name: 'Bade på Munkholmen',
  },
];

describe('<Todo/>', () => {
  it('renders without breaking', () => {
    const tree = renderer.create(
      <Todo
        onTodoAdd={jest.fn()}
        onCheckBoxPress={jest.fn()}
        onRemoveTodo={jest.fn()}
        todos={[]}
      />,
    ).toJSON;

    expect(tree)
      .toBeTruthy();
  });

  it('propagates onTodoAdd and onCheckBoxPress to parent', () => {
    const mockedOnTodoAdd = jest.fn();
    const mockedOnCheckBoxPress = jest.fn();
    const mockedOnRemoveTodo = jest.fn();
    const wrapper = shallow(<Todo
      onTodoAdd={mockedOnTodoAdd}
      onCheckBoxPress={mockedOnCheckBoxPress}
      onRemoveTodo={mockedOnRemoveTodo}
      todos={mockedTodos}
    />);

    // Force the function onTodoAdd to be called,
    // by calling a child component's prop
    wrapper.find('TodoInput')
      .props()
      .onTodoAdd();
    expect(mockedOnTodoAdd)
      .toHaveBeenCalled();

    wrapper.find('TodoList')
      .props()
      .onCheckBoxPress();
    expect(mockedOnCheckBoxPress)
      .toHaveBeenCalled();
  });
});
