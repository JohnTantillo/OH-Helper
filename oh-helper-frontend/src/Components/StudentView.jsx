import React from "react";
import Button from "./Button.jsx";
import TATile from "./TATile.jsx";
import Ticket from "./Ticket.jsx";
//import {w3cwebsocket as W3CWebSocket} from "websocket";

//const client = new W3CWebSocket('ws://127.0.0.1:8000')

class StudentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: [
        { name: "John Dunaske", question: "This is a question", priority: 0 },
      ],
      activeTAs: [],
      student: true,
      question: "",
      questionMaxLength: 100,
      questionMinLength: 20,
      priorityLevels: { 0: "Homework", 1: "Exam", 2: "Lab", 3: "Lecture" },
      currentPriority: 0,
    };
  }

  componentDidMount = () => {
    // client.onopen = () => {
    //   console.log('WebSocket client connection');
    // };
    // client.onmessage = (message) => {
    //   console.log(message);
    // }

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
  };

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
                  name={ticket.name}
                  question={ticket.question}
                  admin={false}
                  priority={ticket.priority}
                  priorityLevels={this.state.priorityLevels}
                ></Ticket>
              );
            })}
          </div>
        </div>
        <div className="rightMasterStudent">
          <div className="welcomeStudent">{"Welcome, " + this.props.name}</div>
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
