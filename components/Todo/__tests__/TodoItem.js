import renderer from 'react-test-renderer';
import React from 'react';
import { shallow } from 'enzyme';
import TodoItem from '../TodoItem';

describe('<TodoItem/>', () => {
  it('should render empty component', () => {
    const tree = renderer.create(
      <TodoItem
        item={{}}
        onRemoveTodo={jest.fn()}
        onCheckBoxPress={jest.fn()}
      />,
    ).toJSON();
    expect(tree)
      .toMatchSnapshot();
  });
  it('should run onUpdate at CheckBox press', () => {
    const spy = jest.fn();
    const wrapper = shallow(<TodoItem onRemoveTodo={jest.fn()} onCheckBoxPress={spy} item={{}}/>);
    // console.log(wrapper.find('CheckBox'));
    wrapper.find('CheckBox').simulate('press');

    expect(spy).toHaveBeenCalled();
  });
});
