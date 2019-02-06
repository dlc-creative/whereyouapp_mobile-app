'use strict';

const config = {
	env: process.env.NODE_ENV || 'local',
	production: {},
	local: {},
	get current() {
		return this[this.env];
	}
}

export default config;
