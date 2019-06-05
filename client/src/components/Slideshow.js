import React from 'react';
import { Fade } from 'react-slideshow-image';
import { Redirect } from 'react-router-dom';
import '../components/styles/Slideshow.css';
import { connect }from 'react-redux';
import PropTypes from 'prop-types';

 
const fadeImages = [
  require('../img/art1.jpg'),
  require('../img/art2.jpg'),
  require('../img/art3.jpg'),
  require('../img/art4.jpg'),
  require('../img/art5.jpg'),
  require('../img/art6.jpg'),
  require('../img/brushstroke.png')
];
 
const fadeProperties = {
  duration: 3000,
  transitionDuration: 500,
  infinite: true,
  indicators: true
}
 
const Slideshow = ({ isAuthenicated }) => {
  if(isAuthenicated) {
   return <Redirect to='/profile' />
  }
  return (
    <>
    <Fade {...fadeProperties}>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[0]} alt="Art1"/>
        </div>
        <h2> </h2>
      </div>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[1]} alt="Art1"/>
        </div>
        <h2> </h2>
      </div>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[2]} alt="Art1"/>
        </div>
        <h2> </h2>
      </div>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[3]} alt="Art1"/>
        </div>
        <h2> </h2>
      </div>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[4]} alt="Art1"/>
        </div>
        <h2> </h2>
      </div>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[5]} alt="Art1"/>
        </div>
        <h2> </h2>
      </div>
    </Fade>
    </>
  )
};

Slideshow.propTypes = {
  isAuthenicated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenicated: state.auth.isAuthenicated
})

export default connect(mapStateToProps)(Slideshow);
