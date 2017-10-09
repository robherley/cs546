const shell = require('shelljs');
const lab = process.argv.slice(-1)[0];

if (lab.slice(0, 3) !== 'lab') {
	throw Error`Last argument must be a lab with number!`;
} else {
	shell.cd(`./${lab}`);
	shell.exec(
		`zip -r Herley_Robert_CS546_WS_${lab[0].toUpperCase() +
			lab.slice(
				1
			)}.zip . -x "*node_modules/" -x "node_modules/**" -x "*.DS_Store"`
	);
}
