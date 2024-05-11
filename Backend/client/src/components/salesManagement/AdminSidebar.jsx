import React from "react";
import {
  BiHome,
  BiSolidUserAccount,
  BiPackage,
  BiHotel,
  BiCar,
  BiRestaurant,
  BiCalendarEvent,
  BiTrain,
} from "react-icons/bi";
import { PiChalkboardTeacher } from "react-icons/pi";
import { NavLink } from "react-router-dom"; // Import NavLink from React Router



export const AdminSidebar = () => {
  return (
    <div className="menu">
      <div className="logo">
        <a href="/admin/dashbard" className="">
          {/* <img src={logo} className="w-56" alt="Logo" /> */}
        </a>
      </div>

      <div className="menu--list">
        <NavLink to="/admin/dashbard" activeClassName="active" className="item">
          <BiHome className="icon" />
          Dashboard
        </NavLink>
        <NavLink to="/admin/guid" activeClassName="active" className="item">
          <PiChalkboardTeacher className="icon" />
          Supplier Managemant
        </NavLink>
        <NavLink to="/employees/allEmployee" activeClassName="active" className="item">
          <BiSolidUserAccount className="icon" />
          Employee Management
        </NavLink>
        <NavLink to="/admin/packages" activeClassName="active" className="item">
          <BiPackage className="icon" />
          Item Management
        </NavLink>
        <NavLink to="/admin/hotels" activeClassName="active" className="item">
          <BiHotel className="icon" />
          Sales Management
        </NavLink>
        <NavLink to="/admin/vehicle" activeClassName="active" className="item">
          <BiCar className="icon" />
          Customer Management
        </NavLink>
        <NavLink
          to="/admin/restaurant"
          activeClassName="active"
          className="item"
        >
          <BiRestaurant className="icon" />
          Purchase Management
        </NavLink>
        <NavLink to="/admin/guid" activeClassName="active" className="item">
          <PiChalkboardTeacher className="icon" />
          Return Management
        </NavLink>
       
      </div>
    </div>
  );
};

export default AdminSidebar