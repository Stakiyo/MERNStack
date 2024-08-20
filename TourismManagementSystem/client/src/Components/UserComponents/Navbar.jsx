import React from "react";
import { Link } from "react-router-dom";
import "../UserComponents/Navbar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("usertoken") != null) {
      setUser(JSON.parse(localStorage.getItem("usertoken")));
    }
  }, []);
  return (
    <div>
      <nav
        className="navbar navbar-expand navbar-light bg-success px-2  py-2 fixed-top"
        style={{ marginTop: "8.5rem", zIndex: 1 }}
      >
        <div className="nav-items navbar-collapse">
          <ul className=" navbar-nav me-auto nav-items ">
            {!user ? (
              <li>
                <Link to="/" className="text-white">
                  Home
                </Link>
              </li>
            ) : (
              ""
            )}

            <li>
              <Link to="/about" className="text-white ">
                About
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-white">
                Terms of Use
              </Link>
            </li>

            <li>
              <Link to="/enquiry" className="text-white">
                Enquiry
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
