'use strict';

import axios from 'axios';
import {default as UUID} from 'uuid';
import { AsyncStorage } from 'react-native';

export async function searchRestaurants(data) {
  return await {
    type: 'SEARCH_RESTAURANTS',
    payload: data
  }
}

export async function getLocation(data) {
  return await {
    type: 'GET_LOCATION',
    payload: data
  }
}

export async function userAuth(creds, session) {
  return await {
    type: 'USER_AUTH',
    payload: creds,
    session: session
  }
}

export async function userSignOut() {
  await AsyncStorage.removeItem('sessionID');
  return await {
    type: 'USER_SIGN_OUT'
  }
}

/* Authentication */

export const getUserToken = (creds) => async dispatch => {
  try {
    let session = await AsyncStorage.getItem('sessionID') || null;
    if (session == null) {
      console.log('create new session');
      session = UUID.v4();
      AsyncStorage.setItem('sessionID', session);
    }
    console.log('session', session);
    dispatch(userAuth(creds, session));
  } catch (e) {
    throw new e.message
  }
}
