/**
 * User Model
 **/

class User {
	constructor({
		id,
		email,
		created_at,
		updated_at,
		last_login_at,
		status,
		username,
		role = {},
		type
	} = {}) {
		this.id = id;
		this.email = email;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.last_login_date = last_login_at;
		this.status = status;
		this.username = username;
		this.role = role;
		this.type = type
	}
}
module.exports.User = User;
