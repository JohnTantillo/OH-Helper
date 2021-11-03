import React from "react";
import DropDownComponent from "./DropDownComponent";

// props
// name: student name
// question: students question
export default class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherOptions: this.props.admin ? true : false,
      optionsList: [
        {
          name: "accept",
          text: "Accept",
          active: true,
          onClick: () => {
            console.log("test");
          },
        },
        {
          name: "delete",
          text: "Delete",
          active: true,
          onClick: () => {
            console.log("test");
          },
        },
        {
          name: "moveup",
          text: "Move Up",
          active: true,
          onClick: () => {
            console.log("test");
          },
        },
        {
          name: "movedown",
          text: "Move Down",
          active: true,
          onClick: () => {
            console.log("test");
          },
        },
      ],
    };
  }

  render() {
    return (
      <div className="questionWindow">
        <div className="leftContainer">
          <div className="nameHolder">{this.props.name}</div>
          {this.state.teacherOptions ? (
            <DropDownComponent
              active={true}
              name="teacherOptions"
              options={this.state.optionsList}
              text="Options"
            />
          ) : (
            <div className="styleTest"></div>
          )}
        </div>
        <div className="questionHolder">{this.props.question}</div>
      </div>
    );
  }
}
