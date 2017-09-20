// Simple script to cleanup the files made from the main script
const fse = require('fs-extra');

const getFilesToRemove = async () => {
	const files = await fse.readdir('.');
	const delFiles = files.filter(file => {
		if (file.indexOf('debug.txt') != -1 || file.indexOf('result.json') != -1) {
			return file;
		}
	});
	if (delFiles.length == 0) {
		console.log('\x1b[32m', 'Nothing to clean!\n', '\x1b[0m');
	}
	for (file in delFiles) {
		console.log('\x1b[31m', 'Deleting:', delFiles[file], '\x1b[0m');
		await fse.unlink(delFiles[file]);
	}
};

getFilesToRemove().catch(e => console.log(e));
