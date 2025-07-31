import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Login = () => {

     const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
    const navigate = useNavigate();
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
            navigate('/home');
        }catch(error){
            console.log("Error"+error.message);
        }
      }
  return (
    <div >
      <div>
        <div>
          <input 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="text" 
          placeholder="Email" />
        </div>
        <div>
          <input 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}type="password" placeholder="Password" />
        </div>
        <div>
          <button onClick={loginHandler}>login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
