import React, { Component } from "react";
import "../App.css";

export default class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  updateInput = e => {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log("submit", this.state);
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    }).then(res => console.log(res));
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
          <button onClick={this.handleLogin}>Login</button>
        </form>
      </main>
    );
  }
}

// export default LoginForm;
