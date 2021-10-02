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
    bcrypt.hash(this.state.password, 10, function (err, hash) {
      var b64hash = btoa(hash);
      fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: b64hash }),
      })
    })
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
            />
            <p className="password inputHeader">Password:</p>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="Password..."
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
              onclick={()=>{return true}}
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
