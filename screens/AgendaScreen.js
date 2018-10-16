import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';

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

export default class AgendaScreen extends React.Component {
  static propTypes = {
    getTodos: PropTypes.func.isRequired,
  };

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props
      .getTodos()

      .then((todos) => {
        todos.map((todo) => {
          const dateTime = todo.date.split(' ');
          const date = dateTime[0];
          const time = dateTime[1];

          return {
            key: date,
            body: { time, name: todo.name, location: todo.location },
          };
        });
      })

      .then((items) => {
        const agendas = {};

        items.forEach((item) => {
          if (item.key in agendas) {
            agendas[item.key].push(item.body);
            return;
          }

          agendas[item.key] = [item.body];
        });

        this.setState({ todos: agendas });
      });
  }

  state = {
    currentDate: new Date().toString(),
    todos: {},
  };

  renderItem = item => <View style={[styles.item, { height: item.height }]}>
    <Text style={styles.time}>{item.time}</Text>
    <Text>{item.name}</Text>
    <Text style={styles.location}>{item.location}</Text>
  </View>;

  rowHasChanged = (r1, r2) => r1.name !== r2.name;

  render() {
    return <Agenda
      items={this.state.todos}
      renderItem={this.renderItem}
      rowHasChanged={this.rowHasChanged}
      selected={this.state.currentDate}
      markedDates={{
        [this.state.currentDate]:
        {
          selected: true,
          marked: true,
        },
      }} />;
  }
}
