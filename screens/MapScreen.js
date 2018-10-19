import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import { MonoText } from '../components/StyledText';
import { getLocation } from '../utils/geolocation';
import { TodoContext } from '../utils/TodoContext';
import TodoMarker from '../components/TodoMarker';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

/**
 * Simply extracts the
 * coordinates from geolocation
 *
 * @param {object} geo
 * @return {object}
 * */
const mapGeoToCoords = geo => geo.coords;

/**
 * Resolves the mismatch between the geolocation module
 * and react-native-maps
 * @param {object} coordinates
 * @return {object}
 * */
const createRegionByCoordinates = (coordinates) => {
  const { latitude, longitude } = coordinates.coords;

  return {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
};

const fallbackLocation = {
  coords: {
    accuracy: 500,
    latitude: 63.419301,
    longitude: 10.402234,
  },
};

export default class MapScreen extends React.Component {
  state = {
    currentRegion: null,
    point: {
      title: 'You are here',
      accuracy: 10000,
      latitude: 37.78825,
      longitude: -122.4324,
    },
  };

  componentDidMount() {
    // Fetch the current location of the user
    getLocation()
      .then(geo => this.setState({
        point: mapGeoToCoords(geo),
        currentRegion: createRegionByCoordinates(geo),
      }))
      // Catch any errors, store it for later presentation and fallback
      // to location "Gløshaugen"
      .catch(error => this.setState({
        error,
        point: mapGeoToCoords(fallbackLocation),
        currentRegion: createRegionByCoordinates(fallbackLocation),
      }));
  }

  changeRegion = (currentRegion) => {
    this.setState({ currentRegion });
  };

  render() {
    // Placeholder before we have any location to present
    if (!this.state.currentRegion) {
      return <View/>;
    }

    return <TodoContext.Consumer>
      {({ todos }) => <React.Fragment>
        {!!this.state.error && <MonoText>{this.state.error.message}</MonoText>}
        <MapView
          style={styles.map}
          initialRegion={this.state.currentRegion}
          onRegionChange={this.changeRegion}>

          <Circle
            center={this.state.point}
            radius={this.state.point.accuracy}
            strokeColor="rgba(200, 200, 255, 0.5)"
            fillColor="rgba(225, 225, 255, 0.4)"/>

          {todos.map(todo => <TodoMarker key={`marker-${todo.id}`} todo={todo}/>)}
        </MapView>
      </React.Fragment>}
    </TodoContext.Consumer>;
  }
}
