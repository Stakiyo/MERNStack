import React from "react";
import Header from "../../Components/AdminComponents/Header";
import SideNav from "../../Components/AdminComponents/SideNav";
import BreadCrumbNav from "../../Components/AdminComponents/BreadCrumbNav";
import { useState, useEffect } from "react";
import axios from "axios";
function ManagePayment() {
  const host = "http://127.0.0.1:3000";
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [state, setState] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredData = paymentDetails.filter((row) => {
    return row.booking_id?.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  });
  useEffect(() => {
    axios
      .get(`${host}/api/payment/paymentRead`)
      .then((response) => {
        console.log(response.data);
        setPaymentDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state]);
  const handleVerify = (id) => {
    let payment_status = "Verified";
    let updatePayment = {
      payment_status,
    };

    axios
      .patch(`${host}/api/payment/updatePayment/${id}`, updatePayment)
      .then((response) => {
        console.log(response.data);
        setState(!state);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeny = (id) => {
    let payment_status = "Denied";
    let updatePayment = {
      payment_status,
    };

    axios
      .patch(`${host}/api/payment/updatePayment/${id}`, updatePayment)
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
            <i className="ml-1 mr-1 fa-solid fa-angle-right"></i>Manage Payment
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
              Manage Payment
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
                  onChange={handleSearch}
                  className="form-control float-right col-md-3 mb-2"
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
                    <th>Paid On</th>
                    <th>Transaction Id</th>

                    <th>Payment Status</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr style={{ whiteSpace: "nowrap" }} key={index}>
                        <th>{index + 1}</th>
                        <td>{item?.booking_id?.name}</td>
                        <td>{item?.package_id?.pname}</td>
                        <td>{item?.createdAt}</td>
                        <td>{item?.tId}</td>

                        <td>
                          <span
                            className={`badge ${
                              item?.payment_status === "Pending"
                                ? "badge-info"
                                : item?.payment_status === "Verified"
                                ? "badge-success"
                                : "badge-danger"
                            } rounded-pill`}
                          >
                            {item?.payment_status}
                          </span>
                        </td>
                        <td className="c-links">
                          <center>
                            <button
                              className=" btn btn-sm btn-success"
                              onClick={() => handleVerify(item?._id)}
                            >
                              Verify
                            </button>
                            <button
                              className=" btn btn-sm btn-danger ml-2"
                              onClick={() => handleDeny(item?._id)}
                            >
                              Deny
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

export default ManagePayment;
