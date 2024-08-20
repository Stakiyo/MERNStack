import React, { useState, useEffect } from "react";
import HeaderContent from "../../Components/UserComponents/HeaderContent";
import Header from "../../Components/UserComponents/Header";
import AboutBanner from "../../Components/UserComponents/AboutBanner";
import { FaTelegramPlane } from "react-icons/fa";
import Footer from "../../Components/UserComponents/Footer";
import axios from "axios";
import Navbar from "../../Components/UserComponents/Navbar";
const Enquiry = () => {
  const [enquiry, setEnquiry] = useState([]);
  const host = "http://127.0.0.1:3000";

  const handleChange = (e) => {
    setEnquiry({ ...enquiry, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    axios
      .post(`${host}/api/enquiry/createEnquiry`, enquiry)
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
      <Header />
      <HeaderContent />
      <Navbar />
      <AboutBanner />
      <h4
        className="text-success"
        style={{ marginTop: "50px", marginLeft: "80px" }}
      >
        Enquiry
      </h4>

      <div className="col-md-5 ml-5 mt-3 ">
        <div className="card-body mt-2">
          <div className="form-group">
            <label htmlFor="username">Full Name</label>
            <input
              type="text"
              id="username"
              name="name"
              className="form-control"
              placeholder="Fullname"
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              name="subject"
              className="form-control"
              placeholder="Subject"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <textarea
              id="desc"
              type="text"
              name="description"
              className="form-control"
              placeholder="Description"
              cols={10}
              rows={5}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-sm btn-danger" onClick={handleSubmit}>
            <FaTelegramPlane size={18} color="white" />
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Enquiry;
