import React from "react";
import DropDownOption from "./DropDownOption";

// props:
// options: List of kvs that contain the props for the DropDownOption component {name:"", text:"", active:false/true, onClick:()=>{}}
// active: Whether its active or not
// name: Name of component
// visible: is the menu dropped
export default class DropDownMenu extends React.Component {

  render() {
    return (
      <div
        className={
          this.props.active
            ? this.props.name + " dropdown active"
            : this.props.name + " dropdown inactive"
        }
      >
        {this.props.options.map((option) => {
              if (option === this.props.options.at(-1)) {
                return (
                    <DropDownOption
                      key={option.name}
                      name={option.name}
                      text={option.text}
                      active={option.active}
                      onClick={option.onClick}
                      last={true}
                      first={false}
                    />
                  );
              } else if (option === this.props.options.at(0)) {
                return (
                  <DropDownOption
                    key={option.name}
                    name={option.name}
                    text={option.text}
                    active={option.active}
                    onClick={option.onClick}
                    last={false}
                    first={true}
                  />
                );
              } else {
                return (
                  <DropDownOption
                    key={option.name}
                    name={option.name}
                    text={option.text}
                    active={option.active}
                    onClick={option.onClick}
                    last={false}
                    first={false}
                  />
                );
              }
          })}
      </div>
    );
  }
}
