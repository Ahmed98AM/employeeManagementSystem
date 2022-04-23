import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import EmployeeList from "./components/employees-list.component";
import EditEmployee from "./components/edit-employee.component";
import CreateEmployee from "./components/create-employee.component";
import Login from "./components/login.component";
import Signup from "./components/signup.component";

function App() {
  return (
    <Router>
      <div className="container">
        <br />
        <Routes>
          <Route path="/" element={<EmployeeList></EmployeeList>} />
          <Route path="/user" element={<CreateEmployee></CreateEmployee>} />
          <Route path="/edit/:id" element={<EditEmployee></EditEmployee>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/signup" element={<Signup></Signup>} />
          <Route path="*" element={<Login></Login>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
