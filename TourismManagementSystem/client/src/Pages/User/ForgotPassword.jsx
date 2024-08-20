import React from "react";
import HeaderContent from "../../Components/UserComponents/HeaderContent";
import Header from "../../Components/UserComponents/Header";
import Navbar1 from "../../Components/UserComponents/Navbar";
import AboutBanner from "../../Components/UserComponents/AboutBanner";
import { FaTelegramPlane } from "react-icons/fa";
import Footer from "../../Components/UserComponents/Footer";
function ForgotPassword() {
  return (
    <div>
      <Header />
      <HeaderContent />
      <Navbar1 />
      <AboutBanner />
      <h4
        className="text-success"
        style={{ marginTop: "50px", marginLeft: "65px" }}
      >
        Recover Password
      </h4>

      <div className="col-md-5 ml-5 mt-3 ">
        <div className="card-body mt-2">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              id="mobile"
              type="tel"
              name="mobile"
              className="form-control"
              placeholder="Mobile"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newpassword">New Password</label>
            <input
              id="newpassword"
              type="text"
              name="password"
              className="form-control"
              placeholder="Password"
            />
          </div>

          <button className="btn btn-sm btn-danger">
            <FaTelegramPlane size={18} color="white" />
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
