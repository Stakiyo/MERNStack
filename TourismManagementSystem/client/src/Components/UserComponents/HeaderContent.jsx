import React from "react";
import "../UserComponents/HeaderContent.css";
const HeaderContent = () => {
  return (
    <div>
      <nav
        className=" navbar navbar-expand navbar-light  bg-white px-2 py-0 fixed-top"
        style={{ marginTop: "45px", zIndex: 1 }}
      >
        <nav className="navbar-brand px-4 text-white">
          <h1
            style={{
              marginLeft: "100px",
              paddingBottom: "10px",
              paddingTop: "20px",
            }}
          >
            <span className="text-primary">Tourism</span>
            <span className="text-success"> Management System</span>
          </h1>
        </nav>
        <div className="nav-items navbar-collapse">
          <ul className=" navbar-nav me-auto">
            <li className="text">
              <p
                className="text-primary font-semibold"
                style={{ paddingTop: "20px" }}
              >
                <i
                  className=" fa fa-lock text-primary"
                  style={{ marginRight: "10px" }}
                />
                <small>SAFE & SECURE</small>
              </p>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default HeaderContent;
