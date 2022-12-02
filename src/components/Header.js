import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Header() {
  const [isLogged, setisLogged] = useState(false);

  useEffect(() => {
    checkStorage();
    return () => {};
  }, [isLogged]);

  function checkStorage() {
    if (localStorage.getItem("token")) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
  }
  const logout = () => {
    localStorage.removeItem("token");
    setisLogged(false);
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <Link to="/">Todo App</Link>
        </div>
        <ul>
          <li>
            <Link to="/signin" onClick={logout}>
              <FaSignOutAlt /> Logout
            </Link>
          </li>
          <li>
            <Link to="/signin">
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <FaUser /> Register
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;
