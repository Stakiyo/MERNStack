import React, { useEffect, useState } from "react";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { RiBarChart2Fill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import axios from "axios";
const CardInfo = () => {
  const [usersCount, setUsersCount] = useState(null);
  const [enquiriesCount, setEnquiriesCount] = useState(null);
  const [bookingsCount, setBookingsCount] = useState(null);
  const host = "http://127.0.0.1:3000";
  useEffect(() => {
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
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "140px",
          marginTop: "40px",
        }}
      >
        <div
          className=" main-content  text-white bg-white mb-3 row col-sm-4"
          style={{ maxWidth: "15rem", maxHeight: "8rem" }}
        >
          <div className="card-body">
            <h5 className="card-title text-success">Enquiries</h5>
            <p className="card-text ">
              <FaPersonCircleQuestion size={40} color="black" />
              <span>
                <h2 className="text-primary" style={{ float: "right" }}>
                  {enquiriesCount}
                </h2>
              </span>
            </p>
          </div>
        </div>
        <div
          className=" main-content  text-white bg-white mb-3 row col-sm-4"
          style={{ maxWidth: "15rem", maxHeight: "8rem" }}
        >
          <div className="card-body">
            <h5 className="card-title text-success">Users</h5>

            <p className="card-text ">
              <FaUsers size={40} color="black" />
              <span>
                <h2 className="text-primary" style={{ float: "right" }}>
                  {usersCount}
                </h2>
              </span>
            </p>
          </div>
        </div>
        <div
          className=" main-content  text-white bg-white mb-3 row col-sm-4"
          style={{ maxWidth: "15rem", maxHeight: "8rem" }}
        >
          <div className="card-body">
            <h5 className="card-title text-success">Bookings</h5>

            <p className="card-text ">
              <RiBarChart2Fill size={40} color="black" />
              <span>
                <h2 className="text-primary" style={{ float: "right" }}>
                  {bookingsCount}
                </h2>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
