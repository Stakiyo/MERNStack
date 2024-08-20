import React from "react";
import Header from "../../Components/AdminComponents/Header";
import SideNav from "../../Components/AdminComponents/SideNav";
import "../../Pages/Admin/Dashboard.css";
import { FaUsers } from "react-icons/fa";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FaTableCells } from "react-icons/fa6";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { PiChatsCircle } from "react-icons/pi";
import BreadCrumbNav from "../../Components/AdminComponents/BreadCrumbNav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Dashboard() {
  const nav = useNavigate();
  let admin = null;
  const [usersCount, setUsersCount] = useState(null);
  const [enquiriesCount, setEnquiriesCount] = useState(null);
  const [bookingsCount, setBookingsCount] = useState(null);
  const [packageCount, setPackageCount] = useState(null);
  const [newBookingsCount, setNewBookingsCount] = useState(null);
  const [confirmedBookingsCount, setConfirmedBookingsCount] = useState(null);
  const [cancelledBookingsCount, setCancelledBookingsCount] = useState(null);
  const [readEnquiriesCount, setReadEnquiriesCount] = useState(null);
  const [newEnquiriesCount, setNewEnquiriesCount] = useState(null);
  const [paymentsCount, setPaymentsCount] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const host = "http://127.0.0.1:3000";
  useEffect(() => {
    if (localStorage.getItem("admintoken") != null) {
      admin = JSON.parse(localStorage.getItem("admintoken"));
    } else {
      nav("/login");
    }

    axios
      .get(`${host}/api/user/usersCount`)
      .then((response) => {
        console.log(response.data);
        setUsersCount(response.data.count);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${host}/api/enquiry/enquiriesCount`)
      .then((response) => {
        console.log(response.data);
        setEnquiriesCount(response.data.count);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${host}/api/booking/bookingsCount`)
      .then((response) => {
        console.log(response.data);
        setBookingsCount(response.data.count);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${host}/api/package/packageCount`)
      .then((response) => {
        console.log(response.data);
        setPackageCount(response.data.count);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${host}/api/enquiry/readEnquiry`)
      .then((response) => {
        setEnquiries(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${host}/api/booking/newBookingsCount`)
      .then((response) => {
        setNewBookingsCount(response.data.count);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${host}/api/booking/confirmedBookingsCount`)
      .then((response) => {
        setConfirmedBookingsCount(response.data.count);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${host}/api/booking/cancelledBookingsCount`)
      .then((response) => {
        setCancelledBookingsCount(response.data.count);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${host}/api/enquiry/readEnquiriesCount`)
      .then((response) => {
        setReadEnquiriesCount(response.data.count);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${host}/api/enquiry/newEnquiriesCount`)
      .then((response) => {
        setNewEnquiriesCount(response.data.count);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${host}/api/payment/numberOfPayments`)
      .then((response) => {
        setPaymentsCount(response.data.count);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Header />
      <SideNav />
      <BreadCrumbNav
        title={
          <>
            <i className="ml-1 mr-1 fa-solid fa-angle-right"></i>Dashboard
          </>
        }
      />
      <div
        class="container"
        style={{ marginLeft: "230px", marginTop: "120px" }}
      >
        <div class="row gy-3 my-3 mx-3">
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div
              className="card text-white bg-secondary card-effect"
              style={{ height: "10rem" }}
            >
              <div className="card-body p-3">
                <h5 className="card-title">Users</h5>
                <p className="card-text">
                  <FaUsers size={40} />
                </p>
                <h1 style={{ float: "right" }}>{usersCount}</h1>
              </div>
            </div>
          </div>
          <div class=" col-sm-6 col-md-4 col-lg-3">
            <div
              className=" card text-white bg-success card-effect"
              style={{ height: "10rem" }}
            >
              <div className="card-body p-3">
                <h5 className="card-title">Issues Raised</h5>
                <p className="card-text">
                  <FaRegCircleQuestion size={40} />
                </p>
                <h1 style={{ float: "right" }}>5</h1>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div
              className=" card text-white bg-primary card-effect"
              style={{ height: "10rem" }}
            >
              <div className="card-body p-3">
                <h5 className="card-title">Total Packages</h5>
                <p className="card-text">
                  <AiOutlineFolderOpen size={40} />
                </p>
                <h1 style={{ float: "right" }}>{packageCount}</h1>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div
              className=" card text-white bg-danger card-effect"
              style={{ height: "10rem" }}
            >
              <div className="card-body p-3">
                <h5 className="card-title">Enquiries</h5>
                <p className="card-text">
                  <PiChatsCircle size={40} />
                </p>
                <h1 style={{ float: "right" }}>{enquiriesCount}</h1>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div
              className=" card text-white card-effect"
              style={{ height: "10rem", backgroundColor: "magenta" }}
            >
              <div className="card-body p-3">
                <h5 className="card-title">New Enquiries</h5>
                <p className="card-text">
                  <PiChatsCircle size={40} />
                </p>
                <h1 style={{ float: "right" }}>{newEnquiriesCount}</h1>
              </div>
            </div>
          </div>
          <div class=" col-sm-6 col-md-4 col-lg-3">
            <div
              className=" card text-white bg-info card-effect"
              style={{ height: "10rem" }}
            >
              <div className="card-body p-3">
                <h5 className="card-title">Read Enquiries</h5>
                <p className="card-text">
                  <PiChatsCircle size={40} />
                </p>
                <h1 style={{ float: "right" }}>{readEnquiriesCount}</h1>
              </div>
            </div>
          </div>
          <div class=" col-sm-6 col-md-4 col-lg-3">
            <div
              className=" card text-white bg-success card-effect"
              style={{ height: "10rem" }}
            >
              <div className="card-body p-3">
                <h5 className="card-title">Bookings</h5>
                <p className="card-text">
                  <FaTableCells size={40} />
                </p>
                <h1 style={{ float: "right" }}>{bookingsCount}</h1>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div
              className=" card text-white card-effect"
              style={{ height: "10rem", backgroundColor: "dodgerblue" }}
            >
              <div className="card-body p-3">
                <h5 className="card-title">New Bookings</h5>
                <p className="card-text">
                  <FaTableCells size={40} />
                </p>
                <h1 style={{ float: "right" }}>{newBookingsCount}</h1>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3 mb-0">
            <div
              className=" card text-white card-effect"
              style={{ height: "10rem", backgroundColor: "teal" }}
            >
              <div className="card-body p-3">
                <h5 className="card-title">Canc. Bookings</h5>
                <p className="card-text">
                  <FaTableCells size={40} />
                </p>
                <h1 style={{ float: "right" }}>{cancelledBookingsCount}</h1>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div
              className=" card text-white card-effect"
              style={{ height: "10rem", backgroundColor: "blueviolet" }}
            >
              <div className="card-body p-3">
                <h5 className="card-title">Conf. Bookings</h5>
                <p className="card-text">
                  <FaTableCells size={40} />
                </p>
                <h1 style={{ float: "right" }}>{confirmedBookingsCount}</h1>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div
              className=" card text-white card-effect"
              style={{ height: "10rem", backgroundColor: "lightcoral" }}
            >
              <div className="card-body p-3">
                <h5 className="card-title">Payment Done</h5>
                <p className="card-text">
                  <MdPayment size={40} />
                </p>
                <h1 style={{ float: "right" }}>{paymentsCount}</h1>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div
              className=" card text-white card-effect"
              style={{ height: "10rem", backgroundColor: "brown" }}
            >
              <div className="card-body p-3">
                <h5 className="card-title">Issues Solved</h5>
                <p className="card-text">
                  <BsCheckCircle size={40} />
                </p>
                <h1 style={{ float: "right" }}>6</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
