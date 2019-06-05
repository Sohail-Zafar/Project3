import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData ] = useState({
    email: '',
    password: ''
  });

const { email, password, } = formData;

const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

const onSubmit = async e => {
  e.preventDefault();
    console.log('SUCCESS');
    login(email, password);
};

// redirect 
if(isAuthenticated) {
  return <Redirect to='/video' />
}

function LoginModal() {
  return (
    <div className="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Welcome Back!</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
   Something else
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal">Submit</button>
      </div>
    </div>
  </div>
</div>
  );
}

Login.propType = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps, 
  { login }
  )(LoginModal);