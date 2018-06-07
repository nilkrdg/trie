"use strict"

const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const ALPHABET_SIZE = ALPHABET.length;

class Constants {
  static get alphabet() {
    return ALPHABET;
  }

  static get alphabetSize() {
    return ALPHABET_SIZE;
  }
}

module.exports = Constants;