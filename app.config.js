'use strict';

const config = {
	env: process.env.NODE_ENV || 'development',
	production: {
		zomato_api_url: '',
		zomato_api_key: '',
		amplify_aws_ak_id: '',
		amplify_aws_ak_secret: ''
	},
	development: {
		zomato_api_url: '',
		zomato_api_key: '',
		amplify_aws_ak_id: '',
		amplify_aws_ak_secret: '',
		sls_aws_ak_id: '',
		sls_aws_ak_secret: ''
	},
	get current() {
		return this[this.env];
	}
};

module.exports = config;
