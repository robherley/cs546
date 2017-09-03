const {
    sumOfSquares,
    sayHelloTo,
    cupsOfCoffee,
    occurrencesOfSubstring,
    randomizeSentences
} = require("./lab1");
const assert = require("assert");

/**
 * Tests for sumOfSquares
 */
describe("sumOfSquares", () => {
    describe("-> sumOfSquares(5, 3, 10)", () => {
        it("Should return 134", () => {
            assert.equal(134, sumOfSquares(5, 3, 10));
        });
    });
    describe("-> sumOfSquares(5, 'foo', 10)", () => {
        it("Should throw a TypeError", () => {
            assert.throws(() => sumOfSquares(5, "foo", 10), TypeError);
        });
    });
    describe("-> sumOfSquares(-1, 3, 27)", () => {
        it("Should return 739", () => {
            assert.equal(739, sumOfSquares(-1, 3, 27));
        });
    });
    describe("-> sumOfSquares(1, 3.2, 5)", () => {
        it("Should return 51.24", () => {
            assert.equal(51.24, sumOfSquares(5, 3.2, 4));
        });
    });
});


// Apparently sayHelloTo doesn't return anything... 

/**
 * Tests for sayHelloTo
 */
// describe("sayHelloTo", () => {
//     describe("-> sayHelloTo()", () => {
//         it("Should throw Error", () => {
//             assert.throws(sayHelloTo, Error);
//         });
//     });
//     describe("-> sayHelloTo('Phil')", () => {
//         it("Should return: Hello, Phil!", () => {
//             assert.equal("Hello, Phil!", sayHelloTo("Phil"));
//         });
//     });
//     describe("-> sayHelloTo('Phil', 'Barresi')", () => {
//         it("Should return: Hello, Phil Barresi. I hope you are having a good day!", () => {
//             assert.equal(
//                 "Hello, Phil Barresi. I hope you are having a good day!",
//                 sayHelloTo("Phil", "Barresi")
//             );
//         });
//     });
//     describe("-> sayHelloTo('Phil', 'Barresi', 'Mr.')", () => {
//         it("Should return: Hello, Mr. Phil Barresi! Have a good evening!", () => {
//             assert.equal(
//                 "Hello, Mr. Phil Barresi! Have a good evening!",
//                 sayHelloTo("Phil", "Barresi", "Mr.")
//             );
//         });
//     });
// });

/**
 * Tests for cupsOfCoffee
 */
const lyrics = `5 cups of coffee on the desk! 5 cups of coffee! 
Pick one up, drink the cup, 4 cups of coffee on the desk!

4 cups of coffee on the desk! 4 cups of coffee! 
Pick one up, drink the cup, 3 cups of coffee on the desk!

3 cups of coffee on the desk! 3 cups of coffee! 
Pick one up, drink the cup, 2 cups of coffee on the desk!

2 cups of coffee on the desk! 2 cups of coffee! 
Pick one up, drink the cup, 1 cup of coffee on the desk!

1 cup of coffee on the desk! 1 cup of coffee! 
Pick it up, drink the cup, no more coffee left on the desk!`;

describe("cupsOfCoffee", () => {
    describe("-> cupsOfCoffee(3.14)", () => {
        it("Should throw TypeError", () => {
            assert.throws(() => cupsOfCoffee(3.14), TypeError);
        });
    });
    describe("-> cupsOfCoffee('foobar')", () => {
        it("Should throw TypeError", () => {
            assert.throws(() => cupsOfCoffee("foobar"), TypeError);
        });
    });
    describe("-> cupsOfCoffee(-1)", () => {
        it("Should throw TypeError", () => {
            assert.throws(() => cupsOfCoffee(-1), TypeError);
        });
    });
    describe("-> cupsOfCoffee(5)", () => {
        it(`Should print the first 5 formatted lyrics of the song`, () => {
            assert.equal(lyrics, cupsOfCoffee(5));
        });
    });
});

/**
 * Test for occurrencesOfSubstring
 */
describe("occurrencesOfSubstring", () => {
    describe("-> occurrencesOfSubstring('Helllllllo, class!', 'll')", () => {
        it("Should return 6", () => {
            assert.equal(6, occurrencesOfSubstring("Helllllllo, class!", "ll"));
        });
    });
    describe("-> occurrencesOfSubstring(33, 3)", () => {
        it("Should throw TypeError", () => {
            assert.throws(() => occurrencesOfSubstring(33, 3), TypeError);
        });
    });
    describe("-> occurrencesOfSubstring('33', '3')", () => {
        it(`Should return 2`, () => {
            assert.equal(2, occurrencesOfSubstring("33", "3"));
        });
    });
    describe("-> occurrencesOfSubstring('foo', 'bar')", () => {
        it(`Should return 0`, () => {
            assert.equal(0, occurrencesOfSubstring("foo", "bar"));
        });
    });
});

/**
 * Test for randomizeSentences (Can't test random tho)
 */
describe("randomizeSentences", () => {
    describe("-> randomizeSentences()", () => {
        it("Should throw TypeError", () => {
            assert.throws(randomizeSentences, TypeError);
        });
    });
    describe("-> randomizeSentences(<some paragraph>)", () => {
        it("Should make a different paragraph, just testing if the input and output are different strings", () => {
            assert.notEqual(
                randomizeSentences("Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations."),
                "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations."
            );
        });
    });
});
