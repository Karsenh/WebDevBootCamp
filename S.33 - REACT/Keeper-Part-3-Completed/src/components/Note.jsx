import React from "react";

function Note(props) {
  // (18) Create a function handleClick()
  // to trigger a function passed over from the props passed in
  // that will delete this note from the array
  // (This could have been an inline anoymous arrow function)
  function handleClick() {
    // (21) tap into props.onDelete to trigger the function DeleteNote(id)
    // (28) pass in the props.id (index) to know which one to delete in onDelete
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      {/* (17) Get our delete button to trigger a function in App.js
      using props */}
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;
