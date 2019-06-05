import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from "../../img/aa_logo_blu-02.png";
import "../styles/NavBar.css";


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div className="container">
    <div className="navbar navbar-expand-lg ">
      <Link className="nav-tabs" to="/landing"> Home  </Link>
    {/* change names to correct component  */}
      <Link className="nav-tabs" to="/Profile"> Profile </Link>
      <Link className="nav-tabs" to="/myart">My Art</Link>
      <Link className="nav-tabs box" to="/video">Art Tips</Link>
      <Link onClick={logout}  className="nav-tabs" to="/">Logout</Link>
    </div>
    </div>
    
    
  );

  const guestLinks = (
    <div className="navbar navbar-expand-lg ">
      <Link className="nav-tabs" to="/LogIn">Login</Link>
      <Link className="nav-tabs" to="/register">Register</Link>
    </div>
  );

  
  return (
    <div className="navbar navbar-expand-lg ">
      <div className="right menu">
      <div className="container">
      <img
            className="logoImg"
            src={logo}
            alt="Logo"
            style={{ height: "60px" }}
          />
          <p className="aa" style={{ height: "50px" }}>
            <span>A</span>rtists <span>A</span>ccumulated
          </p>
    </div>
        {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout }) (Navbar);
