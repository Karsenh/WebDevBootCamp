import React from "react";

function Note() {
    return (
        <div className="note">
            <h1 contentEditable="true">Title</h1>
            <p contentEditable="true">Message</p>
        </div>
    );
}

export default Note;