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
    return (
      <List>
        <FlatList
          data={this.props.todos}
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
