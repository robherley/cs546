/**
 * @file app.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const useRoutes = require('./src/routes/');
const app = express();
require('./db/index'); // Init mongodb connection (init once, reuse)

// Middleware
app.use(bodyparser.json());
app.use(morgan('dev'));

// Routes
useRoutes(app);

// Listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('🚀  Server is running on port:', port);
});
