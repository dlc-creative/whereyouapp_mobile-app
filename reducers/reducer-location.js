'use strict';

export default function (state = [], action) {
	switch (action.type) {
		case 'GET_LOCATION':
			return action.payload;
			break;
	}
	return state;
}
