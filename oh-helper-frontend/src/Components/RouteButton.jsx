import React from "react";
import "../App.css";
import { useHistory } from "react-router-dom";

// Define a general Button component to for ease of creation and functionality
// props to pass:
// props.active = defaults to false. Is the button active or disabled at the moment
// props.text = defaults to "". The text to display on the button
// props.route = no default. The route to navigate to on click
// props.buttonType = defaults to "". This is the class(es) that will help to style the button

export default function Button(props) {
  let history = useHistory();
  return (
    <div
      className={
        props.active
          ? "aButton " + props.buttonType
          : "iButton " + props.buttonType
      }
      onClick={
        props.active
          ? () => {
              props.onclick() ? history.push(props.route) : alert("Something went wrong.")
            }
          : () => {}
      }
    >
      <span>{props.text}</span>
    </div>
  );
}
