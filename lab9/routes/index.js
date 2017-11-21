const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const User = require('../fakeModels/User');

const isAuthUser = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash('error', 'You are not logged in.');
		res.redirect('/');
	}
};

router.get('/', (req, res) => {
	res.render('login');
});

router.get('/private', isAuthUser, (req, res) => {
	res.render('private');
});

router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'You are logged out');
	res.redirect('/');
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/private',
		failureRedirect: '/',
		failureFlash: 'Invalid Username or Password'
	})
);

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findUserByName(username);
			const isGood = await user.checkPassword(password);
			if (!isGood) throw 'Incorrect Password.';
			return done(null, user);
		} catch (err) {
			return done(null, false, { message: err });
		}
	})
);

// Serialize and Deserialize is used for sessions.
passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findUserById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

module.exports = router;
