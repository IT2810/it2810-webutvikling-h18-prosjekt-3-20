import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

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
