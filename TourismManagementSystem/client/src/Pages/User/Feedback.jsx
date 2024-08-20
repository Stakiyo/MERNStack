import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Feedback() {
  const [feedback, setFeedback] = useState(null);

  const host = "http://127.0.0.1:3000";
  const nav = useNavigate();

  let user = null;

  useEffect(() => {
    if (localStorage.getItem("usertoken") != null) {
      user = JSON.parse(localStorage.getItem("usertoken"));
    } else {
      nav("/");
    }
  }, []);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    axios
      .post(`${host}/api/feedback/createFeedback`, feedback)
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("feedback", feedback);
  return (
    <div>
      <h4
        className="text-success"
        style={{ marginTop: "50px", marginLeft: "5rem" }}
      >
        Feedback
      </h4>

      <div className="col-md-5 ml-5 mt-3 ">
        <div className="card-body mt-2">
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input
              id="username"
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email</label>
            <input
              id="Email"
              type="email"
              name="email"
              onChange={handleChange}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              id="mobile"
              type="tel"
              name="phone"
              onChange={handleChange}
              className="form-control"
              placeholder="Mobile"
            />
          </div>
          <div className="form-group">
            <label htmlFor="suggest">Write Your Suggestions</label>
            <textarea
              id="suggest"
              rows={5}
              type="text"
              name="suggestion"
              className="form-control"
              onChange={handleChange}
              placeholder="Type Here"
            />
          </div>

          <button className="btn btn-sm btn-danger" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
