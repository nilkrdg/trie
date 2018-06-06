const Trie = require("./trie");
let words = [ "hello", "dog", "hell","cat","a", "help","helps","helping"];
// Construct trie
let dictionary = new Trie();
for (let i = 0; i < words.length ; i++)
dictionary.addWord(words[i]);
console.log(" "+dictionary.isPresent("th"));
let suggestions = dictionary.getAutoSuggestions(dictionary.root,"hel");
console.log(dictionary.filterSuggestions(suggestions, "hel", 90));