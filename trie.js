"use strict"

const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const ALPHABET_SIZE = ALPHABET.length;

/**
 *  TrieNode implementation for Trie which is written with ES6 syntax.
 *
 * - {TrieNode} implements a single node for trie data structure.
 *   Constructor options: value which is a single letter. 
 *   When created, a TrieNode creates an empty array of chrildren array whose length is equal to the alphabet size.
 *  
 */

class TrieNode {
    constructor(value) {
        // isEndOfWord is true if the node represents
        // end of a word
        this.value = value !== undefined ? value : null;
        this.isEndOfWord = false;
        this.children = new Array(ALPHABET_SIZE);
    }

    getValue() {
        return this.value;
    }
};

/**
 *  Trie implementation for dictionary.
 *
 * - {Trie} implements a trie data structure for dictionary purposes. 
 *   When created, a Trie creates an empty root node with empty chrildren array.
 *  
 */
class Trie {
    constructor() {
        this.root = new TrieNode();
    }

   /*
    *  Adds a word into the trie
    *  @param {String} The word string 
    * 
    */
    addWord(word) {
        let level;
        const length = word.length;
        let index;

        let currentNode = this.root;

        for (level = 0; level < length; level++) {
            index = ALPHABET.indexOf(word[level]);
            if (currentNode.children[index] === undefined) {
                currentNode.children[index] = new TrieNode(word[level]);
            }

            currentNode = currentNode.children[index];
        }

        // mark last node as leaf
        currentNode.isEndOfWord = true;
    }

    /*
    *  Returns true if the whole word is present in the trie, else false
    *  @param {String} The word string 
    *  @return {Boolean}
    * Time complexity: O(k), k = word length
    */
    isPresent(word) {
        let level;
        const length = word.length;
        let index;
        let currentNode = this.root;

        for (level = 0; level < length; level++) {
            index = ALPHABET.indexOf(word[level]);

            if (currentNode.children[index] === undefined)
                return false;

            currentNode = currentNode.children[index];
        }

        return (currentNode !== undefined && currentNode.isEndOfWord);
    }
    /*
    *  Returns true if the node does not have any children in its children array
    *  @param  {TrieNode} 
    *  @return {Boolean}
    * Time complexity: O(k), k = alphabet size
    */
    isLastNode(node) {
        for (let i = 0; i < ALPHABET_SIZE; i++)
            if (node.children[i] !== undefined)
                return false;
        return true;
    }

    /*
    *  Iterates through Trie to find all children nodes
    *  @param  {TrieNode} The starting node which is the root of the Trie 
    *  @param  {String} CurrentPrefix which is the query string 
    *  @param  {Array} Empty suggestions array which will be filled by the function recursively 
    * 
    * Time complexity: O(n*k), k = ?, n = alphabet size
    */
    suggestionsRec(root, currPrefix, suggestions) {
        // found a string in Trie with the given prefix
        if (root.isEndOfWord) {
            console.log(currPrefix);
            suggestions.push(currPrefix);
        }

        // All children struct node pointers are NULL
        if (this.isLastNode(root))
            return;

        for (let i = 0; i < ALPHABET_SIZE; i++) {
            if (root.children[i] !== undefined) {
                // append current character to currPrefix string
                currPrefix = currPrefix.concat(ALPHABET[i]);

                // recur over the rest
                this.suggestionsRec(root.children[i], currPrefix, suggestions);
            }
        }
    }

    /*
    *  Returns the word which has the maximum similarity with the query 
    *  @param  {Array} Filled suggestion array 
    *  @param  {String} The query string 
    *  @param  {int} The percentage of similarity limit, words which have similarty under this number are not take into account 
    *  @return {String} The word which has the maximum similarity, this value will be empty in case of not finding any match
    * 
    * Time complexity: O(k), k = the number of words in suggestions array
    * 
    */
    filterSuggestions(suggestions, query, limit) {
        let wordLength = query.length;
        let maxSimilarity = -1;
        let result = "";
        for (let i = 0; i < suggestions.length; i++) {
            //Calculate the levenshtein distance
            //Since the beginning of the suggestion is guaranteed to be the same as the query
            // just taking the difference of string length is enough to calculate the distance             
            let distance = suggestions[i].length - wordLength;
            //Convert the levenshtein distance to the percentage of string similarity
            let simlarityPercentage = ((suggestions[i].length - distance) / suggestions[i].length) * 100;
            //Find the maximum similarity
            if (simlarityPercentage > maxSimilarity && simlarityPercentage >= limit) {
                maxSimilarity = simlarityPercentage;
                result = suggestions[i];
            }
        }
        return result;
    }

    /*
    *  Returns auto suggestions array which includes word has the same prefix as the query string
    *  @param  {TrieNode} The starting trie node 
    *  @param  {String} The query string  
    *  @return {Array} Suggestions array
    * 
    * Time complexity: O(k), k = the number of letters in query
    * 
    */
    getAutoSuggestions(root, query) {
        let currentNode = root;
        let suggestions = [];
        // Check if the prefix is present in trie and find 
        // the last node of that level with the last character
        // of given query string.
        let level;
        const n = query.length;
        for (level = 0; level < n; level++) {
            //Get the corresponding index for letter
            let index = ALPHABET.indexOf(query[level]);

            //There is no matching string
            if (!currentNode.children[index])
                return suggestions;
            currentNode = currentNode.children[index];
        }

        // If the prefix is present as a whole word.
        let isAWord = (currentNode.isEndOfWord === true);

        // If the prefix is a leaf node  
        let isLastNode = this.isLastNode(currentNode);

        // If the prefix is present as a whole word 
        // and there is no subtree which is connected to the last current node
        if (isAWord && isLastNode) {
            console.log(query);
            suggestions.push(query);
            return suggestions;
        }

        // If there is subtree below the current node continue to iterate
        if (!isLastNode) {
            let prefix = query;
            this.suggestionsRec(currentNode, prefix, suggestions);
            return suggestions;
        }
    }
}
module.exports = Trie;