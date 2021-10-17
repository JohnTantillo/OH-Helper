import React from "react";
import Button from "./Button.jsx";
import RouteButton from "./RouteButton.jsx";
import bcrypt from "bcryptjs";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  //TODO: Functions to verify email and password are "valid"

  login = () => {
    var email = this.state.email;
    var pass = this.state.password;

    // bcrypt.genSalt(10, function (err, salt) {
    //   bcrypt.hash(pass, salt, function (err, hash) {
    //     var b64hash = btoa(hash);
        
    //   });
    // });

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: pass, salt:""}),
    })
      .then((response) => response != "" ? response.json() : "")
      .then((success) => {
        console.log(success)
        if (success !== "") {
          if (success.AccType === "teacher") {
            this.props.loginFlag(true, false, success.Username);
          } else if (success.AccType === "student") {
            this.props.loginFlag(true, true, success.Username);
          } else if (success.AccType === "instructor") {
            this.props.loginFlag(true, false, success.Username);
          }
        } else {
          this.props.loginFlag(false, false, "");
        }
      });
    return true;
  };

  emailOnChange = (event) => {
    this.setState({ email: event.target.value });
  };

  passwordOnChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="loginPageContainer">
        <div className="logoText">OH-Helper</div>
        <div className="loginWindowContainer">
          <div className="loginWindow">
            <p className="loginHeader">Login/Create Account</p>
            <div className="lineBreak"></div>
            <p className="email inputHeader">Email:</p>
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              placeholder="Email..."
              onChange={this.emailOnChange}
            />
            <p className="password inputHeader">Password:</p>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="Password..."
              onChange={this.passwordOnChange}
            />
            <Button
              active={true}
              onclick={this.login}
              text="Login"
              buttonType="loginButton"
            ></Button>
            <RouteButton
              active={true}
              route="/createAccount"
              onclick={() => {
                return true;
              }}
              text="Create Account"
              buttonType="createButton"
            ></RouteButton>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
