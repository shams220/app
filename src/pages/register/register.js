import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const registerHandler=async()=>{
try{
    const data = {username,email,password}
const response = await axios.post('http://localhost:3000/appi/v1/user/register',data)
console.log(response.data)
navigate('/');
}catch(error){
console.log("Error: "+error.message)
}

  }
  
  return (
    <div>
      <div>
        <input
          value={username}
          onChange={(e) => setusername(e.target.value)}
          type="text"
          placeholder="Username"
        />
      </div>
     
      <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        
      </div>
      <div>
        <input type="text "
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="Password" />
        
      </div>
      <div><button onClick={registerHandler}>register</button></div>
    </div>
  );
};

export default Register;
