"use strict"
const Trie = require("./lib/trie");
let words = [ "hello", "dog", "hell","cat","a", "help","helps","helping"];

// Construct trie
let dictionary = new Trie();
for (let i = 0; i < words.length ; i++)
dictionary.addWord(words[i]);

//Check isPresent method
console.log(dictionary.isPresent("hel")); // false
console.log(dictionary.isPresent("dog")); // true

//Check getAutoSuggestions method
console.log("get auto suggestions for hel:");
let suggestions = dictionary.getAutoSuggestions(dictionary.root,"hel");  // ["hell", "hello", "hellp","hellping","hellpis"]

//Check filterSuggestions method
console.log("best match for %70 similarity: "+dictionary.filterSuggestions(suggestions, "hel", 70)); // hell