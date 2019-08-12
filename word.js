var Letter = require("./Letter.js");

function Word(correctWord) {
    this.correctWord = correctWord;
    this.letters = [];
    this.buildingLetter = function () {
        var correctWordArray = this.correctWord.split("");
        for (var i = 0; i < correctWordArray.length; i++) {
            var newLetter = new Letter(correctWordArray[i]);
            this.letters.push(newLetter);
        };
    };
    this.makeGuess = function (guess) {
        for (var j = 0; j < this.letters.length; j++) {
            this.letters[j].check(guess);
        };
    };
    this.update = function() {
        var string = "";
        for (var a = 0; a < this.letters.length; a++) {
            string += this.letters[a].returnCharacter();
        };
        return string;
    };
};
module.exports = Word;