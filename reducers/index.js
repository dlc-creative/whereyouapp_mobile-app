'use strict';

import {combineReducers} from 'redux';
import AuthReducer from './reducer-auth';
import RestaurantReducer from './reducer-restaurants';
import LocationReducer from  './reducer-location';

const allReducers = combineReducers({
  authentication: AuthReducer,
  restaurants: RestaurantReducer,
  location: LocationReducer
});

export default allReducers;
