import emojipedia from "./emojipedia";

var numbers = [3, 56, 2, 48, 5];

/**
 *  MAP -Create a new array by doing something with each item in an array.
 *
 */
const newMap = numbers.map(function (num) {
  return num * 2;
});
console.log("New Map = " + newMap);

/**
 * FILTER - Create a new array by keeping the items that return true.
 *
 */
const newFilter = numbers.filter(function (num) {
  return num > 10;
});
console.log("New Filter = " + newFilter);

/** 
 * REDUCE - Accumulate a value by doing something to each item in an array.
 * 
// For Each equivalent
var newNumber = 0;
numbers.forEach(function(currNum) {
  newNumber += currNum
});
console.log(newNumber);
* 
*/
const newReduce = numbers.reduce(function (accumulator, currNum) {
  return accumulator + currNum;
});
console.log(newReduce);

/**
 * FIND - returns the first item that matches from an array.
 *
 */
const newFind = numbers.find(function (num) {
  return num > 10;
});
console.log(newFind);

/**
 * FINDINDEX - returns the INDEX of the first item that matches.
 *
 */
const newFindIndex = numbers.findIndex(function (num) {
  return num > 10;
});

console.log(newFindIndex);

/**
 * CHALLENGE
 *
 * Iterate through each object in emojipedia.js to return an array of meanings with the characters truncated at 100
 */

const newEmojipediaArr = emojipedia.map(function (emoji) {
  return emoji.meaning.substring(0, 100);
});

console.log(newEmojipediaArr);
