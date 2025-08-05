import React from "react";
import "./landing.css";
import Particles from "../../src/pages/landing/lanfing.js/Particles/Particles";
import SplitText from "../../src/components/TextAnimations/SplitText/SplitText";
import FadeContent from "../../src/components/FadeContent/FadeContent";
import PopupButtons from "../../src/components/popupButton";

const Landing = () => {
  return (
    <div className="whole">
      <div
        className="sirDiv"
        style={{
          color: "white",
          position: "relative",
          minHeight: "100vh",
          width: "100%", // <-- changed here!
          overflow: "hidden",
        }}
      >
       <div>
         <div>
          <img src="imges/logo.png" alt="" className="lg" />
          
        </div>
       </div>
        <div className="textbtnMain">
          <div className="textBtnDiv">
            <SplitText
              text=""
            />
            
            <FadeContent>
              <p> Organize your day effortlessly, achieve more with every simple task
            completed.</p>
            </FadeContent>
            {/* <FadeContent>
              <div className="btnDiv">
                <div>
                  <button className="getstrBtn">Get Started</button>
                </div>
                <div>
                  <button className="lmBtn">Learn More</button>
                </div>
              </div>
            </FadeContent> */}
            <PopupButtons/>
          </div>
          
        </div>
        <Particles className="particles-bg" />
        {/* add your landing content here */}
      </div>
    </div>
  );
};

export default Landing;
