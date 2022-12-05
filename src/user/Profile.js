import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SignIn from "./SignIn";
import Form from "../components/Form";
import TodoList from "../components/TodoList";

function Header() {
  const navigate = useNavigate();

  const [isLogged, setisLogged] = useState(false);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    checkStorage();
    return () => {};
  }, [isLogged]);

  function checkStorage() {
    if (localStorage.getItem("token")) {
      let Details = JSON.parse(localStorage.getItem("user"));
      console.log(Details);
      setisLogged(true);
      setUserDetails(Details);
    } else {
      setisLogged(false);
    }
  }
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    setisLogged(false);
    navigate("/signin");
  };

  return (
    <div>
      <div className="text-right py-5 px-14">
        <button
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      {userDetails ? (
        <div>
          <h1 className="font-bold text-center text-3xl">
            Welcome <span className="text-green-500"> {userDetails.name}</span>
          </h1>
          <p className="text-center font-semibold">Create Your Todo and Task</p>
          <Form id={userDetails._id} />
          <TodoList id={userDetails._id} />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default Header;
