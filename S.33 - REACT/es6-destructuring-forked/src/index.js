// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import animals, { useAnimals } from "./data";

console.log(animals);

const [cat, dog] = animals;

console.log(cat.sound);
console.log(dog);

// const { name: catName, sound: catSound } = cat;

// If attributes are NA, provide default values
// const {name = "Fluffy", sound = "purr"} = cat;

const {
  name,
  sound,
  // Extensive destructuring
  feedingRequirements: {
    food: { foodType, foodPrice },
    water
  }
} = cat;

console.log(foodType);

console.log(useAnimals(cat));

const [animal, makeSound] = useAnimals(cat);

console.log(animal);
makeSound();
// ReactDOM.render(
//   <table>
//     <tr>
//       <th>Brand</th>
//       <th>Top Speed</th>
//     </tr>
//     <tr>
//       <td>{tesla.model}</td>
//       <td>{teslaTopSpeed}</td>
//       <td>{teslaTopColour}</td>
//     </tr>
//     <tr>
//       <td>{honda.model}</td>
//       <td>{hondaTopSpeed}</td>
//       <td>{hondaTopColour}</td>
//     </tr>
//   </table>,
//   document.getElementById("root")
// );
