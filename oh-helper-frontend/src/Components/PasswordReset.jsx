import React from "react";
import RouteButton from "./RouteButton.jsx";


export default class PasswordReset extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            email: "",
            newPass: "",
            confirmPass: "",
        };
    }

    updateEmail = (event) => {
        this.setState({email: event.target.value});
    }

    updatePass = (event) => {
        this.setState({newPass: event.target.value});
    }

    updateConfirmPass = (event) => {
        this.setState({confirmPass: event.target.value});
    }

    handleUpdatePass = () => {
        fetch("/password_reset")
        .then((response) => {
            if (response.ok === false) {
                alert("Error connecting to server.");
            } else {
                console.log(response);
            }
        })
        return true;
    }

    render() {
        return(
            <div className="pageContainer">
                <div className="passWindowContainer">
                    <div className="passWindow">
                        <p className="resetLabel">Password Reset</p>
                        <div className="lineBreak"></div>
                        <p className="emailLabel">Account Email:</p>
                        <input type="email" className="emailInput" placeholder="Account Email..." onChange={this.updateEmail}/>
                        <p className="passwordLabel">New Password:</p>
                        <input type="password" className="passwordInput" placeholder="New Password..." onChange={this.updatePass}/>
                        <p className="confirmPasswordLabel">Confirm New Password:</p>
                        <input type="password" className="confirmPasswordInput" placeholder="Confirm Password..." onChange={this.updateConfirmPass}/>
                        <RouteButton active={true} text={"Reset"} route={"/"} buttonType={"resetButton"} onclick={this.handleUpdatePass}></RouteButton>
                    </div>
                </div>
            </div>
        );
    }
}