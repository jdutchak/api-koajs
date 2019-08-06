/**
 * UserRole Model
 **/

class UserRole {
	constructor({
		id,
		role_name
	} = {}) {
		this.id = id;
		this.role_name = role_name;
	}
}

module.exports.UserRole = UserRole;
