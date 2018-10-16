import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';

const TodoMarker = ({ todo }) => {
  const { title, coordinate } = todo;

  return <Marker title={title} coordinate={coordinate}/>;
};
TodoMarker.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coordinate: PropTypes.object.isRequired,
  }).isRequired,
};

export default TodoMarker;
