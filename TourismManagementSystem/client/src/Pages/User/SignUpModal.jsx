import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { MdEmail, MdMobileFriendly } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { FaMobile } from "react-icons/fa";
import { BsEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa6";
import { useState } from "react";
import "../User/SignUpModal.css";

import axios from "axios";
function SignUpModal(props) {
  const host = "http://127.0.0.1:3000";
  const [password, setPassword] = useState();
  const [user, setUser] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  // const emailPattern = /^[a-z0-9]+@[a-z]+.[a-z]{2,3}$/;
  const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  const mobilePattern = /^(0|91)?[6-9][0-9]{9}$/;
  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  function checkPassword(e) {
    let confirm_password = e.target.value;
    if (confirm_password === "") {
      setMessage("");
    } else if (password == confirm_password) {
      setMessage("");
    } else {
      setMessage("Password did not matched ");
    }
  }

  const validateEmail = (e) => {
    const emailInput = e.target.value;
    if (emailInput === "") {
      setEmailError("");
    } else if (!emailPattern.test(emailInput)) {
      setEmailError("*Invalid Email");
    } else {
      setEmailError("");
    }
  };

  const validateMobile = (e) => {
    const mobileInput = e.target.value;
    if (mobileInput === "") {
      setMobileError("");
    } else if (!mobilePattern.test(mobileInput)) {
      setMobileError("*Invalid Mobile");
    } else {
      setMobileError("");
    }
  };

  const handleSubmit = () => {
    props.closeSignUpModal();
    const fullUserInfo = {
      ...user,
      password: password,
      email: email,
      phone: phone,
    };

    axios
      .post(`${host}/api/user/registerUser`, fullUserInfo)
      .then((response) => {
        alert(response.data.message);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div
        className="modal fade show"
        tabIndex={-1}
        role="dialog"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div
          className="modal-dialog"
          role="document"
          style={{ maxWidth: "50%" }}
        >
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                className="btn-close"
                type="button"
                aria-label="Close"
                onClick={props.closeSignUpModal}
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="modal-title text-success mb-4">
                Create your Account
              </h5>

              <div className=" input-group mb-3">
                <div className=" input-group-prepend">
                  <span className="input-group-text">
                    <i>
                      <BsPersonFill />
                    </i>
                  </span>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className=" input-group mb-3">
                <div className=" input-group-prepend">
                  <span className="input-group-text">
                    <i>
                      <MdEmail />
                    </i>
                  </span>
                </div>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  onInput={validateEmail}
                  required
                />
              </div>
              <small className="text-danger text-left mt-0 ">
                {emailError}
              </small>
              <div className="input-group mb-3">
                <div className=" input-group-prepend">
                  <span className="input-group-text">
                    <i>
                      <FaMobile />
                    </i>
                  </span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Mobile"
                  onChange={(e) => setPhone(e.target.value)}
                  onInput={validateMobile}
                  required
                />
              </div>
              <small className="text-danger text-left">{mobileError}</small>
              <div className=" input-group mb-3">
                <div className=" input-group-prepend">
                  <span className="input-group-text">
                    <i>
                      <FaAddressCard />
                    </i>
                  </span>
                </div>
                <textarea
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className=" input-group mb-3">
                <div className=" input-group-prepend">
                  <span className="input-group-text">
                    <i>
                      <TbPasswordUser />
                    </i>
                  </span>
                </div>

                <input
                  type="text"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className=" input-group mb-3">
                <div className=" input-group-prepend">
                  <span className="input-group-text">
                    <i>
                      <TbPasswordUser />
                    </i>
                  </span>
                </div>
                <input
                  type={showPassword ? "password" : "text"}
                  name="con-password"
                  className="form-control"
                  placeholder="Confirm Password"
                  onInput={checkPassword}
                  required
                />
                <div className=" input-group-append">
                  <span className="input-group-text">
                    <i onClick={handleClick}>
                      {showPassword ? <BsEyeSlashFill /> : <BsFillEyeFill />}
                    </i>
                  </span>
                </div>
              </div>
              <p className="text-danger text-center">{message}</p>

              <button
                className="btn btn-sm btn-success col-md-12 mb-2"
                onClick={handleSubmit}
              >
                Create Account
              </button>
              <small className="mt-2">
                By signup you agree our &nbsp;
                <span>
                  <Link
                    className="text-success text-decoration-none"
                    to="/terms"
                  >
                    Terms and Conditions &nbsp;
                  </Link>
                </span>
                and &nbsp;
                <span>
                  <Link
                    className="text-success text-decoration-none"
                    to="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
