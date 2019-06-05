import React from 'react';
import{ Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
//import Spinner from '../components/layout/Spinner';
//import { getprofiles } from '../actions/profile';
//import { bindActionCreators } from '../../../../../../AppData/Local/Microsoft/TypeScript/3.4/node_modules/redux';


const ProfileItem = ({ profile: {
  user: { _id, name, avitar, medium },
  bio 
}
}) => {
  return (
    <div className="profile bg-light">
      <img src={avitar} alt='' className="round-img"/>
      <div>
        <h2>{name}</h2>
        <p>{medium}</p>
        <p>{bio}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
        View profile
      </Link>
      </div>
      <ul>

      </ul>
      </div>

    
  )
}

ProfileItem.propTypes = {
  profile:PropTypes.object.isRequired,
}

export default ProfileItem;
