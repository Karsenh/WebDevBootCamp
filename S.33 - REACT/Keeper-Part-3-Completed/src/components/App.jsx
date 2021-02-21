import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  // (9) Create a function to receive and do something with note object
  function addNote(newNote) {
    // (13) Get ahold of note information to setNotes into the array
    setNotes((prevNotes) => {
      // (14) Append previous values along with new values using spread operator
      return [...prevNotes, newNote];
    });
  }

  // (19) Create a deleteNote function which takes in the ID of the note to delete
  // to then pass this function over to each note that gets rendered, as a property.
  function deleteNote(id) {
    // (22) Remove the note from the notes array using setNotes...
    setNotes((prevNotes) => {
      // (23) Followed by looping through by filtering the prevNotes array
      return prevNotes.filter((noteItem, index) => {
        // (24) return every noteItem at the index which does not equal the event id (index)
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea
        // (10) Create an attribute to pass a function through a prop
        onAdd={addNote}
      />
      {/* (15) Loop/map over notes to access each noteItem */}
      {/* (26) Add another parameter to the .map function to access the index to also use as it's unique ID */}
      {notes.map((noteItem, index) => {
        // (16) Return each note component
        // (20) add the property `onDelete` and pass in the function `deleteNote()`
        return (
          <Note
            // (25) Create a key and ID attribute to pass back for deleting the note
            // Typically create ID using UUID - But using a simple index from .map iteration param works for this example
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
