'use strict';
import axios from 'axios';

export function searchRestaurants(data) {
  return {
    type: 'SEARCH_RESTAURANTS',
    payload: data
  }
}
