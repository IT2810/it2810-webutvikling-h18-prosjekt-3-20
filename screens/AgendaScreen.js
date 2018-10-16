import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { TodoContext } from '../utils/TodoContext';

const bckColor = '#fff';
const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 5,
    backgroundColor: bckColor,
    marginTop: 18,
  },
  time: {
    fontWeight: 'bold',
  },
});

const mapTodoToAgenda = (todo) => {
  const dateTime = todo.date.split(' ');
  const date = dateTime[0];
  const time = dateTime[1];

  return {
    key: date,
    body: { time, name: todo.name, location: todo.location },
  };
};

const collectAgendas = (items) => {
  const agendas = {};

  items.forEach((item) => {
    if (item.key in agendas) {
      agendas[item.key].push(item.body);
      return;
    }

    agendas[item.key] = [item.body];
  });

  return agendas;
};

export default class AgendaScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    currentDate: new Date().toString(),
  };

  renderItem = item => <View style={[styles.item, { height: item.height }]}>
    <Text style={styles.time}>{item.time}</Text>
    <Text>{item.name}</Text>
    <Text style={styles.location}>{item.location}</Text>
  </View>;

  rowHasChanged = (r1, r2) => r1.name !== r2.name;

  render() {
    return <TodoContext.Consumer>
    {({ todos }) => <Agenda
      items={collectAgendas(todos.map(mapTodoToAgenda))}
      renderItem={this.renderItem}
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
