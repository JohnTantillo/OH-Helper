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
    try {
      //socket = new WebSocket("wss://team-placeholder-oh.herokuapp.com/websocket");
      socket = new WebSocket("ws://localhost:3000/websocket");
    } catch (error) {
      alert("Error: Cannot establish websocket connection");
    }

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

  acceptTicket = () => {
    var ticketData = {
      Name: "",
      Issue: "",
      Label: "",
      Action: "Remove",
    };
    socket.send(JSON.stringify(ticketData));
  };

  updatePriority = (ticketData) => {
    socket.send(JSON.stringify(ticketData));
  };

  render() {
    return (
      <div className="teacherViewContainer">
        <div className="teacherQueueContainer">
          <div className="teacher headerText">Student Queue</div>
          <div className="teacherQueueWindow">
            <div className="ticketStorage">
              {this.state.ticket.map((ticket) => {
                return (
                  <Ticket
                    name={ticket.Name}
                    question={ticket.Message}
                    priority={ticket.Priority}
                    priorityLevels={this.state.priorityLevels}
                    acceptFunction={this.acceptTicket}
                    updateFunction={this.updatePriority}
                    admin={true}
                  />
                );
              })}
            </div>
            <div className="acceptButtonContainer">
              <Button
                active={true}
                text="Accept Next"
                onclick={this.acceptTicket}
                buttonType="acceptButton"
              />
            </div>
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
