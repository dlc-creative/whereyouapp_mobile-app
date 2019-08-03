'use strict';

import {combineReducers} from 'redux';
import RestaurantReducer from './reducer-restaurants';
import LocationReducer from  './reducer-location';

const allReducers = combineReducers({
  restaurants: RestaurantReducer,
  location: LocationReducer
});

export default allReducers;
