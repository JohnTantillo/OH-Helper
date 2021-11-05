import React from "react";
import Button from "./Button";

export default class StudentOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.role,
    };
  }

  //Change a students role to teacher, or set a teachers role to student
  changeRole = () => {
    //TODO MAKE SECURE (nobody but teacher can access this)
    var roleBool = !this.state.selected;
    var newRole = roleBool ? "teacher" : "student";
    fetch("/role", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: this.props.email, role: newRole})
    })
    .then((response) => {
      if (response.ok === false) {
        alert("Error: Could not reach server.")
      } else {
        this.setState({ selected: roleBool });
      }
    })
  };

  render() {
    return (
      <div
        className={
          this.state.selected ? "studentOption selectedOption" : "studentOption"
        }
      >
        <div className="leftController">
          <div className="studentName">{this.props.name}</div>
          <div className="studentEmail">{this.props.email}</div>
        </div>
        <div className="buttonContainer">
          <Button
            active={true}
            text={this.state.selected ? "Selected" : "Select"}
            onclick={this.changeRole}
            buttonType={this.state.selected ? "selectedButton" : "selectButton"}
          />
        </div>
      </div>
    );
  }
}
