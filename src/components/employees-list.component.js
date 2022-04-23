import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.component";
import axios from "axios";

const Employee = (props) => (
  <tr>
    <td>{props.employee.name}</td>
    {props.employee.attended ? <td>Attended</td> : <td>Did not attend</td>}

    <td>
      {props.employee.attendDate
        ? props.employee.attendDate.substring(0, 10)
        : ""}
    </td>
    <td>
      <Link to={"edit/" + props.employee._id}>edit</Link> |{" "}
      <a
        href="/#"
        onClick={() => {
          props.deleteEmployee(props.employee._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);
export default class EmployeeList extends Component {
  constructor(props) {
    super(props);

    this.deleteEmployee = this.deleteEmployee.bind(this);

    this.state = { employees: [] };
  }

  async componentDidMount() {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:5000/api/employees`,
        withCredentials: true,
      });
      this.setState({ employees: res.data.data.doc });
    } catch (err) {
      window.location = "/login";
      alert((err.response && err.response.data.message) || err);
    }
  }

  async deleteEmployee(id) {
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:5000/api/employees/${id}`,
        withCredentials: true,
      });
    } catch (err) {
      alert((err.response && err.response.data.message) || err);
    }

    this.setState({
      employees: this.state.employees.filter((el) => el._id !== id),
    });
  }

  employeeList() {
    return this.state.employees.map((emp) => {
      return (
        <Employee
          employee={emp}
          deleteEmployee={this.deleteEmployee}
          key={emp._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Employee Name</th>
              <th>Attendance Status</th>
              <th>Attendance Date</th>
            </tr>
          </thead>
          <tbody>{this.employeeList()}</tbody>
        </table>
      </div>
    );
  }
}
