import React from "react";
import DropDownMenu from "./DropDownMenu";

// props:
// active: whether the component is active
// name: class name of the component
// options: list of kvs that will be turned into DropDownOptions
// text: text to display on the dropdown button
export default class DropDownComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropped: false,
    };
  }

  dropPressed = () => {
    this.setState({ isDropped: !this.state.isDropped });
  };

  render() {
    return (
      <div
        className={
          this.props.active
            ? this.props.name + " dropContainer active"
            : this.props.name + " dropContainer inactive"
        }
      >
        <div className="dropdownHeader" onClick={this.dropPressed}>
          {this.props.text}
        </div>
        {this.state.isDropped ? (
          <div className="dropComponent">
            <DropDownMenu
              active={true}
              options={this.props.options}
              name="TAOptions"
            />
          </div>
        ) : null}
      </div>
    );
  }
}
