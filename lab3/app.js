/**
 * @file app.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const { 
    getFileAsString, 
    getFileAsJSON, 
    saveStringToFile,
    saveJSONToFile 
} = require('./filedata');
const { simplifyText } = require('./textMetrics')

getFileAsString('chapter1.txt')
.then(res => console.log(res))
.catch(err => console.error(err))

// getFileAsJSON('package.json')
// .then(res => console.log(res))
// .catch(err => console.error(err))

// saveStringToFile('test.json', "Hello, Friend. 2")
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

// saveJSONToFile('test.json', {saying:"hello, friend"})
//     .then(res => console.log(res))
//     .catch(err => console.log(err))