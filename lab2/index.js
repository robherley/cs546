/**
 * @file index.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const { triangle, square, rhombus } = require('./printShape');

// Types to Print
const oneToTen = [1,2,3,4,5,6,7,8,9,10];
const evens = oneToTen.map(num => num << 1);
const random = oneToTen.map(num => Math.floor((Math.random() * 10) + 1))
const randomEven = evens.map(num => Math.floor((Math.random() * 10) + 1)*2)

const printTest = (func, dataset) => {
    dataset.forEach(el => {
        console.log(func(el))
    });
}

printTest(triangle, oneToTen);
printTest(square, evens);
printTest(rhombus, evens);