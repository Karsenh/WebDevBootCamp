import React, { useState } from "react";

// (11) Pass in props to pass over note values in function 'addNote'
// from onAdd attribute in App.jsx
function CreateArea(props) {
  // (1) Create a stateful constant for both the `title` and `content` input/textarea
  // using a js object in the note form
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  // (4) Create a function to handle the change within input fields
  // and store the value with a stateful const
  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        // (5) Use spread operator to 'spread' previous KVs (values) to our object.
        ...prevNote,
        // (6) use array syntax to capture `name` value constant instead of string
        [name]: value
      };
    });
  }

  // (7) Create a submit note function to pass into the button on click
  function submitNote(event) {
    // (12)
    props.onAdd(note);

    // (29) Clear out the title and content from the `note` object
    // Since the input and text area within the form have a (display) value of note.title & note.content
    // they will be cleared out with this setNote function.
    setNote({
      title: "",
      content: ""
    });

    // Prevent default refresh upon button click / submission
    event.preventDefault();
  }

  return (
    <div>
      <form>
        {/* (2) Add `value`s to control our inputs */}
        {/* (3) Add `onChange` attribute to pass in a function to `handleChange` */}
        <input
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Take a note..."
          rows="3"
        />
        {/* (8) Pass submit note function into the button */}
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
