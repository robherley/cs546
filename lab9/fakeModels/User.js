const bcrypt = require('bcryptjs');
const db = require('../db/data.json');

class User {
	constructor(data) {
		Object.assign(this, data);
	}

	async checkPassword(candidatePass) {
		return await bcrypt.compare(candidatePass, this.hashedPass);
	}

	static async findUserById(id) {
		for (const data of db) {
			if (data._id === id) return new User(data);
		}
		throw `User not found. (ID: ${id})`;
	}

	static async findUserByName(username) {
		for (const data of db) {
			if (data.username.toLowerCase() === username.toLowerCase())
				return new User(data);
		}
		throw `User not found. (Username: ${username})`;
	}
}

module.exports = User;
