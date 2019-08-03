'use strict';

import config from '../app.config';
import axios from 'axios';

const BASE_URI = config.current.zomato_api_url;
const BASE_HEADER = { headers: {'user-key': config.current.zomato_api_key} };

export function buildRequest(path) {
  return axios.get(`${BASE_URI}${path}`, BASE_HEADER);
}

export function buildUrl(path) {
  if (path === undefined || path === null) {
    path = '';
  }
  return BASE_URL + path;
}
