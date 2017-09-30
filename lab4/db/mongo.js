/**
 * @file mongo.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const { MongoClient } = require('mongodb');
const MONGO_CONFIG = require('./config');
const MONGO_URL = `${MONGO_CONFIG.serverUrl}${MONGO_CONFIG.dbName}`;

// Reuse connection instead of opening multiple pools
let db = undefined;
// Use object in case of multiple collections (prob not needed for this lab)
let col = {};

// I couldn't think of a better name
const mango = {
	peel: async () => (db = db ? db : await MongoClient.connect(MONGO_URL)),
	smash: async () => await db.close()
};

// Get the collection, set it in the col object if it isn't set
const getCollection = async collection => {
	await mango.peel();
	if (!col[collection]) col[collection] = await db.collection(collection);
	return col[collection];
};

module.exports = {
	mango,
	getCollection
};
