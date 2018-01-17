import React, { Component } from "react";
import "../App.css";

export default class RegisterForm extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordCheck: "",
    disableBtn: true
  };

  updateInput = async e => {
    const newState = {};
    newState[e.target.name] = e.target.value;
    await this.setState(newState);
    this.canSendForm();
  };

  nonEmptyString = field => {
    if (typeof field === "string" && field !== "") return true;
    else return false;
  };

  canSendForm = () => {
    const nonEmptyFields = this.checkNonEmptyFields();
    const passwords = this.checkPassword(
      this.state.password,
      this.state.passwordCheck
    );
    console.log("nonEmptyFields", nonEmptyFields, "pass", passwords);
    if (nonEmptyFields && passwords) {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
  };

  checkNonEmptyFields = () => {
    const { firstname, lastname, email, password, passwordCheck } = this.state;
    if (
      this.nonEmptyString(firstname) &&
      this.nonEmptyString(lastname) &&
      this.nonEmptyString(email) &&
      this.nonEmptyString(password) &&
      this.nonEmptyString(passwordCheck)
    ) {
      return true;
    } else {
      return false;
    }
  };

  checkPassword = (password, passwordCheck) => {
    console.log("pass", password, "check", passwordCheck);
    if (password === passwordCheck) return true;
    else return false;
  };

  handleRegister = e => {
    e.preventDefault();
    const { firstname, lastname, email, password } = this.state;
    console.log("submit", this.state);
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstname, lastname, email, password })
    }).then(res => console.log(res));
  };

  render() {
    console.log(this.state);
    return (
      <main className="App">
        <form action="">
          <label htmlFor="firstname">First name :</label>
          <input
            type="firstname"
            name="firstname"
            placeholder="James"
            onChange={this.updateInput}
            value={this.state.firstname}
          />
          <label htmlFor="lastname">Last name :</label>
          <input
            type="lastname"
            name="lastname"
            placeholder="Bond"
            onChange={this.updateInput}
            value={this.state.lastname}
          />
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            placeholder="me@mail.com"
            onChange={this.updateInput}
            value={this.state.email}
          />
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.updateInput}
            value={this.state.password}
          />
          <label htmlFor="password">Confirm password :</label>
          <input
            type="password"
            name="passwordCheck"
            placeholder="password"
            onChange={this.updateInput}
            value={this.state.passwordCheck}
          />
          <button
            className="confirmBtn"
            style={{
              backgroundColor: this.state.disableBtn ? "#9C9C9C" : "#BADA55"
            }}
            disabled={this.state.disableBtn}
            onClick={this.state.disableBtn ? null : this.handleLogin}
          >
            Register
          </button>
        </form>
      </main>
    );
  }
}
