import React, { Component } from 'react';
import {
  FlatList,
} from 'react-native';
import {
  List,
} from 'react-native-elements';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
  static propTypes = {
    onCheckBoxPress: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })).isRequired,
  };

  render() {
    // sort todolist on date so that the flat list is rendered in chronological order
    return (
      <List>
        <FlatList
          data={this.props.todos}
          extraData={this.props}
          renderItem={({ item }) => (
            <TodoItem item={item} onCheckBoxPress={this.props.onCheckBoxPress}/>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </List>
    );
  }
}
