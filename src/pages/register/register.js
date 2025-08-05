import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./register.scss";

import { BackgroundBeamsWithCollision } from "../../../src/components/ui/background-beams-with-collision";
const Register = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerHandler = async () => {
    try {
      const data = { username, email, password };
      const response = await axios.post(
        "http://localhost:3000/appi/v1/user/register",
        data
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    <BackgroundBeamsWithCollision>
      {
        <div className="registerPage w-full max-w-9xl mx-auto flex-shrink-0">
          <div className="leftDiv">
            <div>
              <img className="registerLogo" src="/imges/logo.png" alt="" />
            </div>
            <div className="text">
              <h1>welcom</h1>
              <h1 className="scndTxt">secon text</h1>
            </div>
            <div className="leftImg">
              <DotLottieReact
                src="https://lottie.host/fa7c81af-a87a-4958-8d39-19e93580c6f4/cDLq58x1OJ.lottie"
                loop
                autoplay
              />
            </div>
          </div>
          <div className="rightDiv">
            <div class="container">
              <form>
                <p>Welcome</p>
                <input type="email" placeholder="Email" />
                <br />
                <input type="password" placeholder="Password" />
                <br />
                <input type="button" value="Sign in" />
                <br />
                <a href="#">Forgot Password?</a>
              </form>

              <div class="drops">
                <div class="drop drop-1"></div>
                <div class="drop drop-2"></div>
                <div class="drop drop-3"></div>
                <div class="drop drop-4"></div>
                <div class="drop drop-5"></div>
              </div>
            </div>
          </div>
        </div>
      }
    </BackgroundBeamsWithCollision>
  );
};

export default Register;
