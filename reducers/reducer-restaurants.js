'use strict';

export default function (state = [], action) {
	switch (action.type) {
		case 'SEARCH_RESTAURANTS':
			return action.payload;
			break;
	}
	return state;
}
