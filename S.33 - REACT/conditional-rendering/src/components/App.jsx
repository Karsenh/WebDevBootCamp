import React from "react";
import Login from "./Login";

var isLoggedIn = false;

const currentTime = new Date().getHours();

console.log(currentTime);

function App() {
  return (
    <div className="container">
      {currentTime > 10 && isLoggedIn === true ? (
        <h1>Hello - Please Sign in.</h1>
      ) : (
        <Login />
      )}
    </div>
  );
}



export default App;
