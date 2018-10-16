import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { TodoContext } from '../utils/TodoContext';

import Todo from '../components/Todo/index';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  contentContainer: {
    paddingTop: 30,
  },
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    currentDate: new Date().toString(),
    todos: [],
  };

  addTodoItem = (item) => {
    const { todos } = this.state;
    // eslint-disable-next-line no-param-reassign
    item.id = `${item.name}${item.date}`;
    todos.push(item);
    this.setState({ todos });
  };

  editCompletedState = (todoItem) => {
    const item = this.state.todos.find(obj => obj.id === todoItem.id);
    item.completed = !item.completed;
  };

  sortTodoList() {
    return this.state.todos.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  // eslint-disable-next-line
  render() {
    return <View style={styles.container}>
      <TodoContext.Consumer>
        {({ todos, pushTodo, editCompletedState }) => <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <Todo onTodoAdd={pushTodo} todos={todos} onCheckBoxPress={editCompletedState}/>
        </ScrollView>}
      </TodoContext.Consumer>
    </View>;
  }
}
