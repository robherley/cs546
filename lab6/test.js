/**
 * @file test.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const assert = require('assert');
const axios = require('axios');
const sampleData = require('./data/fakeDB');

const testSimpleRequests = async () => {
	const fetch = axios.create({
		method: 'get',
		baseURL: 'http://localhost:3000'
	});

	const about = await fetch('/about');
	const education = await fetch('/education');
	const story = await fetch('/story');
	const fourOhFour = await fetch('/').catch(e => e); // Suppress the 404 err

	if (fourOhFour.response.status !== 404)
		throw Error('"/" should have a 404 response status');

	assert.deepEqual(about.data, sampleData.about);
	assert.deepEqual(education.data, sampleData.education);
	assert.deepEqual(story.data, sampleData.story);
	console.log(
		'\u001b[32m',
		'✓ All requests are functioning properly!',
		'\u001b[39m'
	);
};

testSimpleRequests().catch(err => {
	if (err.code === 'ECONNREFUSED') {
		console.error(
			'Error:',
			'Connection was refused, make sure server is running on port 3000'
		);
	} else console.error(err);
});
