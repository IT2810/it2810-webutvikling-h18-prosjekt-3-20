import 'react-native';
import { mapTodoToAgenda, collectAgendas } from '../agendaUtility';

const mockedTodos = [
  {
    name: 'Test 1',
    date: '2018-10-17 09:30:00',
    location: 'Lokasjon 1',
  },
  {
    name: 'Test 2',
    date: '2018-10-17 10:30:00',
    location: 'Lokasjon 2',
  },
  {
    name: 'Test 3',
    date: '2018-10-18 10:30:00',
    location: 'Lokasjon 3',
  },
];

describe('mapTodoToAgenda', () => {
  it('should ...', () => {
    const mapTodo = mapTodoToAgenda(mockedTodos[0]);

    expect(mapTodo)
      .toEqual({
        key: '2018-10-17',
        body: {
          time: '09:30:00',
          name: 'Test 1',
          location: 'Lokasjon 1',
        },
      });
  });
});

describe('collectAgendas', () => {
  it('should ...', () => {
    const mapToAgenda = mockedTodos.map(mockedTodo => mapTodoToAgenda(mockedTodo));
    const agendas = collectAgendas(mapToAgenda);

    expect(agendas)
      .toEqual({
        '2018-10-17': [
          {
            time: '09:30:00',
            name: 'Test 1',
            location: 'Lokasjon 1',
          },
          {
            time: '10:30:00',
            name: 'Test 2',
            location: 'Lokasjon 2',
          },
        ],
        '2018-10-18': [
          {
            time: '10:30:00',
            name: 'Test 3',
            location: 'Lokasjon 3',
          },
        ],
      });
  });
});
