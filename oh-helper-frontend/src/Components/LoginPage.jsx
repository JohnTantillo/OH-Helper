import React from "react";
import Button from "./Button.jsx";

class LoginPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.createAccount = this.createAccount.bind(this);
  };

  //TODO: Functions to verify email and password are "valid"

  login() {
    //TODO: implement sending the credentials to the webserver
    console.log("Logging In!")
  };

  createAccount() {
    //TODO: Navigate to create account (this will be likely done through a <Link> tag, not a function)
    console.log("Creating Account!")
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
            />
            <p className="passwordInputHeader">Password:</p>
            <input
              type="password"
              name="password"
              id="password"
              className="passwordInput"
              placeholder="Password..."
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
