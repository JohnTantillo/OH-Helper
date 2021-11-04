import React from "react";
import Button from "./Button.jsx";
import Ticket from "./Ticket.jsx";
import RouteButton from "./RouteButton";

class TeacherView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: [
        { name: "John Dunaske", question: "Is this a test?" },
        { name: "John Dunaske", question: "Is this a test?" },
      ],
      searchResults: [],
      student: false,
      searchText: "",
    };
  }

  searchOnChanged = (event) => {
    this.setState({ searchText: event.target.value });
  };

  submitQuestion = () => {
    console.log("Do stuff");
  };

  render() {
    return (
      <div className="teacherViewContainer">
        <div className="teacherQueueContainer">
          <div className="teacher headerText">Student Queue</div>
          <div className="teacherQueueWindow">
            {this.state.ticket.map((ticket) => {
              return (
                <Ticket
                  key={ticket.name}
                  name={ticket.name}
                  question={ticket.question}
                  admin={true}
                ></Ticket>
              );
            })}
          </div>
        </div>
        <div className="rightMaster">
          <div className="accountName">{"Welcome, " + this.props.name}</div>
          <div className="studentSearchHeader">Student Search:</div>
          <input
            className="studentSearchBar"
            type="text"
            placeholder="Search..."
            onChange={this.searchOnChanged}
          ></input>
          <Button buttonType="search" active={true} text="Search"></Button>
          <div className="resultsContainer">
            {this.state.searchResults.map((result) => {
              return <p>Test</p>;
            })}
          </div>
          <RouteButton
            active={true}
            route="/taSelector"
            onclick={() => {
              return true;
            }}
            text="Teaching Assistant Select"
            buttonType="taButton"
          ></RouteButton>
        </div>
      </div>
    );
  }
}

export default TeacherView;
