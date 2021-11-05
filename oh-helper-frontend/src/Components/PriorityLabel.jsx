import React from "react";

// props:
// priority: The priority # of the ticket that determines what this component looks like
// priorityObj: The object containing the mappings from priority # to priority text

export default class PriorityLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={
          this.props.priorityObj[this.props.priority].toLowerCase() + " tag"
        }
      >
        {this.props.priorityObj[this.props.priority]}
      </div>
    );
  }
}
