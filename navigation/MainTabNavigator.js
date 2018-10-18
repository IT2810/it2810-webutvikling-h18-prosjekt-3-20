import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AgendaScreen from '../screens/AgendaScreen';
import MapScreen from '../screens/MapScreen';

// Helper functions to generate ionicons-names
function createIosIcon(name, focused = false) {
  return `ios-${name}${focused ? '' : '-outline'}`;
}

function createIcon(name, focused) {
  return Platform.OS === 'ios' ? createIosIcon(name, focused) : `md-${name}`;
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Todos',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => <TabBarIcon
    focused={focused}
    name={createIcon('checkmark-circle', focused)}
  />,
};

const AgendaStack = createStackNavigator({
  Agenda: AgendaScreen,
});

AgendaStack.navigationOptions = {
  tabBarLabel: 'Agenda',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => <TabBarIcon
    focused={focused}
    name={createIcon('calendar', focused)}
  />,
};

const MapStack = createStackNavigator({
  Map: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => <TabBarIcon
    focused={focused}
    name={createIcon('compass', focused)}/>,
};

export default createBottomTabNavigator({
  HomeStack,
  AgendaStack,
  MapStack,
});
