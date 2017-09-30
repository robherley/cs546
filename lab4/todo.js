/**
 * @file todo.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const uuidv4 = require('uuid/v4');
const { getCollection } = require('./db/mongo');

/**
 * This async function will resolve to the newly created to-do list object, 
 * with the properties outlined in the spec.
 * @param {string} title title of the task
 * @param {string} description description of the task
 * 
 * @async
 */
const createTask = async (title, description) => {
	const todoCol = await getCollection('todoItems');
	if (typeof title !== 'string') {
		throw TypeError(`${title} is not a valid string!`);
	}
	if (typeof description !== 'string') {
		throw TypeError(`${description} is not a valid string!`);
	}
	const task = {
		_id: uuidv4(),
		title,
		description,
		completed: false,
		completedAt: null
	};
	const newTask = await todoCol.insertOne(task);
	if (newTask.insertedCount === 0) throw 'Error adding new task.';
	return await todoCol.findOne({ _id: task._id });
};

/**
 * This function will resolve to an array of all tasks in the database.
 * 
 * @async
 */
const getAllTasks = async () => {
	const todoCol = await getCollection('todoItems');
	return await todoCol.find().toArray();
};

/**
 * When given an id, this function will resolve to a task from the database.
 * If no id is provided, the method should reject.
 * If the task does not exist, the method should reject.
 * @param {string} id id of the task to be found
 * 
 * @async
 */
const getTask = async id => {
	if (typeof id !== 'string') throw TypeError(`${id} is not a valid id!`);
	const todoCol = await getCollection('todoItems');
	const idToFind = await todoCol.findOne({ _id: id });
	if (!idToFind) throw Error(`The task ${id} does not exist!`);
	return idToFind;
};

/**
 * This function will modify the task in the database. 
 * It will set completed to true and completedAt to the current time
 * If no id is provided, the method should reject.
 * If the task cannot be updated (does not exist, etc), reject.
 * If the update is successful, this method will resolve to the updated task.
 * @param {string} id id of the task to be completed
 * 
 * @async
 */
const completeTask = async id => {
	if (typeof id !== 'string') throw TypeError(`${id} is not a valid id!`);
	const todoCol = await getCollection('todoItems');
	const idToUpdate = await todoCol.findOneAndUpdate(
		{ _id: id },
		{
			$set: {
				completed: true,
				completedAt: new Date()
			}
		}
	);
	const { lastErrorObject } = idToUpdate;
	if (!lastErrorObject.n) throw Error(`The task ${id} does not exist!`);
	if (!lastErrorObject.updatedExisting)
		throw Error(`The task ${id} could not be updated!`);
	return idToUpdate.value;
};

/**
 * This function will remove the task from the database.
 * If no id is provided, the method should reject.
 * If the task cannot be removed (does not exist), the method should reject.
 * If the removal succeeds, resolve to true.
 * @param {string} id id of the task to be removed
 * 
 * @async
 */
const removeTask = async id => {
	if (typeof id !== 'string') throw TypeError(`${id} is not a valid id!`);
	const todoCol = await getCollection('todoItems');
	const idToRemove = await todoCol.findOneAndDelete({ _id: id });
	const { lastErrorObject } = idToRemove;
	if (!lastErrorObject.n) throw Error(`The task ${id} does not exist!`);
	return true;
};

module.exports = {
	createTask,
	getAllTasks,
	getTask,
	completeTask,
	removeTask
};
