/**
 * @file fileData.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

// Drop in replacement for fs with promise support
const fse = require('fs-extra');

/**
 * When given a path, return a promise that resolves to a string with the 
 * contents of the files.
 * @async
 * @param  {string} path location of file
 */
const getFileAsString = async path => {
	try {
		if (typeof path !== 'string')
			throw TypeError(`${path} is not a valid string!`);
		return await fse.readFile(path, 'utf-8');
	} catch (err) {
		throw err;
	}
};

/**
 * This method will, when given a path, return a promise that resolves to 
 * a JavaScript object.
 * @async
 * @param  {string} path location of json
 */
const getFileAsJSON = async path => {
	try {
		if (typeof path !== 'string')
			throw TypeError(`${path} is not a valid string!`);
		return await fse.readJSON(path);
	} catch (err) {
		throw err;
	}
};

/**
 * This method will take the text supplied, and store it in the file specified 
 * by path.
 * @async
 * @param  {string} path location to store file
 * @param  {string} text contents to store in file
 */
const saveStringToFile = async (path, text) => {
	try {
		if (typeof path !== 'string' || typeof text !== 'string')
			throw TypeError('path and text arguments must be valid strings!');
		const STRINGFILE = await fse.writeFile(path, text);
		return true;
	} catch (err) {
		throw err;
	}
};

/**
 * This method will take the obj supplied and convert it into a JSON string so 
 * that it may stored as in a file.
 * @async
 * @param  {string} path location to store file
 * @param  {string} obj contents of object to store in file
 */
const saveJSONToFile = async (path, obj) => {
	try {
		if (typeof path !== 'string')
			throw TypeError(`${path} is not a valid string!`);
		if (typeof obj !== 'object')
			throw TypeError(`${obj} is not a valid object!`);
		const JSONFILE = await fse.writeJSON(path, obj, { spaces: '\t' });
		return true;
	} catch (err) {
		throw err;
	}
};

module.exports = {
	getFileAsString,
	getFileAsJSON,
	saveStringToFile,
	saveJSONToFile
};
