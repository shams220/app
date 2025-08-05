import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import './popUp.css'
const PopupButtons = () => {

    const navigate = useNavigate();
    const getStartedHandler=()=>{
        navigate('/register')
    }
    const loginHandler=()=>{
        navigate('/login')
    }
  const btnsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      btnsRef.current,
      { scale: 0.75, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.3 // small delay between buttons (remove if you want perfect sync)
      }
    );
  }, []);

  return (
    <div className="btnDiv">
     
      <button onClick={loginHandler} ref={el => btnsRef.current[1] = el} className="lmBtn login">
        Login
      </button>
      <button onClick={getStartedHandler} ref={el => btnsRef.current[0] = el} className="getstrBtn">
        Get Started
      </button>
      <button ref={el => btnsRef.current[1] = el} className="lmBtn">
        Learn More
      </button>
    </div>
  );
};

export default PopupButtons;
