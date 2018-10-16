import { FlatList } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import TodoList from '../TodoList';

const mockedTodos = [
  {
    name: 'Test 1',
    date: '2018-10-09 09:30:00',
  },
  {
    name: 'Test 2',
    date: '2018-10-10 10:25:25',
  },
];

describe('<TodoList/>', () => {
  it('should render empty component', () => {
    const tree = renderer.create(<TodoList todos={[]}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render filled component', () => {
    const component = renderer.create(<TodoList todos={mockedTodos}/>);

    const list = component.root.findByType(FlatList);

    expect(component.toJSON()).toMatchSnapshot();
    expect(list).toBeTruthy();
    expect(list.props.data.length).toBe(mockedTodos.length);
  });
});
