import React, { useEffect, useState } from "react";
import "../Admin/AdminProfile.css";
import Header from "../../Components/AdminComponents/Header";
import SideNav from "../../Components/AdminComponents/SideNav";
import BreadCrumbNav from "../../Components/AdminComponents/BreadCrumbNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminProfile() {
  const host = "http://127.0.0.1:3000";
  const [admin, setAdmin] = useState();
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  let Admin = null;
  useEffect(() => {
    if (localStorage.getItem("admintoken") != null) {
      Admin = JSON.parse(localStorage.getItem("admintoken"));
    } else {
      nav("/login");
    }

    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (adminData) {
      setAdmin(adminData);
    }
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  function checkPassword(e) {
    let confirm_password = e.target.value;
    if (confirm_password === "") {
      setMessage("");
    } else if (password === confirm_password) {
      setMessage("");
    } else {
      setMessage("Password did not matched ");
    }
  }
  const handleSubmit = () => {
    const adminInfo = { ...admin, password: password };
    axios
      .put(`${host}/api/admin/adminUpdate/${admin?._id}`, adminInfo)

      .then((response) => {
        alert(response.data.message);
        localStorage.setItem(
          "admin",
          JSON.stringify(response.data.updatedAdmin)
        );
        setTimeout(() => {
          nav("/admin-panel");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <SideNav />
      <BreadCrumbNav
        title={
          <>
            <i className="ml-1 mr-1 fa-solid fa-angle-right"></i>Admin Profile
          </>
        }
      />
      <div className="container mtop-6 mleft-6 col-lg-9 mb-4">
        <div className="card bg-light ml-3 pl-4 border-dark">
          <div className="card-body"></div>
          <h4 className="text-primary  d-inline mb-4">Admin Profile</h4>

          <div className="form-group row mr-2">
            <label
              htmlFor="name"
              className="control-label col-sm-2 col-form-label"
            >
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={handleChange}
                value={admin?.name}
                required
              />
            </div>
          </div>
          <div className="form-group row mr-2">
            <label
              htmlFor="email"
              className="control-label col-sm-2 col-form-label"
            >
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                onChange={handleChange}
                value={admin?.email}
                required
              />
            </div>
          </div>
          <div className="form-group row mr-2">
            <label
              htmlFor="password"
              className="control-label col-sm-2 col-form-label"
            >
              New Password
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group row mr-2">
            <label
              htmlFor="password"
              className="control-label col-sm-2 col-form-label"
            >
              Confirm Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="password"
                name="con-password"
                onInput={checkPassword}
                required
              />
            </div>
          </div>
          <p className="text-danger text-center">{message}</p>
          <div className=" form-group row">
            <button
              className="btn btn-sm btn-info btn-update-ml col-md-2"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
