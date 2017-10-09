/**
 * @file about.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const router = require('express').Router();
const { about } = require('../data/fakeDB');

router.get('/', (req, res) => {
	res.json(about);
});

module.exports = router;
