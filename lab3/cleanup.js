const fse = require('fs-extra');

fse
	.readdir()
	.then(res => console.log(res))
	.catch(err => console.log(err));
