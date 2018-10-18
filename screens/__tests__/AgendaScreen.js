import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import AgendaScreen from '../AgendaScreen';

import { TodoContext } from '../../utils/TodoContext';

const mockedTodos = [
  {
    name: 'Test',
    date: '2018-10-09',
  },
];

TodoContext.Consumer = jest.fn(props => props.children({ todos: mockedTodos }));

describe('<AgendaScreen/>', () => {
  it('should render without failing', () => {
    const tree = renderer.create(<AgendaScreen/>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
