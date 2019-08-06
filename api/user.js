/**
 * User Routes
 **/

const core = require('../controllers/core');

/// routes
module.exports = (router, prefix) => {
	router.post(prefix + '/', setUserRoute);
	router.put(prefix + '/:user_id', updateUserRoute);
	router.get(prefix + '/:user_id', getUserRoute);
	router.delete(prefix + '/:user_id', deleteUserRoute);
};

/// routes
setUserRoute = async (ctx, next) => {

	let validation = {
		type: 'object',
		properties: {
			user: {
				type: ['string', 'object']
			}
		}
	};

	let result = core.INSPECTOR.validate(validation, ctx.request.body);
	if (!result.valid) {
		ctx.body = {
			statusCode: 400,
			message: result.format(),
			timestamp: new Date().getTime()
		};
		return next();
	}

	try {

		let message = '';

		/// business logic

		ctx.body = {
			statusCode: 200,
			message: message || 'ok',
			timestamp: new Date().getTime()
		};
	} catch (e) {
		ctx.body = {
			statusCode: 400,
			message: e.message || 'error',
			timestamp: new Date().getTime()
		};
	}

	await next();
};

updateUserRoute = async (ctx, next) => {

	let validation = {
		type: 'object',
		properties: {
			user_id: {
				type: ['string']
			}
		}
	};

	let result = core.INSPECTOR.validate(validation, ctx.params);
	if (!result.valid) {
		ctx.body = {
			statusCode: 400,
			message: result.format(),
			timestamp: new Date().getTime()
		};
		return next();
	}

	try {

		let message = '';

		/// business logic

		ctx.body = {
			statusCode: 200,
			message: message || 'ok',
			timestamp: new Date().getTime()
		};
	} catch (e) {
		ctx.body = {
			statusCode: 400,
			message: e.message || 'error',
			timestamp: new Date().getTime()
		};
	}

	await next();
};

getUserRoute = async (ctx, next) => {

	let validation = {
		type: 'object',
		properties: {
			user_id: {
				type: ['string']
			}
		}
	};

	let result = core.INSPECTOR.validate(validation, ctx.params);
	if (!result.valid) {
		ctx.body = {
			statusCode: 400,
			message: result.format(),
			timestamp: new Date().getTime()
		};
		return next();
	}

	try {

		let message = '';

		/// business logic

		ctx.body = {
			statusCode: 200,
			message: message || 'ok',
			timestamp: new Date().getTime()
		};
	} catch (e) {
		ctx.body = {
			statusCode: 400,
			message: e.message || 'error',
			timestamp: new Date().getTime()
		};
	}

	await next();
};

deleteUserRoute = async (ctx, next) => {

	let validation = {
		type: 'object',
		properties: {
			user_id: {
				type: ['string']
			}
		}
	};

	let result = core.INSPECTOR.validate(validation, ctx.params);
	if (!result.valid) {
		ctx.body = {
			statusCode: 400,
			message: result.format(),
			timestamp: new Date().getTime()
		};
		return next();
	}

	try {

		let message = '';

		/// business logic

		ctx.body = {
			statusCode: 200,
			message: message || 'ok',
			timestamp: new Date().getTime()
		};
	} catch (e) {
		ctx.body = {
			statusCode: 400,
			message: e.message || 'error',
			timestamp: new Date().getTime()
		};
	}

	await next();
};
