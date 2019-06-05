import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILES

} from './types';

// get current users profile

export  const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch ({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({ 
      type: PROFILE_ERROR,
      payload: { msg: err.responce }
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// create or update profile

export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      hedders:{
        'Content-type' : 'application/json' 
      }
    }

    const res = await axios.post('/api/profile', formData, config)

    dispatch ({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile updated' : 'Profile Created'));

    if(!edit) {
      history.push('/profile');
    }

    
  } catch (err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({ 
      type: PROFILE_ERROR,
      payload: { msg: err.responce }
    });
  }
}