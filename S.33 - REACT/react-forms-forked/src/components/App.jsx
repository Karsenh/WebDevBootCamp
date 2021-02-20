import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    setDisplayName(", " + name + ".");

    // Prevent next default behavior (refreshing the page in this case)
    event.preventDefault();
  }

  return (
    <div className="container">
      <h1>Hello {displayName} </h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="What's your name?"
          value={name}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
