import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Navbar from "../components/navbar.component";
export default class CreateEmployee extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
    this.onChangeAttended = this.onChangeAttended.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
    };
    this.showAttendDate = true;
  }
  onChangeEmployeeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeAttended(e) {
    this.setState({
      attended: e.target.value,
    });
    if (e.target.value === "false") {
      this.showAttendDate = false;
    }
    if (e.target.value === "true") {
      this.showAttendDate = true;
    }
  }
  onChangeDate(date) {
    this.setState({
      attendDate: date,
    });
  }
  async onSubmit(e) {
    e.preventDefault();
    this.state.attended = this.state.attended || "true";
    const data = {
      name: this.state.name,
      attended: this.state.attended,
      attendDate: this.state.attendDate,
    };
    try {
      await axios({
        method: "POST",
        url: "http://localhost:5000/api/employees",
        data,
        withCredentials: true,
      });
      window.location = "/";
    } catch (err) {
      alert(err.response.data.message);
    }
    this.setState({
      name: "",
      attendDate: "",
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div>
          <h3 style={{ textAlign: "center", marginBottom: "1em" }}>
            Add New Employee
          </h3>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Employee Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeEmployeeName}
            />
          </div>
          <div className="form__group" style={{ margin: "1em" }}>
            <label style={{ marginRight: "1em" }}>Attendance Status</label>
            <select
              className="form__input"
              id="attended"
              type="text"
              onChange={this.onChangeAttended}
            >
              <option className="form__input" id="attended" value="true">
                Yes
              </option>
              <option className="form__input" id="attended" value="false">
                No
              </option>
            </select>
          </div>
          {this.showAttendDate ? (
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.attendDate}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="form-group">
            <input
              type="submit"
              value="Add"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "15em" }}
            />
          </div>
        </form>
      </div>
    );
  }
}
