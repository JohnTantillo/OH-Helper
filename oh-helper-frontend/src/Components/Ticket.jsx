import React from "react";
import Button from "./Button";
import DropDownComponent from "./DropDownComponent";
import PriorityLabel from "./PriorityLabel";

// props
// name: student name
// question: students question
// priority: priority of the question (aka tag to display)
// priorityLevels: Object of priority levels
// updateFunction: function to update priority

export default class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherOptions: this.props.admin ? true : false,
      currentPriority: this.props.priority,
      newPriority: 0,
    };
  }

  changePriority = (event) => {
    var grabPriority = Object.keys(this.props.priorityLevels).filter(
      (level) => {
        return this.props.priorityLevels[level] === event.target.value;
      }
    );
    this.setState({ newPriority: grabPriority[0] });
  };

  setPriority = () => {
    //this.setState({ currentPriority: this.state.newPriority });
    var ticketData = {
      Name: this.props.name,
      Issue: this.props.question,
      Label: this.state.newPriority,
      Action: "Update",
    };
    this.props.updateFunction(ticketData);
  };

  render() {
    return (
      <div className="questionWindow">
        <div className="leftContainer">
          <div className="nameHolder">{this.props.name}</div>
          <div className="tagContainer">
            <PriorityLabel
              priority={this.state.currentPriority}
              priorityObj={this.props.priorityLevels}
            ></PriorityLabel>
          </div>
          {this.props.admin ? (
            <select className="priorityChange" onChange={this.changePriority}>
              {Object.values(this.props.priorityLevels).map((key) => {
                return (
                  <option className="changePriorityOption" value={key}>
                    {key}
                  </option>
                );
              })}
            </select>
          ) : (
            <div />
          )}
          {this.props.admin ? (
            <Button
              active={true}
              text="Update"
              buttonType="changePriorityButton"
              onclick={this.setPriority}
            ></Button>
          ) : (
            <div />
          )}
        </div>
        <div className="questionHolder">{this.props.question}</div>
      </div>
    );
  }
}
