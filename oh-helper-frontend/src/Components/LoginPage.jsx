import React from "react";
import Button from "./Button.jsx";
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
    bcrypt.hash(this.state.password, 10, function (err, hash) {
      var b64hash = btoa(hash);
      fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: b64hash }),
      });
    });
  }

  emailOnChange = (event) => {
    this.setState({ email: event.target.value });
  };

  passwordOnChange = (event) => {
    this.setState({ password: event.target.value });
  };

  createAccount = () => {
    //TODO: Navigate to create account (this will be likely done through a <Link> tag, not a function)
    console.log("Creating Account!");
  }

  render() {
    return (
      <div className="loginPageContainer">
        <div className="logoText">OH-Helper</div>
        <div className="loginWindowContainer">
          <div className="loginWindow">
            <p className="loginHeader">Login/Create Account</p>
            <div className="lineBreak"></div>
            <p className="emailInputHeader">Email:</p>
            <input
              type="email"
              name="email"
              id="email"
              className="emailInput"
              placeholder="Email..."
              onchange={this.emailOnChange}
            />
            <p className="passwordInputHeader">Password:</p>
            <input
              type="password"
              name="password"
              id="password"
              className="passwordInput"
              placeholder="Password..."
              onchange={this.passwordOnChange}
            />
            <Button
              active={true}
              onclick={() => this.login()}
              text="Login"
              buttonType="loginButton"
            ></Button>
            <Button
              active={true}
              onclick={() => this.createAccount()}
              text="Create Account"
              buttonType="createButton"
            ></Button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
