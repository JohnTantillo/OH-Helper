import React from "react";

// props:
// name: The class name of the option
// text: The text on the option
// onClick: The function to call when the option is clicked
// active: If the option is active
// last: If its the last option
// first: if its the first option

export default class DropDownOption extends React.Component {

  render() {
    return (
      <div
        className={
          this.props.last
            ? this.props.active
              ? this.props.name + " dropoption active last"
              : this.props.name + " dropoption inactive last"
            : this.props.first
            ? this.props.active
              ? this.props.name + " dropoption active first"
              : this.props.name + " dropoption inactive first"
            : this.props.active
            ? this.props.name + " dropoption active"
            : this.props.name + " dropoption inactive"
        }
        onClick={this.props.onClick}
      >
        {this.props.text}
        {this.props.last ? null : <div className="dropdownLines"></div>}
      </div>
    );
  }
}
