import React from "react";
import Input from "./Input";

function Form(props) {
  return (
    <form className="form">
      <Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      {props.displayPassConfirm ? (
        <Input type="password" placeholder="Confirm Password" />
      ) : null}
      <button className="" type="submit">
        {props.buttonText}
      </button>
    </form>
  );
}

export default Form;
