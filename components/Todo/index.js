import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoInput from './TodoInput';


export default class Todo extends Component {
  static propTypes = {
    text: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    text: 'hohoho',
  };

  render() {
    return <div className="Todo"><TodoInput/></div>;
  }
}
