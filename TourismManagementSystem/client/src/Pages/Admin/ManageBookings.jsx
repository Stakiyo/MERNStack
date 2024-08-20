import React, { useState, useEffect, useMemo } from "react";
import Header from "../../Components/AdminComponents/Header";
import SideNav from "../../Components/AdminComponents/SideNav";
import BreadCrumbNav from "../../Components/AdminComponents/BreadCrumbNav";
import "../Admin/ManageBookings.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [accept, setAcceptModal] = useState(true);
  const [state, setState] = useState(true);
  const [payment, setPayment] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const host = "http://127.0.0.1:3000";
  let admin = null;
  const nav = useNavigate();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredData = bookings.filter((row) => {
    return row.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  useEffect(() => {
    if (localStorage.getItem("admintoken") != null) {
      admin = JSON.parse(localStorage.getItem("admintoken"));
    } else {
      nav("/login");
    }

    axios
      .get(`${host}/api/booking/readBookingAdmin`, {
        headers: { "auth-token": admin },
      })
      .then((response) => {
        console.log(response.data);
        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${host}/api/payment/paymentRead`)
      .then((response) => {
        console.log(response.data);
        setPayment(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state]);

  const handleConfirm = (id) => {
    let status = "Confirmed";
    let updateInfo = {
      status,
    };

    axios
      .patch(`${host}/api/booking/updateBookings/${id}`, updateInfo)
      .then((response) => {
        console.log(response.data);
        setState(!state);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCancel = (id) => {
    let status = "Cancelled";
    let updateInfo = {
      status,
    };

    axios
      .patch(`${host}/api/booking/updateBookings/${id}`, updateInfo)
      .then((response) => {
        console.log(response.data);
        setState(!state);
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
            <i className="ml-1 mr-1 fa-solid fa-angle-right"></i>Manage Bookings
          </>
        }
      />
      <div className="table-container mtop-6 mleft-6 col-lg-9">
        <div className="card bg-light p-0 border-dark mb-4">
          <div className="card-title">
            <h4
              className="text-primary mt-4 mb-1"
              style={{ marginLeft: "1.2rem" }}
            >
              Manage Bookings
            </h4>
            <div className="card-body py-2">
              <div className="col-12 p-0 mb-0 ">
                Showing&nbsp;
                <select id="record-select">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
                &nbsp;of <span id="allRecords"></span> Records
                <input
                  type="text"
                  id="bookings-search"
                  name="search_value"
                  placeholder="Search..."
                  className="form-control float-right col-md-3 mb-2"
                  onChange={handleSearch}
                />
              </div>
              <div className="table-responsive">
                <table
                  id="bookings-table"
                  className="table table-borderless table-striped  text-center"
                >
                  <thead
                    className="bg-danger text-white "
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <th>#</th>
                    <th>Name</th>
                    <th>Package</th>
                    <th>Booked On</th>
                    <th>Booked By</th>
                    <th>Status</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr style={{ whiteSpace: "nowrap" }} key={index}>
                        <th>{index + 1}</th>
                        <td>{item?.name}</td>
                        <td>{item?.package_id?.pname}</td>
                        <td>{item?.createdAt}</td>
                        <td>{item?.customer_id?.username}</td>

                        <td>
                          <span
                            className={`badge ${
                              item?.status === "Pending"
                                ? "badge-info  "
                                : item?.status === "Confirmed"
                                ? "badge-success  "
                                : "badge-danger "
                            } rounded-pill`}
                          >
                            {item?.status}
                          </span>
                        </td>
                        <td className="c-links">
                          <center>
                            <button
                              className=" btn btn-sm btn-success"
                              onClick={() => handleConfirm(item?._id)}
                            >
                              Confirm
                            </button>
                            <button
                              className=" btn btn-sm btn-danger ml-2"
                              onClick={() => handleCancel(item?._id)}
                            >
                              Cancel
                            </button>
                          </center>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageBookings;
