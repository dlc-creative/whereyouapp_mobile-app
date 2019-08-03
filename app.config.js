'use strict';

const config = {
	env: process.env.NODE_ENV || 'development',
	production: {},
	development: {
		zomato_api_url: 'https://developers.zomato.com/api/v2.1/',
		zomato_api_key: '4d698083d03a6a306cc2a44fa13b23ee'
	},
	get current() {
		return this[this.env];
	}
};

module.exports = config;
