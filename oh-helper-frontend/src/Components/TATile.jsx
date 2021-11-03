import React from "react";
import defaultImage from "../Assets/blankProfilePhoto.png";

// props:
// name = TA name
// img = TA image
// special = TA specialties
export default class TATile extends React.Component {
  render() {
    return (
      <div className="taWindow">
        <img
          className="taImage"
          src={this.props.img}
          alt={defaultImage}
        />
        <div className="rightSide">
          <div className="taName">{this.props.name}</div>
          <div className="lineBreak"></div>
          <div className="taSpecialties">Specialties:</div>
          <div className="taSpecialtiesList">{this.props.special.join(", ")}</div>
        </div>
      </div>
    );
  }
}

TATile.defaultProps = {
  img: defaultImage,
};