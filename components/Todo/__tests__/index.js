import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Todo from '..';

describe('<Todo/>', () => {
  it('renders without breaking', () => {
    const tree = renderer.create(<Todo onTodoAdd={jest.fn()} todos={[]}/>).toJSON;

    expect(tree).toBeTruthy();
  });

  it('propagates onTodoAdd to parent', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Todo onTodoAdd={spy} todos={[]}/>);

    // Force the function onTodoAdd to be called,
    // by calling a child component's prop
    wrapper.find('TodoInput').props().onTodoAdd();

    expect(spy).toHaveBeenCalled();
  });
});
