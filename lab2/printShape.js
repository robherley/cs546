/**
 * @file printShape.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */


/**
 * Prints an ASCII triangle to specified height.
 * 
 * @param  {number} lines height of the triangle
 * 
 * @throws TypeError if the argument is not an integer greater than 0.
 * @return A pretty triangle
 * 
 */
const triangle = lines => {
    if (
        typeof lines !== "number" ||
        lines < 0 ||
        !Number.isSafeInteger(lines)
    ) {
        throw TypeError(`${lines} is not an integer > 0.`);
    }
    let tri = '', i = -1;;
    while(i++ < lines - 2){
        tri += `${" ".repeat(lines - i)}/${" ".repeat(i * 2)}\\\n`;
    }
    tri += `${" ".repeat(lines - i)}/${"-".repeat(i * 2)}\\`;
    return tri;
};

/**
 * Prints an ASCII square to specified height.
 * 
 * @param  {number} lines height of the square
 * 
 * @throws TypeError if the argument is not an integer greater than 2.
 * @return A pretty square
 * 
 */
const square = lines => {
    if (
        typeof lines !== "number" ||
        lines < 2 ||
        !Number.isSafeInteger(lines)
    ) {
        throw TypeError(`${lines} is not an integer > 2.`);
    }
    const sides = isTB =>
        `|${`${isTB ? "-" : " "}`.repeat(lines)}|\n`;
    let sq = sides(1), temp = lines - 2;
    while (temp--) {
        sq += sides(0);
    }
    sq += sides(1);
    return sq.slice(0,-1); // Remove extra newline char
};


/**
 * Prints an ASCII rhombus to specified height.
 * 
 * @param  {number} lines height of the rhombus
 * 
 * @throws TypeError if the argument is not an even integer greater than 2.
 * @return A pretty rhombus
 * 
 */
const rhombus = lines => {
    if (
        typeof lines !== "number" ||
        lines < 2 ||
        lines % 2 !== 0 ||
        !Number.isSafeInteger(lines)
    ) {
        throw TypeError(`${lines} is not an even integer greater than 2.`);
    }
    const line = {
        norm: {
            tip: '/-\\',
            rest: h => `/${' '.repeat(2*h + 1)}\\`
        },
        back: {
            tip: '\\-/',
            rest: h => `\\${' '.repeat(2*h + 1)}/`
        }
    }
    const body = (lines - 2) / 2;
    let rhom = `${' '.repeat(body)}${line.norm.tip}\n`
    for(let i = 1; i < body+1; i++){
        rhom += `${' '.repeat(body-i)}${line.norm.rest(i)}\n`
    }
    for(let i = body; i > 0; i--){
        rhom += `${' '.repeat(body-i)}${line.back.rest(i)}\n`
    }
    rhom += `${' '.repeat(body)}${line.back.tip}`
    return rhom
}

module.exports = {
    triangle,
    square,
    rhombus
}