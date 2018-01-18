import React, { Component } from "react";
import "../App.css";
// import

export default class NotFoundComponent extends Component {
  render() {
    return (
      <main className="App">
        <h1 className="errorStatusCode">404</h1>
        <p>Page Not Found !</p>
      </main>
    );
  }
}
