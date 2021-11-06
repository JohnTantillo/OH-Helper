import React from "react";
import Button from "./Button.jsx";
import Ticket from "./Ticket.jsx";
import RouteButton from "./RouteButton";

var socket;

class TeacherView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: [],
      searchResults: [],
      student: false,
      searchText: "",
      priorityLevels: { 0: "Homework", 1: "Exam", 2: "Lab", 3: "Lecture" },
      currentPriority: 0,
    };
  }

  componentDidMount() {
    socket = new WebSocket("ws://localhost:8000/websocket");

    socket.addEventListener("open", (event) => {
      console.log("Websocket Connected!");
    });

    socket.addEventListener("message", (event) => {
      var data = JSON.parse(event.data);
      this.setState({ ticket: data["Queue"] });
    });

    socket.addEventListener("close", (event) => {
      console.log("Websocket Disconnected!");
    });
  }

  searchOnChanged = (event) => {
    this.setState({ searchText: event.target.value });
  };

  acceptTicket = (question) => {
    var ticketData = {
      Name: "",
      Issue: "",
      Label: "",
      Question: question,
      Action: "Remove",
    };
    socket.send(JSON.stringify(ticketData));
  };

  removeTicket = (question) => {
    var ticketData = {
      Name: "",
      Issue: "",
      Label: "",
      Question: question,
      Action: "Remove",
    };
    socket.send(JSON.stringify(ticketData));
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
                  name={ticket.Name}
                  question={ticket.Message}
                  admin={true}
                  priority={ticket.Priority}
                  priorityLevels={this.state.priorityLevels}
                  acceptFunction={this.acceptTicket}
                  deleteFunction={this.removeTicket}
                ></Ticket>
              );
            })}
          </div>
        </div>
        <div className="rightMaster">
          <div className="accountNameTeacher">
            {"Welcome, " + this.props.name}
          </div>
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
