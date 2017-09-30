/**
 * @file app.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const {
	createTask,
	getAllTasks,
	getTask,
	completeTask,
	removeTask
} = require('./todo');
const { mango } = require('./db/mongo');

const testSomeTasks = async () => {
	// 1. Create a task with the following details
	const firstTask = await createTask(
		'Ponder Dinosaurs',
		'Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?'
	);
	// 2. Log the task, and then create a new task with the following details
	console.log(firstTask);
	const secondTask = await createTask(
		'Play Pokemon with Twitch TV',
		'Should we revive Helix?' // meme too hard
	);
	// 3. After the task is inserted, query all tasks and log them
	let all = await getAllTasks();
	console.log(all);
	// 4. After all the tasks are logged, remove the first task
	await removeTask(firstTask._id);
	// 5. Query all the remaining tasks and log them
	all = await getAllTasks();
	console.log(all);
	// 6. Complete the remaining task
	await completeTask(secondTask._id);
	// 7. Log the task that has been completed with its new value.
	const completedTask = await getTask(secondTask._id);
	console.log(completedTask);
	// Smash the fruit
	await mango.smash();
};

// Let everything bubble up, kill the connection if there's an error
testSomeTasks().catch(err => {
	console.error(err);
	mango.smash();
});
