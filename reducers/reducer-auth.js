'use strict';

let initialState = {
  user_id: null,
  session_id: null,
  authenticated: false,
  account: {}
};

export default function (state = initialState, action) {
  switch(action.type) {
    case 'USER_AUTH':
      return {
        ...state,
        user_id: action.payload.id,
        session_id: action.session,
        authenticated: true,
        account: action.payload.account
      };
    case 'USER_SIGN_OUT':
      return initialState;
    default:
      return state;
  }
}
