import React, { Component } from "react";
import axios from "axios";

export default class CreateEmployee extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
    this.showAttendDate = true;
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
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
  onChangePasswordConfirm(e) {
    this.setState({
      passwordConfirm: e.target.value,
    });
  }
  async onSubmit(e) {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };
    try {
      await axios({
        method: "POST",
        url: "http://localhost:5000/api/users/signup",
        data,
        withCredentials: true,
      });
      window.location = "/";
    } catch (err) {
      alert((err.response && err.response.data.message) || err);
    }
    this.setState({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  }

  render() {
    return (
      <div>
        <div>
          <h3 style={{ textAlign: "center", marginBottom: "1em" }}>
            HR Sign Up
          </h3>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
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
          <div className="form-group">
            <label>Password Confirm: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.passwordConfirm}
              onChange={this.onChangePasswordConfirm}
              minLength="8"
              placeholder="••••••••"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Sign Up"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "1em" }}
            />
          </div>
        </form>
      </div>
    );
  }
}
