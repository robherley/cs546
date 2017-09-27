const { MongoClient } = require('mongodb');
const MONGO_CONFIG = require('./config');
const MONGO_URL = `${MONGO_CONFIG.serverUrl}${MONGO_CONFIG.dbName}`;

const connectToDB = async () => {
	const connection = await MongoClient.connect(MONGO_URL);
	console.log('\x1b[32m', 'Connected to:', MONGO_URL, '\x1b[0m');
	return connection;
};

const getCollection = async collection => {
	const db = await connectToDB();
	return await db.collection(collection);
};

module.exports = { connectToDB, getCollection };
