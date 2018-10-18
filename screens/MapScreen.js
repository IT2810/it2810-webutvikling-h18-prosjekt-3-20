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
 * Simple arrow-function to extract the
 * coordinates from geolocation
 * */
const mapGeoToCoords = geo => geo.coords;

const createRegionByCoordinates = (coordinates) => {
  const { latitude, longitude } = coordinates.coords;

  return {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
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
    getLocation()
      .then(geo => this.setState({
        point: mapGeoToCoords(geo),
        currentRegion: createRegionByCoordinates(geo),
      }))
      .catch(error => this.setState({ error }));
  }

  changeRegion = (currentRegion) => {
    this.setState({ currentRegion });
  };

  // eslint-disable-next-line
  render() {
    // In case of fatal errors,
    // present the plain text to the user
    if (this.state.error) {
      return <View>
        <MonoText>{this.state.error.message}</MonoText>
      </View>;
    }

    if (!this.state.currentRegion) {
      return <View/>;
    }

    return <TodoContext.Consumer>
      {({ todos }) => <MapView
        style={styles.map}
        initialRegion={this.state.currentRegion}
        onRegionChange={this.changeRegion}>

        <Circle
          center={this.state.point}
          radius={this.state.point.accuracy}
          strokeColor="rgba(200, 200, 255, 0.5)"
          fillColor="rgba(225, 225, 255, 0.4)"/>

        {todos.map(todo => <TodoMarker key={`marker-${todo.id}`} todo={todo}/>)}
      </MapView>}
    </TodoContext.Consumer>;
  }
}
