import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';

import TodoInput from './TodoInput';
import TodoList from './TodoList';

export default class Todo extends Component {
  static propTypes = {
    onTodoAdd: PropTypes.func.isRequired,
    onCheckBoxPress: PropTypes.func.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      coordinates: PropTypes.shape({
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
      }).isRequired,
    })).isRequired,
  };

  sortTodosOnDate = () => this.props.todos.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  render() {
    const sorted = this.sortTodosOnDate();

    return <ScrollView keyboardShouldPersistTaps={'always'}>
      <TodoInput onTodoAdd={this.props.onTodoAdd}/>
      <TodoList
        todos={sorted}
        onRemoveTodo={this.props.onRemoveTodo}
        onCheckBoxPress={this.props.onCheckBoxPress}
      />
    </ScrollView>;
  }
}
