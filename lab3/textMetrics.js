/**
 * @file fileData.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

/**
 * Sanitizes text, makes everything lowercase, removes any char not a-z, 0-9 or 
 * whitespace, then replaces any form of whitespace with a singluar space
 *
 * @param  {string} text string to cleanse
 */
const simplify = text => {
	if (typeof text !== 'string')
		throw TypeError(`${text} is not a valid string!`);
	return text
		.toLowerCase() // Lowercase
		.replace(/[^0-9a-z\s]/g, '') // Only keep 0-9, a-z, and whitespace
		.replace(/\s+/g, ' '); // Replace whitespace with single space
};

/**
 * Returns various metrics of an input string
 *
 * @param  {string} text string to simplify & collect metrics
 */
const createMetrics = text => {
	const simple = simplify(text);
	const wList = simple.split(' ');
	const wordOccurences = wList.reduce((obj, curr) => {
		obj[curr] = (obj[curr] || 0) + 1;
		return obj;
	}, {});
	const averageWordLength = wList.reduce(
		(av, w) => av + w.length / wList.length,
		0
	);
	return {
		totalLetters: simple.replace(/\s/g, '').length,
		totalWords: wList.length,
		uniqueWords: Object.keys(wordOccurences).length,
		longWords: wList.filter(w => w.length >= 6).length,
		averageWordLength,
		wordOccurences
	};
};

module.exports = {
	simplify,
	createMetrics
};
