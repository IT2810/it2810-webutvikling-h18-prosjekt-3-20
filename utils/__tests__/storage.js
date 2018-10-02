import MockStorage from '../__mocks__/mockStorage';

import { generateId, getByKey, save } from '../storage';

/**
 * Mocking out AsyncStorage
 * */
const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);
jest.setMock('AsyncStorage', AsyncStorage);

describe('storage', () => {
  it('should save to AsyncStorage', async () => {
    const key = 'one';
    const expectedData = { message: 'hello' };

    await save(key, expectedData);
    const keys = await AsyncStorage.getAllKeys();

    expect(keys.length).toBe(1);
    expect(keys[0]).toBe(generateId(key));

    const actualData = await AsyncStorage.getItem(generateId(key));
    expect(JSON.parse(actualData)).toEqual(expectedData);
  });

  it('should getByKey from AsyncStorage', async () => {
    const key = 'one';
    const expectedData = { message: 'hello' };

    await save(key, expectedData);
    const actualData = await getByKey('one');

    expect(actualData).toEqual(expectedData);
  });
});
