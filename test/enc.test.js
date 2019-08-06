/**
 * Unit Tests
 **/

const { describe } = require("mocha");
const expect = require('chai').expect;
const chalk = require('chalk');
const rsa = require('node-bignumber');
const cryptojs = require('crypto-js');

console.info(chalk.yellowBright('** encryption testing **'));

let key, pub, pri, i, k, b, e, d;

/// helpers
encrypt	= (value, key, iv) => {
	return cryptojs.AES.encrypt(value,
		key, {iv: iv, mode: cryptojs.mode.CBC, padding: cryptojs.pad.Pkcs7});
};

decrypt	= (value, key, iv) => {
	return cryptojs.AES.decrypt(value.toString(),
		key, {iv: iv, mode: cryptojs.mode.CBC, padding: cryptojs.pad.Pkcs7})
			.toString(cryptojs.enc.Utf8);
};


describe('Enc', () => {

	describe('RSA', () => {

		it('should generate RSA keys', async () => {

			key = new rsa.Key;

			key.generate(128, "10001");

			pub = new Buffer.from(key.n.toString(16)).toString('base64');
			pri = new Buffer.from(key.d.toString(16)).toString('base64');

			expect(pub).to.be.a('string');
			expect(pri).to.be.a('string');

			i = cryptojs.enc.Base64.parse(pub); // iv
			k = cryptojs.enc.Base64.parse(pri); // encryption key

			b = (JSON.stringify({email: "john@doe.com", password: "password"}));

			e = encrypt(b, k, i).toString(); // encrypted body
			console.log( e );

			d = JSON.parse(decrypt(e, k, i)); // decrypted body
			console.log( d );

		});
	});
});
