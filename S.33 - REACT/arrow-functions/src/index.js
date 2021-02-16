import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));

var numbers = [3, 56, 2, 48, 5];

const newNumsArr = numbers.map((x, y) => {
  console.log(x, y);
  return x * y;
});
console.log(newNumsArr);

////Map -Create a new array by doing something with each item in an array.
const newMap = numbers.map((x) => x * 2);
console.log(newMap);

//////Filter - Create a new array by keeping the items that return true.
// const newNumbers2 = numbers.filter(function(num) {
//   return num < 10;
// });

const newFilterArr = numbers.filter((num) => num < 10);
console.log(newFilterArr);

//Reduce - Accumulate a value by doing something to each item in an array.
// var newNumber = numbers.reduce(function (accumulator, currentNumber) {
//     return accumulator + currentNumber;
// })

const newReduceNum = numbers.reduce((accumulator, currentNumber) => {
  return accumulator + currentNumber;
});
console.log(newReduceNum);

////Find - find the first item that matches from an array.
// const newNumber = numbers.find(function (num) {
//   return num > 10;
// });

const newFind = numbers.find((num) => num > 10);
console.log(newFind);

////FindIndex - find the index of the first item that matches.
// const newNumber = numbers.findIndex(function (num) {
//   return num > 10;
// })
const newFindIndex = numbers.findIndex((num) => num > 10);
console.log(newFindIndex);
