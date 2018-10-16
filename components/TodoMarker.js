import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';

const TodoMarker = ({ todo }) => {
  const { name, coordinates } = todo;

  // Map shorthand keys lat and lon,
  // to latitude and longitude
  const coord = {
    latitude: coordinates.lat,
    longitude: coordinates.lon,
  };

  return <Marker title={name} coordinate={coord}/>;
};
TodoMarker.propTypes = {
  todo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.object.isRequired,
  }).isRequired,
};

export default TodoMarker;
