import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Navbar extends Component {
  async logOutFunc() {
    try {
      await axios({
        method: "GET",
        url: "http://localhost:5000/api/users/logout",
        withCredentials: true,
      });
      window.location = "/login";
    } catch (err) {
      alert((err.response && err.response.data.message) || err);
    }
  }
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light "
        style={{ marginBottom: "5em" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Employees Management System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto " style={{ float: "right" }}>
              <div>
                <li className="nav-item">
                  <a onClick={this.logOutFunc} href="/#" className="nav-link">
                    Logout
                  </a>
                </li>
              </div>
              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  Add New Employee
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
