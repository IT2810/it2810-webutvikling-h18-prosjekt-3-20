/**
 * The TodoContext uses React 16's Context API
 * to give a sentral store for todos,
 * and at the same time give child components access to it,
 * without having to nest props multiple levels down.
 *
 * The Provider is placed in App.js,
 * and the Consumers are typically placed in the screens/ components
 * */
import React from 'react';

import { save, getByKey } from './storage';

const storageKey = 'todos';

export const context = {
  /**
   * Saves the todos directly into the storage,
   * overriding any existing values
   * @param {array} todos The new list of todos
   * @return {Promise}
   * */
  saveTodos: async function saveTodos(todos) {
    // Store in persistent storage
    await save(storageKey, todos);

    // Reassign the intermediate items
    this.todos = todos;

    // Return the stored items
    return this.todos;
  },
  /**
   * Fetches the todos from AsyncStorage,
   * assigns it to the intermediate list todos and returns it to the caller
   * @return {Promise}
   * */
  getTodos: async function getTodos() {
    const storedTodos = await getByKey(storageKey);

    if (!storedTodos) {
      this.todos = [];
    } else {
      this.todos = storedTodos;
    }

    return this.todos;
  },
  todos: [],
};

export const TodoContext = React.createContext(context);
