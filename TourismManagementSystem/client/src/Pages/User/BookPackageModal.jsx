import React, { useEffect } from "react";
import { BsPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaMobile } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function BookPackageModal(props) {
  const host = "http://127.0.0.1:3000";
  const nav = useNavigate();
  const [persons, setPersons] = useState();
  const [packageInfo, setPackageInfo] = useState();
  const [user, setUser] = useState([]);
  const [booking, setBooking] = useState([]);
  const grandTotal = persons * props.price;
  const handleInput = (e) => {
    setPersons(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("usertoken") != null) {
      let userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    } else {
      nav("/");
    }

    axios
      .get(`${host}/api/booking/readBooking`)
      .then((response) => {
        console.log(response.data);
        setBooking(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleChange = (e) => {
    setPackageInfo({ ...packageInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    let fullInfo = {
      ...packageInfo,
      persons: persons,
      userId: user?._id,
      packageId: props.p_id,
      grandTotal: grandTotal,
    };
    axios
      .post(`${host}/api/booking/packageBooking`, fullInfo)
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        setTimeout(() => {
          nav("/booking-history");
        });
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
        style={{
          display: "block",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="modal-dialog mt-3"
          role="document"
          style={{ maxWidth: "60%" }}
        >
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title text-success mt-3 pb-0">
                Book Package
              </h5>
              <button
                className="btn-close"
                type="button"
                aria-label="Close"
                onClick={props.closeModal}
              ></button>
            </div>
            <div className="modal-body">
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
                  name="name"
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
                  id="email"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className=" input-group mb-3">
                <div className=" input-group-prepend">
                  <span className="input-group-text">
                    <i>
                      <FaMobile />
                    </i>
                  </span>
                </div>

                <input
                  id="mobile"
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="Mobile"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className=" input-group mb-3">
                <div className=" input-group-prepend">
                  <span className="input-group-text">
                    <i>
                      <FaUsers />
                    </i>
                  </span>
                </div>
                <input
                  id="persons"
                  type="number"
                  name="persons"
                  className="form-control"
                  placeholder="No of Persons"
                  value={persons}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="form-group">
                <h5 className="text-right">
                  <span className="text-danger">Grand Total :&nbsp;</span>
                  <span id="amount">&#8377;{grandTotal ? grandTotal : 0}</span>
                </h5>
              </div>

              <button
                className="btn btn-sm btn-success col-md-12 mb-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPackageModal;
