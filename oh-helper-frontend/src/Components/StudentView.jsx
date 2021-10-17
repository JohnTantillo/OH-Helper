import React from "react";
import Button from "./Button.jsx";
import TATile from "./TATile.jsx";
import Ticket from "./Ticket.jsx";

class StudentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: [{ name: "John Dunaske", question: "Is this a test?" }, { name: "John Dunaske", question: "Is this a test?" }],
      activeTAs: [],
      student: true,
      question: "",
      questionMaxLength: 100,
      questionMinLength: 20,
    };
  }

  questionOnChanged = (event) => {
    this.setState({ question: event.target.value });
  };

  submitQuestion = () => {
      console.log("Do stuff");
  }

  render() {
    return (
      <div className="studentViewContainer">
        <div className="studentQueueContainer">
          <div className="student headerText">Student Queue</div>
          <div className="studentQueueWindow">
            {this.state.ticket.map((ticket) => {
              return (<Ticket name={ticket.name} question={ticket.question} admin={false}></Ticket>)
            })}
          </div>
        </div>
        <div className="rightMasterStudent">
          <div className="accountName">{"Welcome, " + this.props.name}</div>
          <div className="activeTA headerText">Active TA's</div>
          <div className="activeTAWindow">
            {this.state.activeTAs.map((ta) => {
              return (<TATile name={ta.name} special={ta.specialties}></TATile>)
            })}
          </div>
          <div className="newQuestionContainer">
            <div className="newQuestionHeader">New Question</div>
            <p className="charCount">
              Min: {this.state.question.length}/{this.state.questionMinLength}
              {" "}
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
            <div className="buttonContainer">
                <Button active={true} text="Post" buttonType="postButton" onclick={this.submitQuestion}></Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentView;
