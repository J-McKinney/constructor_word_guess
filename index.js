var word = require("./word");
var inquirer = require("inquirer");
var fs = require("fs");

var secretWords = ["KETELONE", "GREYGOOSE", "CIROC", "BELVEDERE", "REYKA", "CHOPIN", "SMIRNOFF", "ABSOLUT", "HANGERONE",
    "STOLICHNAYA", "SKYY", "PINNACLE", "TITOS", "DIXIE", "SVEDKA", "TOVARITCH", "WHEATLEY", "CHASE", "WYBOROWA",
    "VALT", "KIRKLAND", "DEEPEDDY", "MIDWEST", "WAVE", "SILVER", "SELFISH", "WOLTZSL"];

var correctWord = new Word(secretWords[Math.floor(Math.random() * secretWords.length)]);
correctWord.buildingLetter();
var guessesLeft = 13;
var triesLeft = [];

console.log("\nDo you want to play a word game?");
console.log("\nHow well do you know your brand vodkas?");
console.log("\nWell, that's the hint...");

function endGame(results) {
    if (results === "win") {
        console.log("\nYOU WIN!!!");
        console.log("\nYou Guessed " + correctWord.correctWord.toUpperCase() + " " + " with " + (guessesLeft) + " guesses left. ")
    } else {
        console.log("\nYOU LOSE!!!");
        console.log("\nThe word was " + correctWord.correctWord + ".");
    }
    correctWord = new Word(secretWords[Math.floor(Math.random() * secretWords.length)]);
    correctWord.buildingLetter();
    guessesLeft = 13;
    triesLeft = [];
    inquirer.prompt([
        {
            message: "Would you like to try another round???",
            name: "confirm",
            type: "confirm"
        }
    ]).then(function (response) {
        if (response.confirm) {
            console.log("\nLet's get you a new word going here...");
            game();
        } else {
            console.log("\nLet me know when you want to play again...");
            return;
        };
    });
};

function game() {
    inquirer.prompt([
        {
            name: "Take a guess",
            prefix: "",
            message: "\nWord: " + correctWord.update() + "\nGuesses Left: " + guessesLeft + "\nTries Left: " + triesLeft.join(" ") + "\nGuess another letter: "
        }
    ]).then(function(data) {
        if (data.guess === "") {
            console.log("\nYou need to enter a letter.");
            return game();
        } else if (data.guess.length > 1) {
            console.log("\nOnly one letter at a time.");
            return game();
        } else if (triesLeft.includes(data.guess)) {
            console.log("\nYou already used the letter, try again.");
            return game();
        };
        if (!correctWord.correctWord.includes(data.guess)) {
            guessesLeft--;
        }
        triesLeft.push(data.guess);
        for (var i = 0; i < correctWord.letters.length; i++) {
            correctWord.letters[i].check(data.guess);
        };
        if (correctWord.update().toLowerCase() === correctWord.correctWord.toLowerCase()) {
            endGame("loss");
            return;
        };
        game();
    });
};
game();