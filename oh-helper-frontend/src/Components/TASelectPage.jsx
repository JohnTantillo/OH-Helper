import React from "react";
import StudentOption from "./StudentOption";
import RouteButton from "./RouteButton";

export default class TASelectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentOptions: [],
    };
  }

  componentDidMount = () => {
    fetch("/getStudents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(""),
    })
      .then((response) => {
        if (response.status === 404 || response.status === 500) {
          alert("Error: Couldn't connect to server");
          return "";
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({ studentOptions: data });
      });
  };

  render() {
    return (
      <div className="pageContainer">
        <RouteButton
          active={true}
          text={"Back"}
          onclick={() => {
            return true;
          }}
          route={"/"}
          buttonType={"backButton"}
        />
        <div className="outerShell">
          <div className="selectContainer">
            {this.state.studentOptions.map((student) => {
              return (
                <StudentOption
                  key={student.name}
                  name={student.name}
                  email={student.email}
                  role={student.accType}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
