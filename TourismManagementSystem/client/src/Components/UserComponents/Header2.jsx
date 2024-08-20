import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../UserComponents/Header2.css";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useState, useEffect } from "react";
const Header2 = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("usertoken") != null) {
      setUser(JSON.parse(localStorage.getItem("usertoken")));
      setLoggedInUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  let nav = useNavigate();
  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("usertoken");
    await nav("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand  navbar-light bg-primary fixed-top nav-pd-bottom">
        <div className="nav-items navbar-collapse main-nav-links ">
          <ul className="navbar-nav me-auto item-links">
            <li id="profile">
              <Link to="/profile">My Profile</Link>
            </li>
            <li>
              <Link to="/booking-history">Bookings</Link>
            </li>
            <li>
              <Link to="/payment-history">Payments</Link>
            </li>

            <li className="greet">
              Welcome
              <span className="pl-2">{loggedInUser?.username}</span>
            </li>
            <li className="nav-logout">
              <button
                className=" btn btn-sm text-white"
                style={{ backgroundColor: "#121abf" }}
                onClick={logout}
              >
                <i>
                  <RiLogoutCircleRLine />
                </i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header2;
