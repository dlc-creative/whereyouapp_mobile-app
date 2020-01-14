'use strict';

import config from '../app.config';
import axios from 'axios';
import bcrypt from 'react-native-bcrypt';
import isaac from 'isaac';

const BASE_URI = config.current.zomato_api_url;
const BASE_HEADER = { headers: {'user-key': config.current.zomato_api_key} };

export function validateEmail(email) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
}

export async function buildRequest(path) {
  return await axios.get(`${BASE_URI}${path}`, BASE_HEADER);
}

export function buildUrl(path) {
  if (path === undefined || path === null) {
    path = '';
  }
  return BASE_URL + path;
}

export async function hashPassword(password) {
  const saltRounds = 10;
  bcrypt.setRandomFallback((len) => {
    const buf = new Uint8Array(len);
    return buf.map(() => Math.floor(isaac.random() * 256));
  });
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) { console.error('hash password error', err); reject(err); }
      resolve(hash);
    });
  });
}

export async function comparePassword(check, base) {
  return await new Promise((resolve, reject) => {
    return bcrypt.compare(check, base, (err, success) => {
      if (err) { reject(err); }
      resolve(success);
    })
  });
}
