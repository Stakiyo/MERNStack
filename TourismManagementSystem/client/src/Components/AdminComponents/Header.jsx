import React, { useState, useEffect } from "react";
import "../AdminComponents/Header.css";
import { Link } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Header = ({ click }) => {
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("admintoken") != null) {
      setAdmin(JSON.parse(localStorage.getItem("admintoken")));
      setLoggedInAdmin(JSON.parse(localStorage.getItem("admin")));
    }
  }, []);

  let nav = useNavigate();
  const logout = async () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("admintoken");
    await nav("/login");
  };
  return (
    <div>
      <nav className=" app-header navbar navbar-expand navbar-light nav-background  fixed-top ">
        <div className="side-nav-button p-3 me-3 text-light">
          <i
            className="fa-solid fa-bars text-white"
            id="toggle-bars"
            onClick={click}
          />
        </div>
        <Link to="/tour-packages">
          <nav className=" navbar-brand  text-white ">
            <strong>Tourism Management System</strong>
          </nav>
        </Link>
        <div className="nav-items navbar-collapse p-0">
          <div className="my-2 my-lg-0">
            <div className="container">
              <ul className=" navbar-nav ">
                <li className="greet-admin">
                  Welcome
                  <span className="pl-2">{loggedInAdmin?.name}</span>
                </li>
                <li className="logout">
                  <Link to="/login">
                    <button
                      className="btn btn-sm btn-primary text-white mt-1"
                      onClick={logout}
                    >
                      <i className="text-white">
                        <RiLogoutCircleRLine />
                      </i>
                      Logout
                    </button>
                  </Link>
                </li>

                <li className="avatar">
                  <i className="text-white">
                    <Link to="/admin-profile">
                      <BsPersonCircle size={40} color="white" />
                    </Link>
                  </i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
