import React from "react";

const date = new Date();
const currYear = date.getFullYear();

function Footer() {
    return(
        <footer>
            <p>Copyright Karsen Hansen {currYear}</p>
        </footer>
    );
}

export default Footer;