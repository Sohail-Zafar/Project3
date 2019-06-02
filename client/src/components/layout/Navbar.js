import React, { Fragment } from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';



const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div className="ui secondary  menu">
      <Link className="active item" to="/">Home</Link>,
    {/* change names to correct component  */}
      <Link className="item" to="/damages">Damages</Link>,
      <Link className="item" to="/drivers">Drivers</Link>,
      <div className="right menu">
      <Link onClick={logout}  className="ui item" to="/">Logout</Link>
    </div>
    </div>
    
  );

  const guestLinks = (
    <div className="right menu">
      <Link className="ui item" to="/login">Login</Link>,
      <Link className="ui item" to="/register">Register</Link>
    </div>
  );

  
  return (
    <div className="ui secondary  menu">
      <div className="right menu">
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
