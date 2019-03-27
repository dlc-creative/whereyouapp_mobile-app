'use strict';

import {combineReducers} from 'redux';
import RestaurantReducer from './reducer-restaurants';

const allReducers = combineReducers({
  restaurants: RestaurantReducer
});

export default allReducers;
