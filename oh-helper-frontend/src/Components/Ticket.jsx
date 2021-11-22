import React from "react";
import DropDownComponent from "./DropDownComponent";
import PriorityLabel from "./PriorityLabel";

// props
// name: student name
// question: students question
// priority: priority of the question (aka tag to display)
// acceptFunction: function to call on accept
// deleteFunction: function to call on delete
// priorityLevels: Object of priority levels

export default class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherOptions: this.props.admin ? true : false,
    };
  }

  render() {
    return (
      <div className="questionWindow">
        <div className="leftContainer">
          <div className="nameHolder">{this.props.name}</div>
          <div className="tagContainer">
            <PriorityLabel priority={this.props.priority} priorityObj={this.props.priorityLevels}></PriorityLabel>
          </div>
        </div>
        <div className="questionHolder">{this.props.question}</div>
      </div>
    );
  }
}
