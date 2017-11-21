/**
 * @file app.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const routes = require('./routes/');
const app = express();

// Handlebars view engine (kinda want to switch to jade or pug)
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(
	session({
		secret: 's3cr3t',
		saveUninitialized: true,
		resave: true
	})
);

// Passport init & flash w/ vars
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	res.locals.user = req.user || null;
	next();
});

// Routes
app.use('/', routes);

// Listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('🚀  Server is running on port:', port);
});
