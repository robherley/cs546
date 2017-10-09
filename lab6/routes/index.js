/**
 * @file index.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const aboutRoutes = require('./about');
const storyRoutes = require('./story');
const educationRoutes = require('./education');

// Top Level Route List
const allRoutes = [
	['/about', aboutRoutes],
	['/story', storyRoutes],
	['/education', educationRoutes]
];

// Config the server to use allRoutes
const useRoutes = app => {
	allRoutes.forEach(route => {
		app.use(route[0], route[1]);
	});

	// If specified route is not in routes
	app.use('*', (req, res) => {
		res.status(404).json({ error: 'Specified Route not found.' });
	});
};

module.exports = useRoutes;
