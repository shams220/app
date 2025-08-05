import React from "react";
import { Link } from "react-router-dom";
import './navbar.css'
const Navbar = (props) => {
  return (
    <>
      <nav className="nav">
        <div className="navDiv">
       <div>
           <ul className="list">
             <li><Link to='/home'>home </Link></li>
             <li><Link to='/admin'>Admin</Link></li>
             <li><button  className ='createBtn' onClick={props.create}>Create</button>

             </li>
             </ul>
       </div>
            <div className="sndDiv">
            <button className="logoutBtn" onClick={props.logout}>logOut</button>
            </div>
          
        </div>
      </nav>
    </>
  );
};
export default Navbar;
