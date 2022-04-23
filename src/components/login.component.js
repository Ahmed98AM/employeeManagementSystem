import React, { Component } from "react";
import axios from "axios";

export default class CreateEmployee extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
    };
    this.showAttendDate = true;
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  async onSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    try {
      await axios({
        method: "POST",
        url: "http://localhost:5000/api/users/login",
        data,
        withCredentials: true,
      });
      window.location = "/";
    } catch (err) {
      window.location = "/login";
      alert((err.response && err.response.data.message) || err);
    }
    this.setState({
      email: "",
      password: "",
    });
  }

  render() {
    return (
      <div>
        <div>
          <h3 style={{ textAlign: "center", marginBottom: "1em" }}>Login</h3>
        </div>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              placeholder="you@system.com"
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              minLength="8"
              placeholder="••••••••"
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1em" }}
          />
          <a
            className="btn btn-secondary"
            style={{ width: "100%", marginTop: "15em" }}
            href="/signup"
          >
            Sign Up
          </a>
        </form>
      </div>
    );
  }
}
