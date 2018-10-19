import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { getDistance } from 'geolib';
import { getLocation } from '../../utils/geolocation';

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

  state = {};

  sortTodosOnDate = () => this.props.todos.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  sortByLocation = (todos, loc) => {
    const currentLocation = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    };
    const todoDistances = [];
    todos.forEach((obj) => {
      const todoLocation = {
        latitude: obj.coordinates.latitude,
        longitude: obj.coordinates.longitude,
      };

      todoDistances.push(
        Object.assign(obj, { distance: getDistance(currentLocation, todoLocation) }),
      );
    });
    todoDistances.sort((a, b) => a.distance - b.distance);
    return todoDistances;
  };

  async componentDidMount() {
    const loc = await getLocation();

    this.setState({ loc });
  }

  render() {
    const sorted = this.state.loc
      ? this.sortByLocation(this.props.todos, this.state.loc)
      : this.props.todos;

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
