import decode from "jwt-decode";

export default class AuthService {
  domain = "http://localhost:3000";
  fetch = this.fetch.bind(this);
  login = this.login.bind(this);
  getProfile = this.login.bind(this);

  login(email, password) {
    return this.fetch(`${this.domain}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => {
      this.setToken(res.token);
      return Promise.resolve(res);
    });
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  getProfile() {
    decode(this.getToken());
  }

  fetch(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    if (this.loggedIn()) {
      headers["authorization"] = this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(res => this._checkStatus(res))
      .then(res => res.json());
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status <= 300) {
      return response;
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
