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
const { createMetrics, simplifyText } = require('./textMetrics');

// Array of files to collect info on
const FILE_LIST = ['chapter1.txt', 'chapter2.txt', 'chapter3.txt'];

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
	for (file in FILE_LIST) {
		try {
			const orgFile = FILE_LIST[file];
			const jsonFile = orgFile.replace('.txt', '.result.json');
			if (!await fse.pathExists(jsonFile)) {
				const debugFile = orgFile.replace('.txt', '.debug.txt');
				const sim = await simplifyText(await getFileAsString(orgFile));
				await saveStringToFile(debugFile, sim);
				await saveJSONToFile(jsonFile, createMetrics(sim));
			}
			return await getFileAsString(jsonFile);
		} catch (err) {
			throw err;
		}
	}
};

runAllMetrics()
	.then(res => console.log(res))
	.catch(err => console.error(err));
