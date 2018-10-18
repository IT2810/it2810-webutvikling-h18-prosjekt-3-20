import React from 'react';
import { Agenda } from 'react-native-calendars';
import { TodoContext } from '../utils/TodoContext';
import { mapTodoToAgenda, collectAgendas } from '../utils/agendaUtility';
import AgendaItem from '../components/AgendaItem';

export default class AgendaScreen extends React.Component {
  state = {
    currentDate: new Date().toString(),
  };

  rowHasChanged = (r1, r2) => r1.name !== r2.name;

  render() {
    return <TodoContext.Consumer>
      {({ todos }) => <Agenda
      items={collectAgendas(todos.map(todo => mapTodoToAgenda(todo)))}
      renderItem={item => <AgendaItem item={item}/>}
      rowHasChanged={this.rowHasChanged}
      selected={this.state.currentDate}
      markedDates={{
        [this.state.currentDate]:
        {
          selected: true,
          marked: true,
        },
      }}/>}
  </TodoContext.Consumer>;
  }
}
