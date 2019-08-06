/**
 * Auth Routes
 **/

const core = require('../controllers/core');

module.exports = async (router, prefix) => {
	router.post(prefix + '/', setAuthRoute);
	router.post(prefix + '/apiKey', setApiKeyRoute);
	router.post(prefix + '/test', await core.AUTH, authTestRoute);
};

/// routes
setAuthRoute = async (ctx, next) => {

	let validation = {
		type: 'object',
		properties: {
			apiKey: {type: 'string', minLength: 5}
		}
	};

	let result = core.INSPECTOR.validate(validation, ctx.request.body);
	if (!result.valid) {
		ctx.body = {
			statusCode: 400,
			message: result.format(),
			timestamp: new Date().getTime()
		};
	}

	let message = '';

	try {

		const query = {
			apiKey: ctx.request.body.apiKey
		};

		const response = await getApiKey(query);

		if (response.length > 0 ) {

			const expires = new Date(response[0].expires).getTime() / 1000;
			const current = Math.floor(Date.now() / 1000);

			if (expires < current ) {

				ctx.body = {
					statusCode: 401,
					message: 'apiKey expired',
					timestamp: new Date().getTime()
				};

				return next();
			}

			const expiration = Math.floor(Date.now() / 1000) + (parseInt(core.CONFIG.JWT_TOKEN_EXPIRY));

			let payload = {};

			payload.apiKey = ctx.request.body.apiKey;
			payload.userAgent = ctx.req.headers['user-agent'];
			payload.userAddr = ctx.request.ip;
			payload.timestamp = expiration;
			payload.secret = response[0].api_private_key;

			let signature = { signature: core.CRYPTOJS.MD5(JSON.stringify(payload)).toString() };
			console.log('signature created ', signature);

			let token = core.JWT.sign({
				exp: expiration,
				data: signature,
				apiKey: ctx.request.body.apiKey,
				algorithm: core.CONFIG.JWT_ALGORITHM
			}, core.CONFIG.JWT_SECRET);

			if (token) {
				message = 'Bearer Created';
				ctx.body = {
					statusCode: 200,
					message: message,
					token: token,
					expires: core.MOMENT(new Date(expiration*1000).toUTCString()),
					timestamp: new Date().getTime()
				};

			} else {
				message = 'Bearer Create Failed';
				ctx.body = {
					statusCode: 400,
					message: message,
					token: undefined,
					expires: undefined,
					timestamp: new Date().getTime()
				};

			}

		} else {

			message = 'Bearer Create Failed';
			ctx.body = {
				statusCode: 400,
				message: message,
				token: undefined,
				expires: undefined,
				timestamp: new Date().getTime()
			};

		}

	} catch (e) {
		ctx.body = {
			statusCode: 400,
			message: e.message,
			timestamp: new Date().getTime()
		};
	}

	await next();
};

setApiKeyRoute = async (ctx, next) => {

	let validation = {
		type: 'object',
		properties: {
			profileId: {type: 'string', minLength: 5}
		}
	};

	let result = core.INSPECTOR.validate(validation, ctx.request.body);
	if (!result.valid) {
		ctx.body = {
			statusCode: 400,
			message: result.format(),
			timestamp: new Date().getTime()
		};
	}

	let message = '';

	try {

		const expiration = Math.floor(Date.now() / 1000) + (parseInt(core.CONFIG.JWT_TOKEN_EXPIRY));

		let payload = {};

		const key = new core.RSA.Key;

		key.generate(128, "10001");

		const pub = new Buffer.from(key.n.toString(16)).toString('base64');
		const pri = new Buffer.from(key.d.toString(16)).toString('base64');

		const i = core.CRYPTOJS.enc.Base64.parse(pub); // iv
		const k = core.CRYPTOJS.enc.Base64.parse(pri); // encryption key


		payload.publicKey = pub;
		payload.privateKey = pri;
		payload.profileId = ctx.request.body.profileId;
		payload.expires = core.MOMENT(new Date(expiration*1000).toUTCString());

		const response = await setApiKey(payload);

		payload.apiKey = response[0].api_key;

		message = 'success';

		ctx.body = {
			statusCode: 200,
			message: message,
			apiKey: payload.apiKey,
			apiSecret: payload.publicKey,
			expires: core.MOMENT(new Date(expiration*1000).toUTCString()),
			timestamp: new Date().getTime()
		};

	} catch (e) {
		ctx.body = {
			statusCode: 400,
			message: e.message,
			timestamp: new Date().getTime()
		};
	}

	await next();
};

authTestRoute = async (ctx, next) => {

	ctx.body = {
		statusCode: 200,
		message: 'Authorized',
		timestamp: new Date().getTime()
	};

	await next();

};

/// logic
setApiKey = async (query) => {
	return new Promise( (resolve, reject) => {

		try {
			resolve(true);
		} catch (e) {
			reject(e);
		}

	});

};

getApiKey = async (query) => {
	return new Promise( (resolve, reject) => {

		try {
			resolve(true);
		} catch (e) {
			reject(e);
		}

	});

};
