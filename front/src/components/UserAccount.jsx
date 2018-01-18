import React, { Component } from "react";
import "../App.css";
import AuthService from "./AuthService";
import decode from "jwt-decode";
export default class LoginForm extends Component {
  state = {
    loading: true,
    authorized: false
  };

  Auth = new AuthService();

  componentWillMount() {
    this.initialize();
  }

  initialize = async () => {
    // fetch(`http://localhost:3000/users/${this.props.match.params.id}`, {
    //   headers: {
    //     authorization: localStorage.getItem("id_token")
    //   }
    // })
    //   .then(res => {
    //     if (!res.ok) return Promise.reject(res);
    //     return res.json();
    //   })
    console.log(this.Auth.loggedIn());
    // console.log(this.Auth.getProfile());
    console.log(decode(this.Auth.getToken()));
    // console.log(localStorage.getItem("id_token"));
    // if (this.Auth.loggedIn()) {
    //   const user = this.Auth.getProfile();
    //   console.log(user);
    //   this.setState({ user, loading: false, authorized: true });
    // }
  };

  render() {
    if (this.state.loading) {
      return <p>loading...</p>;
    }

    if (!this.state.authorized) {
      return <p>Oups you must be logged in</p>;
    }

    return (
      <main className="App">
        <h1>{this.state.user.firstname}</h1>
        <p>{this.state.user.email}</p>
      </main>
    );
  }
}
