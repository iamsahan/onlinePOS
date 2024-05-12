import React from "react";
import {Link} from 'react-router-dom';
import "../Return/header.css";



function Header({Toggle}){
    return (
  <nav className="navbar navbar-expand-lg bg-secondary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Employee Management</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className=" " id="navbarSupportedContent">
        <ul className="nav ">
          <li className="nav-item">
            <Link to="/employees/create" className="nav-link">Add Employee</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Employees/allEmployee">All Employee</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/employees/reportEmployee">Report</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/EmployeeAttendence/allEmployeeAttendence">Attendance</a>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
);

}

export default Header;