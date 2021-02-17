import React from "react";

function strike() {
  document.getElementById("root").style.textDecoration = "line-through";
}

function unstrike() {
  document.getElementById("root").style.textDecoration = null;
}

function App() {
  return (
    <div>
      <p>Buy Milk</p>
      <button onClick={strike}>Change to strike</button>
      <button onClick={unstrike}>Change to vanilla</button>
    </div>
  );
}

export default App;
