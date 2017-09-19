/**
 * @file fileData.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const simplifyText = text => {
	if (typeof text !== 'string')
		throw TypeError(`${path} is not a valid string!`);
	let cleanText = text.toLowerCase().replace(/[^0-9a-z]/gi, '');
	console.log(cleanText);
};

module.exports = {
	simplifyText
};
