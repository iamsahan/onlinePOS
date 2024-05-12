import React from "react";
import {Link} from 'react-router-dom';
// import "./header";


function Header({Toggle}){
    return (
  <nav className="navbar navbar-expand-lg bg-secondary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Purchase Management</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center " id="navbarSupportedContent">
        <ul className="nav ">
          <li className="nav-item">
            <Link to="/" className="nav-link">Order</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/add">New Order</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/status">Order Status</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/report">Report</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/email">Send Mail</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

}

export default Header;