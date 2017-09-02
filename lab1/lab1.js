/**
 * @file lab1.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

/**
 * Calculates the sum of the squares of 3 numbers.
 * 
 * @param  {number} num1 First number to be evaluated
 * @param  {number} num2 Second number to be evaluted
 * @param  {number} num3 Third number to be evaluated
 * 
 * @throws TypeError if any of the three arguments are not numbers. Or, throws
 * error if there are not 3 arguments.
 * 
 */
const sumOfSquares = (...args) => {
    if (args.length !== 3) throw Error(`There must be three arguments.`);
    return args.reduce((sumSquares, currNum) => {
        if (typeof currNum !== "number")
            throw TypeError(`${currNum} is not a number`);
        return sumSquares + currNum * currNum;
    }, 0);
};


/**
 * Say hello in different ways depending on arguments.
 * 
 * @param  {string} num1 First number to be evaluated
 * @param  {string} num2 Second number to be evaluted
 * @param  {string} num3 Third number to be evaluated
 * 
 * @throws TypeError if any of the three arguments are not string. Or, throws
 * error if there are more than 3 args, or less than 1.
 * 
 */
const sayHelloTo = (...args) => {
    if (args.length > 3 || args.length < 1)
        throw Error(`Invalid number of arguments.`);
    args.forEach(arg => {
        if (typeof arg !== "string") throw TypeError(`${arg} is not a string`);
    });
    const responses = [
        `Hello, ${args[0]}!`,
        `Hello, ${args[0]} ${args[1]}. I hope you are having a good day!`,
        `Hello, ${args[2]} ${args[0]} ${args[1]}! Have a good evening!`
    ];
    return responses[args.length - 1];
};


/**
 * Returns a string of a song (99 Cups of Coffee on the Desk)
 * 
 * @param  {number} howManyCups Number of cups of coffee to count down by.
 * 
 * @throws TypeError if howManyCups is not a number or an error if the number of
 * cups is negative.
 */
const cupsOfCoffee = howManyCups => {
    if (
        typeof howManyCups !== "number" ||
        !Number.isSafeInteger(howManyCups) ||
        howManyCups < 0
    ) {
        throw TypeError(`${howManyCups} is not a positive integer.`);
    }
    // Probably a better way to do this...
    const lyrics = [
        `1 cup of coffee on the desk! 1 cup of coffee! \nPick it up, ` +
            `drink the cup, no more coffee left on the desk!`,
        `2 cups of coffee on the desk! 2 cups of coffee! \nPick one up, ` +
            `drink the cup, 1 cup of coffee on the desk!\n\n`,
        i =>
            `${i} cups of coffee on the desk! ${i} cups of coffee! \nPick one` +
            ` up, drink the cup, ${i - 1} cups of coffee on the desk!\n\n`
    ];
    let response = "";
    // Find proper lyric for each cup number.
    for (let i = howManyCups; i > 0; i--) {
        response += i > 2 ? lyrics[2](i) : lyrics[i - 1];
    }
    return response;
};


/**
 * Returns the number of occurences of a substring within a string.
 * 
 * @param  {string} fullString string to search for substring(s)
 * @param  {string} substring substring for search
 * 
 * @throws TypeError if either of the arguments are not strings.
 */
const occurrencesOfSubstring = (fullString, substring) => {
    if (typeof fullString !== "string" || typeof substring !== "string") {
        throw TypeError(`Both arguments must be strings.`);
    }
    
    let matches = 0

    // Keep iterating until no substring is found.
    while(fullString.indexOf(substring) !== -1){
        fullString = fullString.slice(fullString.indexOf(substring) + 1)
        matches++
    }
    return matches;
};

/**
 * Takes an input paragraph and randomizes the sentences in it.
 * 
 * @param  {string} paragraph Input paragraph to shuffle
 * 
 * @throws A TypeError if the input is not a paragraph
 */
const randomizeSentences = paragraph => {
    if (typeof paragraph !== "string") {
        throw TypeError(`Input paragraph must be a string.`);
    }

    paragraph = ` ${paragraph}`; // Pad space to paragraph for formatting
    
    /* 
        Regexp match for everything that isn't ".", "!" or "?" and then add on 
        the next delimiting character. "g" is to global match all occurences
    */
    let sentences = paragraph.match(/[^\.!\?]+[\.!\?]/g),
        len = sentences.length,
        curr,
        rand;
    
    // Fisher-Yates Shuffle
    while (len) {
        rand = Math.floor(Math.random() * len--);
        curr = sentences[len];
        sentences[len] = sentences[rand];
        sentences[rand] = curr;
    }

    // Concat the strings and remove the first space. 
    return sentences.reduce((prev, curr) => prev+curr).slice(1);
};

module.exports = {
    sumOfSquares,
    sayHelloTo,
    cupsOfCoffee,
    occurrencesOfSubstring,
    randomizeSentences
}