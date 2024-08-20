import React, { useState } from "react";
import HeaderContent from "../../Components/UserComponents/HeaderContent";
import Header2 from "../../Components/UserComponents/Header2";
import Navbar from "../../Components/UserComponents/Navbar";
import AboutBanner from "../../Components/UserComponents/AboutBanner";
import { useEffect } from "react";
import Footer from "../../Components/UserComponents/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  const host = "http://127.0.0.1:3000";
  const nav = useNavigate();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  let data = null;
  let user = null;
  useEffect(() => {
    if (localStorage.getItem("usertoken") !== null) {
      user = JSON.parse(localStorage.getItem("usertoken"));
      data = JSON.parse(localStorage.getItem("user"));
      if (data) {
        setUserData(data);
      }
    } else {
      nav("/");
    }
  }, []);
  console.log("userdata", userData);

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
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const userInfo = { ...userData, password: password };

    axios
      .put(`${host}/api/user/updateUser/${userData?._id}`, userInfo)
      .then((response) => {
        alert(response.data.message);
        localStorage.setItem("user", JSON.stringify(response.data.updatedUser));

        setTimeout(() => {
          nav("/tour-packages");
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header2 />
      <HeaderContent />
      <Navbar />
      <AboutBanner />
      <h4
        className="text-success"
        style={{ marginTop: "50px", marginLeft: "80px" }}
      >
        My Profile
      </h4>

      <div className="col-md-5 ml-5 mt-3 ">
        <div className="card-body mt-2">
          <div className="form-group">
            <label htmlFor="name">User Name</label>
            <input
              type="text"
              id="name"
              name="username"
              className="form-control"
              placeholder="UserName"
              value={userData?.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              id="mobile"
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Mobile"
              value={userData?.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={userData?.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              type="text"
              name="password"
              className="form-control"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Confirm Password</label>
            <input
              id="email"
              type="password"
              name="con-password"
              className="form-control"
              placeholder="Confirm Password"
              onInput={checkPassword}
            />
          </div>
          <div className="form-group">
            <p>
              Last Updation Date:
              <span>{userData?.updatedAt}</span>
            </p>
          </div>
          <div className="form-group">
            <p>
              Reg Date:
              <span>{userData?.createdAt}</span>
            </p>
          </div>
          <p className="text-danger text-center">{message}</p>
          <button
            className="btn btn-sm text-white"
            style={{ backgroundColor: "#121abf" }}
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
