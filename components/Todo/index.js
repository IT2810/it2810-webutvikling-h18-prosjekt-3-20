import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

export default class Todo extends Component {
  static propTypes = {
    onTodoAdd: PropTypes.func.isRequired,
    onCheckBoxPress: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })).isRequired,
  };

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <TodoInput onTodoAdd={this.props.onTodoAdd}/>
        <TodoList todos={this.props.todos} onCheckBoxPress={this.props.onCheckBoxPress} />
      </ScrollView>);
  }
}
