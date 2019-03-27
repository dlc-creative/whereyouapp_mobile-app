import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';
import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createSwitchNavigator({
  Login: Login,
  Register: Register,
  Main: MainTabNavigator,
},
{
  navigationOptions: () => ({
    headerTitleStyle: {
      fontWeight: "normal"
    },
    initialRouteName: "Login",
  })
}));
