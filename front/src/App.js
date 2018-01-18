import React, { Component } from "react";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import UserAccount from "./components/UserAccount.jsx";
// import NotFoundComponent from "./components/NotFoundComponent.jsx";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/account/:id" component={UserAccount} />
          {
            // <Route path="*" component={NotFoundComponent} />
          }
        </div>
      </Router>
    );
  }
}

export default App;
