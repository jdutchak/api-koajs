/**
 * User Controller
 **/

const core = require('./core');

module.exports = {

	setUser: async (user, token) => {
		return new Promise(async (resolve, reject) => {

			try {

				const options = {
					method: 'POST',
					uri: 'users',
					headers: {
						'Authorization': 'Bearer ' + token,
						'Content-Type': 'application/json'
					},
					json: user,
					resolveWithFullResponse: false
				};

				const response = await core.RP(options);
				resolve(response);

			} catch (e) {
				reject(e);
			}

		});
	},

	updateUser: async (user_id, user, token) => {
		return new Promise(async (resolve, reject) => {

			try {

				const options = {
					method: 'PATCH',
					uri: 'users/' + user_id,
					headers: {
						'Authorization': 'Bearer ' + token,
						'Content-Type': 'application/json'
					},
					json: user,
					resolveWithFullResponse: false
				};

				const response = await core.RP(options);
				resolve(response);

			} catch (e) {
				reject(e);
			}

		});

	},

	getUser: async (user_id, token) => {
		return new Promise(async (resolve, reject) => {

			try {

				const options = {
					method: 'GET',
					uri: 'users/' + user_id,
					headers: {
						'Authorization': 'Bearer ' + token,
						'Content-Type': 'application/json'
					},
					resolveWithFullResponse: false
				};

				const response = await core.RP(options);
				resolve(JSON.parse(response));

			} catch (e) {
				reject(e);
			}

		});
	},

	getUsers: async (token) => {
		return new Promise(async (resolve, reject) => {

			try {

				const options = {
					method: 'GET',
					uri: 'users?page[number]=1&page[size]=10',
					headers: {
						'Authorization': 'Bearer ' + token,
						'Content-Type': 'application/json'
					},
					resolveWithFullResponse: false
				};

				const response = await core.RP(options);
				resolve(JSON.parse(response));

			} catch (e) {
				reject(e);
			}

		});
	},

	getRole: async (user_role_id, token) => {
		return new Promise(async (resolve, reject) => {

			try {

				const options = {
					method: 'GET',
					uri: 'user-roles/' + user_role_id,
					headers: {
						'Authorization': 'Bearer ' + token,
						'Content-Type': 'application/json'
					},
					resolveWithFullResponse: false
				};

				const response = await core.RP(options);
				resolve(JSON.parse(response));

			} catch (e) {
				reject(e);
			}

		});
	},

	getRoles: async (token) => {
		return new Promise(async (resolve, reject) => {

			try {

				const options = {
					method: 'GET',
					uri: 'user-roles?page[number]=1&page[size]=10',
					headers: {
						'Authorization': 'Bearer ' + token,
						'Content-Type': 'application/json'
					},
					resolveWithFullResponse: false
				};

				const response = await core.RP(options);
				resolve(JSON.parse(response));

			} catch (e) {
				reject(e);
			}

		});
	},

};
