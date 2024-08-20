import React from "react";
import { BsFacebook } from "react-icons/bs";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoInstagram } from "react-icons/bi";
import "../UserComponents/Footer.css";

const Footer = () => {
  return (
    <div>
      <nav
        className="navbar bg-success w-100"
        style={{ padding: "15px 15px", marginTop: "20px" }}
      >
        <div
          className="container-fluid pt-0 "
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              color: "white",
            }}
          >
            <ul className="logo">
              <li>
                <BsFacebook size={20} />
              </li>
              <li>
                <AiFillGoogleCircle size={23} />
              </li>
              <li>
                <AiOutlineTwitter size={25} />
              </li>
              <li>
                <BiLogoInstagram size={25} />
              </li>
            </ul>
          </div>
          <p className=" footer-text text-white">
            Tourism Management System - &copy;All Rights Reserved
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Footer;
