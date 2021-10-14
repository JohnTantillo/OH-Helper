import React from "react";

// props
// name: student name
// question: students question
export default class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherOptions: false,
    };
  }

  render() {
    return (
      <div className="questionWindow">
        <div className="leftContainer">
          <div className="nameHolder">{this.props.name}</div>
          {this.state.teacherOptions ? <div>True</div> : <div>False</div>}
        </div>
        <div className="questionHolder">{this.props.question}</div>
      </div>
    );
  }
}
