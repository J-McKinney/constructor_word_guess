function Letter(character) {
    this.character = character.toUpperCase();
    this.guessedRight = false;
    this.returnCharacter = function () {
        if (this.guessedRight) {
            return this.character;
        } else {
            return "_";
        };
    };
    this.check = function (guess) {
        if (this.character.toLowerCase() == guess.toLowerCase()) {
            this.guessedRight = true;
        } else {
        };
    };
};
module.exports = Letter;