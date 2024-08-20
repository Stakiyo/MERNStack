import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LoginModal() {
  const host = "http://127.0.0.1:3000";
  const [admin, setAdmin] = useState();
  const nav = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    axios
      .post(`${host}/api/admin/adminLogin`, admin)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          localStorage.setItem(
            "admintoken",
            JSON.stringify(response.data.authToken)
          );
          localStorage.setItem(
            "admin",
            JSON.stringify(response.data.loggedInAdmin)
          );
          setTimeout(() => {
            nav("/admin-panel");
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("admin", admin);
  return (
    <div>
      <div
        className="modal fade show"
        tabIndex={-1}
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog" role="document">
          <div
            className="modal-content"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              boxShadow: "0 0 10px #fff",
              marginTop: "10rem",
            }}
          >
            <div className="modal-body">
              <h5 className="text-dark mb-4 text-center">Login Form</h5>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
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
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                className="btn btn-sm btn-success
                   col-md-12 mb-2"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
