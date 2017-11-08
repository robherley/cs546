/**
 * @file app.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
app.use(express.static(__dirname + '/public')); // Serve js, css, etc
app.use(routes);

app.listen(port, () => {
	console.log(`🚀 Server is listening on port: ${port}`);
});
