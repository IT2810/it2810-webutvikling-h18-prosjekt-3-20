import React, { Component } from 'react';
import {
  FlatList,
} from 'react-native';
import {
  List,
  ListItem,
} from 'react-native-elements';
import PropTypes from 'prop-types';

export default class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })).isRequired,
  };

  render() {
    // sort todolist on date so that the flat list is rendered in chronological order
    const sortedTodos = this.props.todos.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    return (
      <List>
        <FlatList
          data={sortedTodos}
          extraData={this.props}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subtitle={item.date}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </List>
    );
  }
}
