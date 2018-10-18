import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';

/**
 * Wrapper around the react-native-maps Marker
 * */
const TodoMarker = ({ todo }) => {
  const { name, coordinates } = todo;

  return <Marker
    title={name}
    pinColor={todo.completed ? Colors.successColor : Colors.noticeColor}
    description={`Due: ${todo.date}`}
    coordinate={coordinates}/>;
};

TodoMarker.propTypes = {
  todo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.shape({
      latitude: PropTypes.any.isRequired,
      longitude: PropTypes.any.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TodoMarker;
