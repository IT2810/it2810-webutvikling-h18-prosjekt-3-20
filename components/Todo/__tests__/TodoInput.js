import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TodoInput from '../TodoInput';

describe('<TodoInput/>', () => {
  it('renders without breaking', () => {
    const tree = renderer.create(<TodoInput onTodoAdd={jest.fn()}/>).toJSON();
    expect(tree).toBeTruthy();
  });

  it('should pass the new todo to callback', () => {
    const spy = jest.fn();
    const wrapper = shallow(<TodoInput onTodoAdd={spy}/>);

    const text = 'hello';
    const date = '2018-10-09 10:25:00';
    const completed = false;

    // Calls the internal proxy function to update the text and date
    wrapper.instance().changeTextHandler(text);
    wrapper.instance().changeSelectedDate(date);

    wrapper.find('Button').simulate('press');

    expect(spy.mock.calls.length).toBe(1);
    expect(spy).toHaveBeenCalledWith({ completed, date, name: text });
  });
});
