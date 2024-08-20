import React from "react";
import { Link } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { TbPasswordUser } from "react-icons/tb";
import { BsEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignInModal(props) {
  const host = "http://127.0.0.1:3000";
  const nav = useNavigate();
  const [showBookPackageModal, setShowBookPackageModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState([]);
  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  const handleShowClick = (e) => {
    e.preventDefault();
    setShowBookPackageModal(true);
  };
  const handleCloseClick = () => {
    setShowBookPackageModal(false);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    const userInfo = { ...user, password: password };
    axios
      .post(`${host}/api/user/loginUser`, userInfo)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          localStorage.setItem(
            "usertoken",
            JSON.stringify(response.data.authToken)
          );
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.loggedInUser)
          );
          setTimeout(() => {
            nav("/tour-packages");
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(userInfo);
  };
  return (
    <div>
      <div
        className="modal fade show "
        tabIndex={-1}
        role="dialog"
        style={{
          display: "block",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
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
                onClick={props.closeSignInModal}
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="text-success mb-4">Signin with your Account</h5>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i>
                      <BsPersonFill />
                    </i>
                  </span>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i>
                      <TbPasswordUser />
                    </i>
                  </span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i onClick={handleClick}>
                      {showPassword ? <BsFillEyeFill /> : <BsEyeSlashFill />}
                    </i>
                  </span>
                </div>
              </div>
              <p className="text-success">
                Forgot Password?
                <span>
                  <Link
                    to="/forgot-password"
                    className="text-decoration-none text-primary ml-1"
                  >
                    Click here
                  </Link>
                </span>
              </p>

              <button
                className="btn btn-sm btn-success col-md-12 mb-2"
                onClick={handleSubmit}
              >
                SignIn
              </button>
              <small>
                By signin you agree our &nbsp;
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

export default SignInModal;
