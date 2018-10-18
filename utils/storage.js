import { AsyncStorage } from 'react-native';

const storeName = 'PersonalIM';

/**
 * Generates a fully qualified id by the `key` and a
 * prefix.
 *
 * @param {string} key Unique identifier for some data
 * @return {string}
 * */
export const generateId = key => `@${storeName}:${key}`;

/**
 * Saves some data to persistent storage, using `AsyncStorage`.
 * The data is associated to the key provided as argument. **Note
 * that duplicate keys will override each other.
 *
 * @param {string} key Unique identifier for some data
 * @param {object} data The data we want to store
 * @throws {Error}
 * @return {Promise<string>} The fully qualified id to the data,
 *                  only necessary if you need to _directly_ access AsyncStorage
 * */
export async function save(key, data) {
  if (!key) {
    throw new Error('Key cannot be empty');
  }

  const id = generateId(key);
  try {
    await AsyncStorage.setItem(id, JSON.stringify(data));
  } catch (e) {
    console.error(`Could not save data to store: ${id}`, e);
    throw e;
  }

  return id;
}

/**
 * Removes some data by it's associated key. Success or failure
 * is denoted by a boolean value.
 *
 * @param {string} key Unique identifier for some data
 * @return {Promise<boolean>}
 * */
export async function removeByKey(key) {
  try {
    await AsyncStorage.removeItem(generateId(key));
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * Fetches some data by it's associated key.
 * JSON data will automatically be parsed to an object.
 *
 * @param {string} key Unique identifier for some data
 * @return {Promise<object|null>} The data stored or `null`
 * */
export async function getByKey(key) {
  const data = await AsyncStorage.getItem(generateId(key));

  return data ? JSON.parse(data) : null;
}
