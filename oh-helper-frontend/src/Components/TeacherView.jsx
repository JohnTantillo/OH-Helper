import React from "react";
import Button from "./Button.jsx";
import Ticket from "./Ticket.jsx";
import RouteButton from "./RouteButton";

class TeacherView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: [
        { name: "John Dunaske", question: "This is a question", priority: 3 },
      ],
      searchResults: [],
      student: false,
      searchText: "",
      priorityLevels: { 0: "Homework", 1: "Exam", 2: "Lab", 3: "Lecture" },
      currentPriority: 0,
    };
  }

  searchOnChanged = (event) => {
    this.setState({ searchText: event.target.value });
  };

  submitQuestion = () => {
    console.log("Do stuff");
  };

  acceptTicket = () => {
    console.log("accepted");
    //TODO: implement accepting tickets
  };

  removeTicket = () => {
    console.log("deleted");
    //TODO: implement removing tickets
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
                  priority={ticket.priority}
                  priorityLevels={this.state.priorityLevels}
                  acceptFunction={this.acceptTicket}
                  deleteFunction={this.removeTicket}
                ></Ticket>
              );
            })}
          </div>
        </div>
        <div className="rightMaster">
          <div className="accountNameTeacher">{"Welcome, " + this.props.name}</div>
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
