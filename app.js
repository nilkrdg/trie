"use strict"
const Trie = require("./lib/trie");
let words = [ "hello", "dog", "hell","cat","a", "help","helps","helping"];
// Construct trie
let dictionary = new Trie();
for (let i = 0; i < words.length ; i++)
dictionary.addWord(words[i]);
let isPresent = dictionary.isPresent("hel");
isPresent ? console.log("hel is present in the trie.") : console.log("hel is not present in the trie.");
console.log("get auto suggestions for hel:");
let suggestions = dictionary.getAutoSuggestions(dictionary.root,"hel");
console.log("best match for %70 similarity: "+dictionary.filterSuggestions(suggestions, "hel", 70));