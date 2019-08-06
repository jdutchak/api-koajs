const ConfigUtil = require('./controllers/config-util');
ConfigUtil.loadConfigs(process.env.ENV || 'dev');

// require('./scratch.js');

const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const KoaLogger = require('koa-logger');
const session = require('koa-session');
const CORS = require('./controllers/cors');

const CONFIG = {
	key: 'app:session',
	maxAge: 86400000,
	autoCommit: true,
	overwrite: true,
	httpOnly: true,
	signed: true,
	rolling: false,
	renew: true,
};

class APIService {

	constructor() {

		this.server = new Koa();
		this.api = new KoaRouter();
		this.port = process.env.PORT;

		this.start();
	}

	start() {
		// Setup routes
		require('./api/')(this.api);
		// Start the server
		this.server
			.use(KoaBody({
				jsonLimit: '50mb',
				formLimit: '50mb',
				textLimit: '50mb'
			}))
			.use(CORS)
			.use(this.api.routes())
			.use(this.api.allowedMethods())
			.use(KoaLogger())
			.use(session(CONFIG, this.server))
			.listen(this.port, () => {
				console.log(`service started on port ${this.port}`);
			});


		// Set default server error handling
		this.server.on('error', err => {
			console.warn(`Server error ${err}`);
		});

	}
}

new APIService();

module.exports = APIService;
