import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';

const mockedItems = [{ name: 'test', date: '2017-08-07' }];
import AgendaScreen from '../screens/AgendaScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: props => <HomeScreen
      {...props}
      getTodos={async () => mockedItems} />,
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
  Agenda: { screen: props => <AgendaScreen {...props} getTodos= {async() => mockedItems}/>}
});

AgendaStack.navigationOptions = {
  tabBarLabel: 'Agenda',
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
  SettingsStack,
});
