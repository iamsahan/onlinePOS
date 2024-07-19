import React from 'react'
import {BiHome, BiBookAlt, BiMessage, BiTask, BiStats, BiSolidReport} from 'react-icons/bi'
import { FaFacebookMessenger, FaListAlt, FaShoppingBag } from "react-icons/fa";
import "../../styles/sidebar.css"
import { useState } from "react";

const Sidebar = () => {
    const [active, setActive] = useState("1");

    const handleClick = (event) => {
        setActive(event.target.id);
    }
    return (
    <div className="menu">
        <div className="logo">
            <BiBookAlt className="logo-icon"/>
            <h2>WebPos</h2>
        </div>

        <div className="menu-list">
            <a href="/cashier" id={"1"} onClick={handleClick} className={(active === "1" ? "active item":"item")}  >
                <BiTask className="icon"/>
                Dashboard
            </a>

            <a href="/cashier" id={"1"} onClick={handleClick} className={(active === "1" ? "active item":"item")}  >
                <BiHome className="icon"/>
                Point Of Sales
            </a>
            <a href="/sales" id={"2"} onClick={handleClick} className={(active === "2" ? "active item":"item")}  >
                <FaListAlt className="icon"/>
                Sales Management
            </a>
            <a href="/productlist" id={"3"} onClick={handleClick} className={(active === "3" ? "active item":"item")}  >
                <FaShoppingBag className="icon"/>
                Product Management
            </a>
            <a href="/suplist" id={"3"} onClick={handleClick} className={(active === "3" ? "active item":"item")}  >
                <FaShoppingBag className="icon"/>
                Inventory Management
            </a>
            <a href="/suplist" id={"3"} onClick={handleClick} className={(active === "3" ? "active item":"item")}  >
                <FaShoppingBag className="icon"/>
                Supplier Management
            </a>
            <a href="#" id={"4"} onClick={handleClick} className={(active === "4" ? "active item":"item")}  >
                <FaFacebookMessenger className="icon"/>
                Customer Management
            </a>
            <a href="#" id={"5"} onClick={handleClick} className={(active === "5" ? "active item":"item")}  >
                <BiSolidReport className="icon"/>
                Reports
            </a>
        </div>
    </div>
  )
}

export default Sidebar