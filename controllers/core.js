/**
 * Core Controller
 **/

const
	auth       	= require('./auth'),
	config      = require('./config'),
	cryptojs    = require('crypto-js'),
	crypto      = require('crypto'),
	inspector   = require('schema-inspector'),
	lodash      = require('lodash'),
	moment      = require('moment'),
	rp          = require('request-promise'),
	rsa 				= require('node-bignumber'),
	jwt         = require('jsonwebtoken'),
	is_base64   = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$"),
	auth_regex  = /Bearer\s(.*)/i;

module.exports = {
	encrypt			: (value, key, iv) => {
		return cryptojs.AES.encrypt(
			value,
			key,
			{iv: iv, mode: cryptojs.mode.CBC, padding: cryptojs.pad.Pkcs7});
	},
	decrypt			: (value, key, iv) => {
		return cryptojs.AES.decrypt(
			value.toString(),
			key,
			{iv: iv, mode: cryptojs.mode.CBC, padding: cryptojs.pad.Pkcs7})
				.toString(cryptojs.enc.Utf8);
	},
	AUTH				: auth,
	isAuthRegEx : auth_regex,
	_           : lodash,
	CONFIG      : config,
	CRYPTOJS    : cryptojs,
	CRYPTO      : crypto,
	INSPECTOR   : inspector,
	isBASE64    : is_base64,
	JWT         : jwt,
	MOMENT      : moment,
	RP          : rp,
	RSA 				: rsa,
};
