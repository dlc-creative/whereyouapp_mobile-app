import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home';
import Explore from '../screens/Explore';
import Settings from '../screens/Settings';
// import RestaurantProfile from '../screens/RestaurantProfile';

const HomeStack = createStackNavigator({ Home: Home });
const ExploreStack = createStackNavigator({ Explore: Explore });
const SettingsStack = createStackNavigator({ Settings: Settings });
// const RestaurantProfileStack = createStackNavigator({ RestaurantProfile: RestaurantProfile });

var stacks = [
  {stack: HomeStack, label: 'Home', icon: 'ios-map'},
  {stack: ExploreStack, label: 'Explore', icon: 'ios-compass'},
  {stack: SettingsStack, label: 'Settings', icon: 'ios-options'}
];

stacks.map((stack) => {
  stack['stack'].navigationOptions = {
    tabBarLabel: stack['label'],
    tabBarIcon: ({focused}) => (
      <TabBarIcon
        focused={focused}
        name={stack['icon']}
      />
    )
  };
})

export default createBottomTabNavigator({
  HomeStack,
  ExploreStack,
  SettingsStack,
});
