import 'react-native';

import { save, getByKey } from '../storage';
import { context } from '../TodoContext';

jest.mock('../storage', () => ({
  save: jest.fn(),
  getByKey: jest.fn(() => Promise.resolve([{ name: 'hello' }])),
}));

describe('TodoContext', () => {
  it('saveTodo should save to persistent storage', async () => {
    const todos = [{ name: 'hello', date: 'world' }];

    await context.saveTodos(todos);

    // eslint-disable-next-line no-unused-vars
    const [key, data] = save.mock.calls[0];

    expect(save).toHaveBeenCalled();
    expect(data).toEqual(todos);
  });

  it('getTodos should first fetch from persistent storage', async () => {
    const todos = await context.getTodos();

    expect(getByKey).toHaveBeenCalled();
    // Ensure that the values returned from the storage (see mock over)
    // is returned to the caller
    expect(todos).toEqual([{ name: 'hello' }]);
  });
});
