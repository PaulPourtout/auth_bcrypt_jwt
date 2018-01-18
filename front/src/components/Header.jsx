import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

export default class Header extends Component {
  state = {
    signOut: false
  };
  signOut = () => {
    localStorage.clear();
    this.setState({ signOut: true });
  };
  render() {
    if (this.state.signOut) return <Redirect to="/" />;
    return (
      <header className="header">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
          <li>
            <Link to={`/account/1`}>Protected</Link>
          </li>
          <li>
            <button onClick={this.signOut}>Déconnexion</button>
          </li>
        </ul>
      </header>
    );
  }
}
