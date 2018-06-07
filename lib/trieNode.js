"use strict"
const Constant = require("./../common/constants");
/**
 *  TrieNode implementation for Trie which is written with ES6 syntax.
 *
 * - {TrieNode} implements a single node for trie data structure.
 *   Constructor options: value which is a single letter. 
 *   When created, a TrieNode creates an empty array of children array whose length is equal to the alphabet size.
 *  
 */
class TrieNode {
    constructor(value) {
        // isEndOfWord is true if the node represents
        // end of a word
        this.value = value !== undefined ? value : null;
        this.isEndOfWord = false;
        this.children = new Array(Constant.alphabetSize);
    }
    /*
     *  Returns true if the node does not have any children in its children array
     *  @return {Boolean}
     * Time complexity: O(k), k = alphabet size
     */
    isLastNode() {
        for (let i = 0; i < this.children.length; i++)
            if (this.children[i] !== undefined)
                return false;
        return true;
    }
    getValue() {
        return this.value;
    }
}

module.exports = TrieNode;