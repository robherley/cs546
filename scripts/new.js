const shell = require('shelljs');
const lab = process.argv.slice(-1)[0]

const package = {
  "name": `cs-546-${lab}`,
  "version": "1.0.0",
  "description": `CS-546 ${lab} Submission for Robert Herley`,
  "main": `${lab}.js`,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Rob Herley",
  "license": "ISC"
}

const heading = `
/**
 * @file ${lab}.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */
`

if(lab.slice(0,3) !== 'lab'){
    console.log(`last argument must be a lab with number!`)
}
else if(shell.ls().indexOf(lab) !== -1){
     console.log(`${lab} folder already exists!`)
}
else{
    shell.mkdir(lab)
    shell.cd(lab)
    shell.echo(JSON.stringify(package, null, '\t')).to('package.json')
    shell.echo(heading).to(`${lab}.js`)
    shell.echo(`# CS-546 ${lab} \n### Rob Herley`).to(`README.md`)
}