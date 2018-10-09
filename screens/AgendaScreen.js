import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import { Agenda } from 'react-native-calendars';

export default class AgendaScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.getTodos().then(todos => this.setState({todos}));
  }

  state = {
    currentDate: new Date().toString(),
    todos: [],
  };

  render() {

    return (
      <ScrollView style={styles.container}>
        <Agenda
          items={this.state.todos}
          selected = {this.state.currentDate}
          markedDates = {{
            [this.state.currentDate]:
            { selected: true,
              marked: true, }
            }}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
