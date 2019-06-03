import React, { Fragment } from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from "../../img/aa_logo_blu-02.png";
import "../styles/NavBar.css";
import "../styles/Wrapper.css";



const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div className="container">
    <div className="ui secondary  menu">
      <Link className="nav-item" to="/landing">Home</Link>
    {/* change names to correct component  */}
      <Link className="nav-item" to="/Profile">Profile</Link>
      <Link className="nav-item" to="/myart">My Art</Link>
      <Link className="nav-item" to="/video">Art Tips</Link>
      <div className="right menu">
      <Link onClick={logout}  className="ui item" to="/">Logout</Link>
    </div>
    </div>
    </div>
    
  );

  const guestLinks = (
    <div className="right menu">
      <Link className="ui item" to="/login">Login</Link>
      <Link className="ui item" to="/register">Register</Link>
    </div>
  );

  
  return (
    <div className="ui secondary  menu">
      <div className="right menu">
      <div className="container">
      <img
            className="logoImg"
            src={logo}
            alt="Logo"
            style={{ height: "50px" }}
          />
          <p className="aa" style={{ height: "40px" }}>
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
