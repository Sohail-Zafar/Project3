import React from "react";
import brushstroke from '../img/brushstroke.png';
import "./styles/Slideshow.css";

function Slideshow() {
  return (
    <>
      <div className="slider">
        <img className="brushstroke" src={brushstroke} alt="brushstroke"/>
        <div className="slide1" />
        <div className="slide2" />
        <div className="slide3" />
        <div className="slide4" />
        <div className="slide5" />
        <div className="slide6" />
        <div className="slide6" />
     
      <div style={{height: "400px", width: "200%",  top: 40, position: "absolute"}}><img className="brushstroke" src={brushstroke} alt="brushstroke"/></div>
      </div> 
      
    </>
  );
}

export default Slideshow;
