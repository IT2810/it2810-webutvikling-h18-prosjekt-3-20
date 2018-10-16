import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';

import AgendaScreen from '../screens/AgendaScreen';

const todos = [
  {
    date: '2018-10-14 08:30:00',
    name: '',
    location: '',
  },
  {
    date: '2018-10-15 10:30:00',
    name: '',
    location: '',
  },
  {
    date: '2018-10-15 09:30:00',
    name: '',
    location: '',
  },
];

const HomeStack = createStackNavigator({
  Home: {
    screen: props => <HomeScreen
      {...props}
      getTodos={async () => todos} />,
  },
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const AgendaStack = createStackNavigator({
  Agenda: { screen: props => <AgendaScreen {...props} getTodos= {async () => todos}/> },
});

AgendaStack.navigationOptions = {
  tabBarLabel: 'Agenda',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  AgendaStack,
});
