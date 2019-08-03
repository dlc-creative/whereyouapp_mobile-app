'use strict';
import axios from 'axios';

export function searchRestaurants(data) {
  return {
    type: 'SEARCH_RESTAURANTS',
    payload: data
  }
}

export function getLocation(data) {
  return {
    type: 'GET_LOCATION',
    payload: data
  }
}
