import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TodoInput from '../TodoInput';

jest.mock('../../../utils/geolocation.js');

describe('<TodoInput/>', () => {
  it('renders without breaking', () => {
    const tree = renderer.create(
      <TodoInput
        onTodoAdd={jest.fn()}
        onRemoveTodo={jest.fn()}
        onCheckBoxPress={jest.fn()}
      />,
    ).toJSON();
    expect(tree)
      .toBeTruthy();
  });

  it('should pass the new todo to callback', (done) => {
    const spy = jest.fn();
    const wrapper = shallow(
      <TodoInput
        onTodoAdd={spy}
        onCheckBoxPress={jest.fn()}
        onRemoveTodo={jest.fn()}
      />,
    );

    const text = 'hello';
    const date = '2018-10-09 10:25:00';
    const coordinates = { latitude: 63.4153693875837, longitude: 10.406994364784312 };
    const completed = false;

    // Calls the internal functions to update the text and date
    wrapper.instance()
      .changeTextHandler(text);
    wrapper.instance()
      .changeSelectedDate(date);

    // Simulate that we submit a new todo
    wrapper.find('Button')
      .simulate('press');

    // Need to wait for a tiny bit of time
    // to let the TodoInput state update
    setTimeout(() => {
      expect(spy.mock.calls.length)
        .toBe(1);
      expect(spy)
        .toHaveBeenCalledWith({
          completed,
          coordinates,
          date,
          name: text,
        });

      // Manually tell the test that we are done
      done();
    }, 1);
  });
});
