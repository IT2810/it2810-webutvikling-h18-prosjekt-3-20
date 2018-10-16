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
    todos: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      coordinates: PropTypes.shape({
        lon: PropTypes.number.isRequired,
        lat: PropTypes.number.isRequired,
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
        latitude: obj.coordinates.lat,
        longitude: obj.coordinates.lon,
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
    const { todos } = this.sortByLocation(this.props.todos, loc);
    // eslint-disable-next-line no-param-reassign
    this.setState({ todos, loc });
  }

  render() {
    const sorted = this.state.loc
      ? this.sortByLocation(this.props.todos, this.state.loc)
      : this.props.todos;

    return <ScrollView keyboardShouldPersistTaps={'always'}>
      <TodoInput onTodoAdd={this.props.onTodoAdd}/>
      <TodoList todos={sorted} onCheckBoxPress={this.props.onCheckBoxPress}/>
    </ScrollView>;
  }
}
