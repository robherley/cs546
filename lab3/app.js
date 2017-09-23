/**
 * @file app.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

// Imports
const fse = require('fs-extra');
const {
	getFileAsString,
	getFileAsJSON,
	saveStringToFile,
	saveJSONToFile
} = require('./filedata');
const { createMetrics, simplify } = require('./textMetrics');

/**
 * Looks at current directory, returns a list of all the chapter txt files,
 * may break, will just return the standard chapter files if it does...
 * @async
 */
const getChapterFiles = async () => {
	try {
		const fileList = await fse.readdir('.');
		return fileList.filter(file => {
			// Find all chapter files
			if (file.match(/chapter\d*.txt/g)) {
				return file;
			}
		});
	} catch (err) {
		console.error(err);
		console.error('Something went wrong, continuing with default files...');
		return ['chapter1.txt', 'chapter2.txt', 'chapter3.txt'];
	}
};

/**
* 1. Check if a corresponding result file already exists for this file, if so 
* query and print the result already stored.
* 2. If no result file is found, get the contents of the file using 
* getFileAsString
* 3. Simplify the text, and store that text in a file named fileName.debug.txt
* 4. Run the text metrics, and store those metrics in fileName.result.json
* 5. Print the resulting metrics
* @async
*/
const runAllMetrics = async () => {
	try {
		const FILE_LIST = await getChapterFiles();
		for (file in FILE_LIST) {
			const orgFile = FILE_LIST[file];
			const jsonFile = orgFile.replace('.txt', '.result.json');
			// Only run if the json file doesn't exist
			if (!await fse.pathExists(jsonFile)) {
				const debugFile = orgFile.replace('.txt', '.debug.txt');
				const sim = simplify(await getFileAsString(orgFile));
				await saveStringToFile(debugFile, sim);
				await saveJSONToFile(jsonFile, createMetrics(sim));
			}
			console.log(await getFileAsString(jsonFile));
		}
	} catch (err) {
		throw err;
	}
};

// Any catches will bubble up to here
runAllMetrics().catch(err => console.error(err));
