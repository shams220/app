import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navbar from "../../navbar";
import { HoverBorderGradient } from "../../components/ui/hover-border-gradient";
import Dither from "../../src/components/Dither/Dither";
import Particles from "../../src/pages/landing/lanfing.js/Particles/Particles";
import DescriptionBox from "../../components/custom/description";

import "./home.css";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);


const [visibleTodos, setVisibleTodos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

 const TODOS_PER_PAGE = 10;
const [page, setPage] = useState(0); // page 0 = latest 10, page 1 = older 10, ...
const sortedTodos = [...todo].reverse(); // now index 0 is NEWEST
const startIdx = page * TODOS_PER_PAGE;
const todosToShow = sortedTodos.slice(startIdx, startIdx + TODOS_PER_PAGE);
const maxPage = Math.floor((sortedTodos.length - 1) / TODOS_PER_PAGE);

  useEffect(() => {
    if (todo.length > 0) {
      // Get the 10 most recent, latest at the end
      const tenLatest = todo.slice(-10);
      setVisibleTodos(tenLatest);
      setCurrentIndex(tenLatest.length - 1); // Show latest by default
    } else {
      setVisibleTodos([]);
      setCurrentIndex(0);
    }
  }, [todo]);

  // console.log(todo[4].title)
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(
        "http://localhost:3000/api/v1/todo/getTodo",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setTodos(response.data.userTODO);
      }
    } catch (error) {
      console.log("error fetching todos:" + error.message);
    }
  };

  const todohandler = async () => {
    try {
      const d = { title, description };
      const token = localStorage.getItem("userToken");
      if (editId) {
        await axios.put(
          `http://localhost:3000/api/v1/todo/updateTodo/${editId}`,
          d,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/v1/todo/create",
          d,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      //   console.log("response",res.data);
      setDescription("");
      setTitle("");
      setIsOpen(!isOpen);
      setEditId(null);
      await fetchTodos();
    } catch (error) {
      console.log("Error" + error.message);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  const togglePopup = () => {
    setEditId(null); // Creating new
    setTitle("");
    setDescription("");
    setIsOpen(true);
  };

  const editHandeler = (todo) => {
    setIsOpen(true);
    setTitle(todo.title);
    setDescription(todo.description);
    setEditId(todo._id);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("userToken");
      // console.log("todo_ID"+todo._id);
      const response = await axios.delete(
        `http://localhost:3000/api/v1/todo/deleteTodo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTodos();
    } catch (err) {
      console.log("Error from frontend:" + err.message);
    }
  };

  const adminHandler = () => {
    navigate("/admin");
  };
  return (
    <div className="homeDiv">
      {/*      
      <Waves  style={{ position: "absolute", width: "1920px", height: "63rem" }}
          className="waves-bg"/>
      <div className="hDiv"> */}

      <div className="pBg">
        <Particles style={{ width: "145%", height: "145%" }} />
      </div>
      <Navbar create={togglePopup} logout={logoutHandler} />
      <div className="borderDiv">
        <div>
          {isOpen && (
            <div className="popup">
              <div>
                <label style={{ color: "white" }} htmlFor=""></label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="title"
                />
              </div>
              <div>
                <label htmlFor=""></label>
                <textarea
                  style={{ rows: "50px", cols: "50px" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="textarea"
                  placeholder="description"
                />
              </div>
              <button onClick={todohandler}>save</button>
            </div>
          )}
        </div>
        {/* <HoverBorderGradient><button>shams</button></HoverBorderGradient> */}

        <div className="todoDiv">
  {todosToShow.length > 0 ? (
    todosToShow.map((value, key) => (
      <div key={value._id} className="todoAlone">
        <div className="titlleDescription">
          <div className="titleTXT">
            <strong>{value.title}</strong>
          </div>
          <br />
          <DescriptionBox text={value.description}/>
        </div>
        <div className="todoBtn">
          <button className="editBtn" onClick={() => editHandeler(value)}>
            Edit
          </button>
          <button className="dltbtn" onClick={() => deleteTodo(value._id)}>
            Delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <div>No todos to show!</div>
  )}

  <div className="carousel-controls" style={{textAlign:"center", marginTop:"25px"}}>
  <div className="carouselbtns">
     <div>
     <button
      onClick={() => setPage(Math.max(page - 1, 0))}
      disabled={page === 0}
      className="prevBtn"
      style={{marginRight: "12px"}}
    >
      {"<"}
    </button>
   </div>
    {/* <span style={{color: '#aaa', fontSize: '0.95em'}}>
      Page {page + 1} / {maxPage + 1}
    </span> */}
    <div>
      <button
      onClick={() => setPage(Math.min(page + 1, maxPage))}
      disabled={page === maxPage}
      className="nextBtn"
      style={{marginLeft: "12px"}}
    >
     {">"}
    </button>
    </div>
  </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Home;
