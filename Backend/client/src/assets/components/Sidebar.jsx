import React from 'react'
import {BiHome, BiBookAlt, BiMessage, BiTask, BiStats, BiSolidReport} from 'react-icons/bi'

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
            <h2>ShopName</h2>
        </div>

        <div className="menu-list">
            <a href="#" id={"1"} onClick={handleClick} className={(active === "1" ? "active item":"item")}  >
                <BiHome className="icon"/>
                Home
            </a>
            <a href="#" id={"2"} onClick={handleClick} className={(active === "2" ? "active item":"item")}  >
                <BiMessage className="icon"/>
                Item 
            </a>
            <a href="#" id={"3"} onClick={handleClick} className={(active === "3" ? "active item":"item")}  >
                <BiTask className="icon"/>
                Purchase 
            </a>
            <a href="/suplist" id={"4"} onClick={handleClick} className={(active === "4" ? "active item":"item")}  >
                <BiStats className="icon"/>
                Supplier
            </a>
            <a href="#" id={"5"} onClick={handleClick} className={(active === "5" ? "active item":"item")}  >
                <BiStats className="icon"/>
                Sale
            </a>
            <a href="#" id={"6"} onClick={handleClick} className={(active === "6" ? "active item":"item")}  >
                <BiSolidReport className="icon"/>
                Customer
            </a>
            <a href="#" id={"7"} onClick={handleClick} className={(active === "7" ? "active item":"item")}  >
                <BiSolidReport className="icon"/>
                Employee
            </a>
            <a href="#" id={"8"} onClick={handleClick} className={(active === "8" ? "active item":"item")}  >
                <BiSolidReport className="icon"/>
                Return
            </a>
        </div>
    </div>
  )
}

export default Sidebar