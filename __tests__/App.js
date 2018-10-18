import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

import { shallow } from 'enzyme';
import App from '../App';

import MockStorage from '../utils/__mocks__/mockStorage';

/**
 * Mocking out AsyncStorage
 * */
const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);
jest.setMock('AsyncStorage', AsyncStorage);

describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the loading screen', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the root without loading screen', async () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('push todos', () => {
  it('id should change state', async () => {
    const wrapper = shallow(<App />);

    const mockedObject = {
      name: 'mockmock',
      id: '213948762134',
    };

    const { pushTodo } = wrapper.instance();

    expect(wrapper.instance().state.todos).toEqual([]);
    const todos = await pushTodo(mockedObject);
    wrapper.update();
    expect(wrapper.instance().state.todos).toEqual(todos);
  });
});

const mockedObject = {
  completed: false,
  coordinates: {
    latitude: 37.785834,
    longitude: -122.406417,
  },
  date: '2018-10-16',
  distance: 0,
  id: '234287908375-16',
  name: 'Bolle',
};

describe('push todos', () => {
  it('id should change state on push and again after remove', async () => {
    const wrapper = shallow(<App />);

    const { pushTodo } = wrapper.instance();
    expect(wrapper.instance().state.todos).toEqual([]);

    await pushTodo(mockedObject);
    wrapper.update();
    expect(wrapper.instance().state.todos).toEqual([mockedObject]);
  });
});

describe('remove todos', async () => {
  const wrapper = shallow(<App />);
  const { pushTodo } = wrapper.instance();

  await pushTodo(mockedObject);
  wrapper.update();
  expect(wrapper.instance().state.todos).toEqual([mockedObject]);

  const { removeTodo } = wrapper.instance();
  await removeTodo(mockedObject);
  expect(wrapper.instance().state.todos).toEqual([]);
});
