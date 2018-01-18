import React, { Component } from "react";
import "../App.css";
import AuthService from "./AuthService";

export default class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  Auth = new AuthService();

  updateInput = e => {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  handleLogin = e => {
    e.preventDefault();
    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace("/");
      })
      .catch(err => alert(err));
  };

  render() {
    return (
      <main className="App">
        <form action="">
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
          <button className="confirmBtn" onClick={this.handleLogin}>
            Login
          </button>
        </form>
      </main>
    );
  }
}
