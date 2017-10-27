/**
 * @file index.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const Boom = require('boom');
const recipesRoutes = require('./recipes.routes');
const commentsRoutes = require('./comments.routes');

// Top Level Route List
const allRoutes = [['/recipes', recipesRoutes], ['/comments', commentsRoutes]];

// Config the server to use allRoutes
const useRoutes = app => {
	allRoutes.forEach(route => {
		app.use(route[0], route[1]);
	});

	// If specified route is not in routes
	app.use('*', (req, res) => {
		const { output } = Boom.notFound('Idk where that is...');
		res.status(output.statusCode).json(output.payload);
	});
};

module.exports = useRoutes;
