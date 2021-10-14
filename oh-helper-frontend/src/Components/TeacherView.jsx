import React from "react";
import Button from "./Button.jsx";
import Ticket from "./Ticket.jsx";

class StudentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: [{name: "Lauren Bilancia", question: "Do you love me?"}],
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
                return (<Ticket name={ticket.name} question={ticket.question}></Ticket>)
            })}
          </div>
        </div>
        <div className="rightMaster">
          <div className="studentSearchHeader">Student Search:</div>
          <input
            className="studentSearchBar"
            type="text"
            placeholder="Search..."
            onChange={this.searchOnChanged}
          >
          </input>
          <Button buttonType="search" active={true} text="Search"></Button>
          <div className="resultsContainer">
            {this.state.searchResults.map((result) => {
              <p>Test</p>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default StudentView;
