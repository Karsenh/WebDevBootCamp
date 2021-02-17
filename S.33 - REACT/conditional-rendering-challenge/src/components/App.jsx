import React from "react";
import Form from "./Form";

var userIsRegistered = false;

function App() {
  return (
    <div className="container">
      {userIsRegistered ? (
        // User IS registered - Don't display password confirmation box
        <Form buttonText="Login" displayPassConfirm={false} />
      ) : (
        // User is NOT registered - Display pass confirmation
        <Form buttonText="Register" displayPassConfirm={true} />
      )}
    </div>
  );
}

export default App;
