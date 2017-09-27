/**
 * @file app.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const { getCollection } = require('./db/mongo');

const test = async () => {
	const todoCol = await getCollection('todoItems');
	todoCol.insertOne({ name: 'bill', age: '24' });
};

test().catch(err => console.log(err));
