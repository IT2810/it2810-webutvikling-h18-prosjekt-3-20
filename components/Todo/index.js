import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoInput from './TodoInput';


export default class Todo extends Component {
  static propTypes = {
    onTodoAdd: PropTypes.func.isRequired,
  };

  static defaultProps = {
    text: 'hohoho',
  };

  render() {
    return (
      <TodoInput onTodoAdd={this.props.onTodoAdd}/>);
  }
}
