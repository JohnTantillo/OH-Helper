import React from "react";
import RouteButton from "./RouteButton.jsx";
import bcrypt from "bcryptjs";

export default class CreateAccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
      ubit: "",
      accType: "student",
    };
  }

  createAccount = () => {
    var name = this.state.name;
    var email = this.state.email;
    var ubit = this.state.ubit;
    var cPass = this.state.confirmPass;
    var pass = this.state.password;
    var accType = this.state.accType;
    var success = true;
    if (cPass !== pass) {
      return false;
    }
    // bcrypt.genSalt(10, function (err, salt) {
    //   bcrypt.hash(pass, salt, function (err, hash) {
    //     var b64hash = btoa(hash);

    //   });
    // });
    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: pass,
        name: name,
        ubit: ubit,
        salt: "",
        accType: accType,
      }),
    });
    return success;
  };

  nameOnChange = (event) => {
    this.setState({ name: event.target.value });
  };

  emailOnChange = (event) => {
    this.setState({ email: event.target.value });
  };
  passwordOnChange = (event) => {
    this.setState({ password: event.target.value });
  };

  confirmPassOnChange = (event) => {
    this.setState({ confirmPass: event.target.value });
  };

  ubitOnChange = (event) => {
    this.setState({ ubit: event.target.value });
  };

  accTypeOnChange = (event) => {
    this.setState({ accType: event.target.value });
  };

  render() {
    return (
      <div className="createPageContainer">
        <div className="logoText">OH-Helper</div>
        <div className="createWindowContainer">
          <div className="createWindow">
            <p className="createHeader">Create Account</p>
            <div className="lineBreak"></div>
            <p className="name inputHeader">Full Name:</p>
            <input
              type="text"
              className="name input"
              placeholder="Full Name..."
              onChange={this.nameOnChange}
            />
            <p className="email inputHeader">Email:</p>
            <input
              type="text"
              className="email input"
              placeholder="Email..."
              onChange={this.emailOnChange}
            />
            <p className="password inputHeader">Password:</p>
            <input
              type="password"
              className="password input"
              placeholder="Password..."
              onChange={this.passwordOnChange}
            />
            <p className="cPassword inputHeader">Confirm Password:</p>
            <input
              type="password"
              className="cPassword input"
              placeholder="Confirm Password..."
              onChange={this.confirmPassOnChange}
            />
            <p className="ubit inputHeader">UBIT:</p>
            <input
              type="text"
              className="ubit input"
              placeholder="UBIT..."
              onChange={this.ubitOnChange}
            />
            <p className="accType inputHeader">Account Type:</p>
            <select
              className="accountType dropdown"
              onChange={this.accTypeOnChange}
            >
              <option value="student"> Student</option>
              <option value="teacher">Teacher</option>
            </select>
            <RouteButton
              active={true}
              route="/"
              onclick={this.createAccount}
              text="Create Account"
              buttonType="createButton"
            ></RouteButton>
          </div>
        </div>
      </div>
    );
  }
}
