import "./App.css";
import React from "react";
import LoginPage from "./Components/LoginPage";
import TeacherView from "./Components/TeacherView";
import StudentView from "./Components/StudentView";
import CreateAccountPage from "./Components/CreateAccountPage";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      student: true, // default to student privledges
    };
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <div className={this.state.loggedIn ? "mContent" : "mContentOut"}>
            <Switch>
              <Route path="/createAccount">
                <CreateAccountPage />
              </Route>
              <Route path="/">
                {this.state.loggedIn ? (
                  this.state.student ? (
                    <StudentView /> //TODO: maybe redirects instead?
                  ) : (
                    <TeacherView /> //TODO: maybe redirects instead?
                  )
                ) : (
                  <LoginPage /> //TODO: maybe redirects instead?
                )}
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
