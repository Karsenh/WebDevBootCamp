//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

import React from "react";
import ReactDOM from "react-dom";

const date = new Date();
const timeOfDay = date;
var tod = "";
var styleToUse = {};

if (timeOfDay >= 7 && timeOfDay <= 11) {
  tod = "morning";
  styleToUse = {
    color: "red"
  };
} else if (timeOfDay === 12) {
  tod = "afternoon";
  styleToUse = {
    color: "green"
  };
} else {
  tod = "night";
  styleToUse = {
    color: "blue"
  };
}

ReactDOM.render(
  <div>
    <h1 style={styleToUse}> Good {tod} </h1>
  </div>,
  document.getElementById("root")
);
