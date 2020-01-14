'use strict';

const config = {
	env: process.env.NODE_ENV || 'development',
	production: {
		zomato_api_url: 'https://developers.zomato.com/api/v2.1/',
		zomato_api_key: '4d698083d03a6a306cc2a44fa13b23ee',
		amplify_aws_ak_id: 'AKIA3GN3H7OXW2EMBAPK',
		amplify_aws_ak_secret: '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'
	},
	development: {
		zomato_api_url: 'https://developers.zomato.com/api/v2.1/',
		zomato_api_key: '4d698083d03a6a306cc2a44fa13b23ee',
		amplify_aws_ak_id: 'AKIA3GN3H7OXW2EMBAPK',
		amplify_aws_ak_secret: '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',
		sls_aws_ak_id: 'AKIA3GN3H7OX43TSJ37H',
		sls_aws_ak_secret: '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'
	},
	get current() {
		return this[this.env];
	}
};

module.exports = config;
