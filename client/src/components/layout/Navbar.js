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
    <ul className="nav nav-tabs ">
      <li className="nav-item">
      {/* change names to correct component  */}
      <Link className="nav-link" to="/Profile"> Profile </Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/myart">My Art</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/video">Art Tips</Link>
      </li>
      <li className="nav-item">
      <Link onClick={logout}  className="nav-link" to="/">Logout</Link>
      </li>
      {/* <li>
        <Link to="/create-profile"> create profile </Link>
      </li> */}
    </ul>
    </div>
    
    
  );

  const guestLinks = (
    <div className="container">
    <ul className="nav nav-tabs ">
      <li className="nav-item">
      <Link className="nav-link" to="/LogIn">Login</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/register">Register</Link>
      </li>
      
      
    </ul>
    </div>
  );

//   return (
//     <div className="container">
//     <ul className="nav nav-tabs">
//       <li className="nav-item" id="logoLink">
//       {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
//         <Link
//           to="/"
//           className={
//             window.location.pathname === "/myprofile" ? "nav-link active logo" : "nav-link logo"
//           }
//         >
//           <img
//             className="logoImg"
//             src={logo}
//             alt=""
//             style={{ height: "50px" }}
//           />
//           <p className="white-space" />
//           <p className="aa" style={{ height: "40px" }}>{" "}<span>A</span>rtists <span>A</span>ccumulated
//           </p>
//         </Link>
//       </li>
      
//       <li className="nav-item">
//         <Link
//           to="/myart"
//           className={
//             window.location.pathname === "/myart" ? "nav-link" : "nav-link"
//           }
//         >
//           My Art
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link
//           to="/arttips"
//           className={
//             window.location.pathname === "/arttips" ? "nav-link" : "nav-link"
//           }
//         >
//           Art Tips
//         </Link>
//       </li>
//       <li>
//       <Link
//           to="/"
//           className={
//             window.location.pathname === "/" ? "nav-link" : "nav-link"
//           }
//         >
//           Logout
//         </Link>
//         </li>
//     </ul>
//     </div>
//   )
// }
  return (
    <div className="container ">
      <div className="nav nav-tabs">
      <div className="">
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
