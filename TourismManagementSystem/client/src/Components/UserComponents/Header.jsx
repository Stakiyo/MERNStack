import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../UserComponents/Header.css";
import { useState, useEffect } from "react";
import SignInModal from "../../Pages/User/SignInModal";
import SignUpModal from "../../Pages/User/SignUpModal";
import { RiLogoutCircleRLine } from "react-icons/ri";
const Header = () => {
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
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
  const handleCloseSignInModal = () => {
    setOpenSignInModal(false);
  };
  const handleOpenSignInModal = () => {
    setOpenSignInModal(true);
  };

  const handleCloseSignUpModal = () => {
    setOpenSignUpModal(false);
  };
  const handleOpenSignUpModal = () => {
    setOpenSignUpModal(true);
  };
 
  return (
    <div>
      {user ? (
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
      ) : (
        <div>
          <nav className="navbar navbar-expand  navbar-light bg-primary fixed-top py-0 px-2 ">
            <div className="nav-items navbar-collapse">
              <ul className="navbar-nav me-auto">
                <li className="admin-login">
                  <Link to="/login" className="text-white login">
                    Admin Login
                  </Link>
                </li>
                <li className="header-text">
                  <p className="text-white " style={{ marginBottom: "12px" }}>
                    Toll Number : 123-4568790
                  </p>
                </li>

                <li className="nav-signup">
                  <button
                    className="btn btn-sm  text-white"
                    onClick={handleOpenSignUpModal}
                    style={{ backgroundColor: "#121abf" }}
                  >
                    Sign Up
                  </button>
                </li>
                <li className="nav-signin">
                  <button
                    className=" btn btn-sm text-white"
                    onClick={handleOpenSignInModal}
                    style={{ backgroundColor: "#121abf" }}
                  >
                    Sign In
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
      {openSignUpModal && (
        <SignUpModal closeSignUpModal={handleCloseSignUpModal} />
      )}
      {openSignInModal && (
        <SignInModal closeSignInModal={handleCloseSignInModal} />
      )}
    </div>
  );
};

export default Header;
