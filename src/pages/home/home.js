import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navbar from "../../navbar";
import { HoverBorderGradient } from "../../components/ui/hover-border-gradient";
import Dither from "../../src/components/Dither/Dither";
import "./home.css";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
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
      {/* <Dither /> */}
      {/* <Dither className="dither-container" /> */}
      <div className="hDiv">
        <Dither
          style={{ position: "absolute", width: "1920px", height: "63rem" }}
          className="dither-container"
        />

        <Navbar create={togglePopup} logout={logoutHandler} />
        <div className="borderDiv">
          {/* <div>
        {" "}
        <button onClick={adminHandler}>Admin</button>
        <button onClick={logoutHandler}>logout</button>
        <button onClick={togglePopup}>Create</button>
      </div> */}
          <div >
            {isOpen && (
              <div className="popup">
                <div>
                  <label style={{ color: "white" }} htmlFor="">
                  
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="title"
                  />
                </div>
                <div>
                  <label htmlFor=""></label>
                  <textarea style={{rows:"50px",
  cols:"50px"}}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="textarea"
                    placeholder="description"
                  />
                </div>
                <button  onClick={todohandler}>save</button>
              </div>
            )}
          </div>
          {/* <HoverBorderGradient><button>shams</button></HoverBorderGradient> */}

          <div className="todoDiv">
            {/* <h1>{todo.userTODO[6].title}</h1> */}
            {Array.isArray(todo) &&
              todo.map((value, key) => (
                <div key={key} className="todoAlone">
                  <div className="titlleDescription">
                    <div>
                      <strong>{value.title}</strong>
                    </div>
                    <br />
                    <div> {value.description}</div>
                  </div>

                  <div className="todoBtn">
                    <button onClick={() => editHandeler(value)}>Edit</button>
                    <button onClick={() => deleteTodo(value._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
          
        </div>

      </div>

    </div>
  );
};

export default Home;
