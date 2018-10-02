import { AsyncStorage } from 'react-native';

const storeName = 'PersonalIM';

/**
 * Generates a fully identifiable key for some data.
 *
 * @param {string} key Unique key to identify the data by
 * @return {string}
 * */
const generateId = key => `@${storeName}:${key}`;

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

export async function getByKey(key) {
  return AsyncStorage.getItem(generateId(key));
}
