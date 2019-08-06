/**
 * Auth Controller
 **/

module.exports = async (ctx, next) => {

	const core = require('./core');

	if (core._.has(ctx.headers, 'authorization') && core.isAuthRegEx.test(ctx.headers.authorization)) {

		const query = {
			token: ctx.headers.authorization.match(core.isAuthRegEx)[1]
		};

		await core.JWT.verify(query.token, core.CONFIG.JWT_SECRET, async (err, decoded) => {

			if(err) {

				ctx.body = {statusCode: 401, message: 'NotAuthorized'};

			} else {

				if(decoded) {

					const query = {
						apiKey: decoded.apiKey
					};

					const response = await getApiKey(query);

					if (response.length > 0 ) {

						let payload = {};

						payload.apiKey = decoded.apiKey;
						payload.userAgent = ctx.req.headers['user-agent'];
						payload.userAddr = ctx.request.ip;
						payload.timestamp = decoded.exp;
						payload.secret = response[0].api_private_key;

						const test = core.CRYPTOJS.MD5(JSON.stringify(payload)).toString();
						// console.log('signature decoded ', decoded.data.signature);
						// console.log('signature test ', test);

						if (decoded.data.signature === test) {
							return next();
						} else {
							ctx.body = {statusCode: 401, message: 'NotAuthorized'};
						}

					} else {
						ctx.body = {statusCode: 401, message: 'NotAuthorized'};
					}

				}
			}

		});

	} else {

		ctx.body = {
			statusCode: 401,
			message: 'NotAuthorized',
			timestamp: new Date().getTime()
		};

	}

	const getApiKey = async (query) => {
		return new Promise( (resolve, reject) => {

			try {
				resolve([{api_private_key: 'abc123'}])
			} catch (e) {
				reject(e);
			}

		});

	}

};
