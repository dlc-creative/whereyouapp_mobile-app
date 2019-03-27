'use strict';

const config = {
	env: process.env.NODE_ENV || 'development',
	production: {},
	development: {
		zomato_api_url: '',
		zomato_api_key: ''
	},
	get current() {
		return this[this.env];
	}
};

module.exports = config;
