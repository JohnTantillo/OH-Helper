import React from "react";
import "../App.css";

// Define a general Button component to for ease of creation and functionality
// props to pass:
// props.active = defaults to false. Is the button active or disabled at the moment
// props.text = defaults to "". The text to display on the button
// props.onclick = no default. The function to call when the button is clicked
// props.buttonType = defaults to "". This is the class(es) that will help to style the button

class Button extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.active
            ? "aButton " + this.props.buttonType
            : "iButton " + this.props.buttonType
        }
        onClick={
          this.props.active
            ? () => this.props.onclick()
            : () => {}
        }
      >
        <span>{this.props.text}</span>
      </div>
    );
  }
}

export default Button;

Button.defaultProps = {
  active: false,
  text: "",
  buttonType: "",
};
