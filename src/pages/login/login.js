import React from "react";
import { useState } from "react";
import axios from 'axios';
import './login.css';
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";

const Login = () => {

     const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const regidterbtn=()=>{
      navigate('/register')
    }
      const loginHandler=async()=>{
        try{
            const userInputData = {email,password}
            const response = await axios.post('http://localhost:3000/api/v1/user/login',userInputData);
            console.log("response:"+typeof(response))
            console.log("token" + response.data.token)
            const token = response.data.token;
            localStorage.setItem('userToken',token);
              setEmail("");
            setPassword("")
            // toast.succees("loginsuccessfull")
            navigate('/home');
        }catch(error){
            console.log("Error"+error.message);
        }
      }
  return (
    <div >
      <div className="">
        <div>
          <input 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="text" 
          placeholder="Email" 
          className=""
          />
        </div>
        <div>
          <input 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}type="password" placeholder="Password" />
        </div>
        <div>
          <button  className="loginBtn" onClick={loginHandler}>login</button>
          <button className="loginBtn" onClick={regidterbtn}>sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
