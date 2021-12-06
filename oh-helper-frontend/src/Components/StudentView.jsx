import React from "react";
import Button from "./Button.jsx";
import TATile from "./TATile.jsx";
import Ticket from "./Ticket.jsx";

var socket;

class StudentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: [],
      activeTAs: [],
      student: true,
      question: "",
      questionMaxLength: 100,
      questionMinLength: 20,
      priorityLevels: { 0: "Homework", 1: "Exam", 2: "Lab", 3: "Lecture" },
      currentPriority: 0,
    };
  }

  sendPing = () => {
    socket.send("Ping");
  }

  componentDidMount() {
    try {
      socket = new WebSocket("wss://team-placeholder-oh.herokuapp.com/websocket");
      //socket = new WebSocket("ws://localhost:3000/websocket");
    } catch (error) {
      alert("Error: Cannot establish websocket connection");
    }

    socket.addEventListener("open", (event) => {
      console.log("Websocket Connected!");
      setTimeout(this.sendPing, 5000);
    });

    socket.addEventListener("message", (event) => {
      var data = JSON.parse(event.data);
      if (Object.keys(data).includes("Queue")) {
        this.setState({ ticket: data["Queue"] });
      } else {
        this.setState({ activeTAs: data["activeTAs"] });
      }
      this.forceUpdate()
    });

    socket.addEventListener("close", (event) => {
      console.log("Websocket Disconnected!");
    });

    fetch("/getStudents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(""),
    })
      .then((response) => {
        if (response.ok === false) {
          alert("Error: Couldn't connect to server");
          return "";
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data === "") {
          return;
        }
        var taList = [];
        data.map((student) => {
          if (student.accType === true) {
            taList.push(student);
          }
        });

        this.setState({ activeTAs: taList });
      });
  }

  questionOnChanged = (event) => {
    this.setState({ question: event.target.value });
  };

  priorityOnChanged = (event) => {
    //this is convuluted but i refuse to make a second static object
    var grabPriority = Object.keys(this.state.priorityLevels).filter(
      (level) => {
        return this.state.priorityLevels[level] === event.target.value;
      }
    );
    this.setState({ currentPriority: grabPriority[0] });
  };

  submitQuestion = () => {
    var ticketData = {
      Name: this.props.name,
      Issue: this.state.question,
      Label: this.state.currentPriority,
      Action: "Add",
    };
    socket.send(JSON.stringify(ticketData));
  };

  render() {
    return (
      <div className="studentViewContainer">
        <div className="studentQueueContainer">
          <div className="student headerText">Student Queue</div>
          <div className="studentQueueWindow">
            {this.state.ticket.map((ticket) => {
              return (
                <Ticket
                  name={ticket.Name}
                  question={ticket.Message}
                  priority={ticket.Priority}
                  priorityLevels={this.state.priorityLevels}
                  admin={false}
                ></Ticket>
              );
            })}
          </div>
        </div>
        <div className="rightMasterStudent">
          <div className="welcomeStudent">
            {"Welcome, " + this.props.name}
            <Button active={true} text="Logout" buttonType="logoutButtonStudent" onclick={this.props.logout}></Button>
          </div>
          <div className="activeTA headerText">Active TA's</div>
          <div className="activeTAWindow">
            {this.state.activeTAs.map((ta) => {
              return <TATile name={ta.name} special={ta.specialties} />;
            })}
          </div>
          <div className="newQuestionContainer">
            <div className="newQuestionHeader">New Question</div>
            <p className="charCount">
              Min: {this.state.question.length}/{this.state.questionMinLength}{" "}
              Max: {this.state.question.length}/{this.state.questionMaxLength}
            </p>
            <textarea
              type="text"
              className="newQuestionInput"
              placeholder="Write question here..."
              maxLength={this.state.questionMaxLength}
              minLength={this.state.questionMinLength}
              onChange={this.questionOnChanged}
            ></textarea>
            <div className="studentButtonContainer">
              <Button
                active={true}
                text="Post"
                buttonType="postButton"
                onclick={this.submitQuestion}
              ></Button>
              <select
                className="priorityDropdown"
                onChange={this.priorityOnChanged}
              >
                {Object.values(this.state.priorityLevels).map((key) => {
                  return (
                    <option className="priorityOption" value={key}>
                      {key}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentView;
