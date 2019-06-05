import React, { useEffect, Fragment } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../components/layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
//import CreateProfile from "../profile-forms/CreateProfile";


const Profile = ({ getCurrentProfile,
   auth: { user },
    profile: {profile, loading} }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  
  return (loading && profile === null ? <Spinner /> : <Fragment>
    <h1>Profile</h1>
    <p className='lead'>
      <i className='fas fa-user'></i> Welcome { user && user.name }
    </p>
    {profile !== null ? (
  <Fragment><p>Has</p></Fragment>) : (<Fragment> <p>Yoy have not yet set up a profile </p>
    <Link to="/create-profile" className='btn btn-primary my-1'>
      Create Profile
    </Link>
   </Fragment>)}
  </Fragment>

  )
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
