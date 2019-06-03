import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/aa_logo_blu-02.png";
import "./styles/NavBar.css"

function NavBar() {
  return (
    <div className="container">
    <ul className="nav nav-tabs">
      <li className="nav-item" id="logoLink">
        <Link
          to="/"
          className={
            window.location.pathname === "/myprofile" ? "nav-link active" : "nav-link"
          }
        >
          <img
            className="logoImg"
            src={logo}
            alt="Logo"
            style={{ height: "50px" }}
          />
          <p className="aa" style={{ height: "40px" }}>
            <span>A</span>rtists <span>A</span>ccumulated
          </p>
        </Link>
      </li>
      
      <li className="nav-item">
        <Link
          to="/myart"
          className={
            window.location.pathname === "/myart" ? "nav-link active" : "nav-link"
          }
        >
          My Art
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/arttips"
          className={
            window.location.pathname === "/arttips" ? "nav-link active" : "nav-link"
          }
        >
          Art Tips
        </Link>
      </li>
      <li>
      <Link
          to="/"
          className={
            window.location.pathname === "/" ? "nav-link active" : "nav-link"
          }
        >
          Logout
        </Link>
        </li>
    </ul>
    </div>
  )
}

export default NavBar;