import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Navbar from "../components/navbar.component";

export default class EditEmployee extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
    this.onChangeAttended = this.onChangeAttended.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: "",
      attended: "",
      attenDate: "",
    };
    this.showAttendDate = true;
  }
  async componentDidMount() {
    try {
      const res = await axios({
        method: "GET",
        url:
          "http://localhost:5000/api/employees/" +
          window.location.href.split("/").pop(),
        withCredentials: true,
      });
      this.setState({
        name: res.data.data.doc.name,
        attended: res.data.data.doc.attended,
        attendDate: res.data.data.doc.attenDate,
      });
      this.showAttendedStatus = this.state.attended.toString();
    } catch (err) {
      alert(err.res.data.message);
    }
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
      attendDate:
        JSON.stringify(this.state.attended) === "true"
          ? this.state.attendDate
          : null,
    };
    try {
      await axios({
        method: "PATCH",
        url:
          "http://localhost:5000/api/employees/" +
          window.location.href.split("/").pop(),
        data,
        withCredentials: true,
      });
      window.location = "/";
    } catch (err) {
      alert((err.response && err.response.data.message) || err);
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
            Edit Employee
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
              defaultValue="true"
              type="text"
              onChange={this.onChangeAttended}
            >
              <option className="form__input" value="true">
                Yes
              </option>
              <option className="form__input" value="false">
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
              value="Edit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "15em" }}
            />
          </div>
        </form>
      </div>
    );
  }
}
