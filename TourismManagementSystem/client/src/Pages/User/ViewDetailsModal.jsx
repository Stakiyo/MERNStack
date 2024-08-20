import axios from "axios";
import React, { useEffect, useState } from "react";
function ViewDetailsModal(props) {
  const [bookings, setBookings] = useState([]);

  const host = "http://127.0.0.1:3000";

  useEffect(() => {
    axios
      .get(`${host}/api/booking/singleViewBooking/${props.id}`)
      .then((response) => {
        setBookings(response.data.bookingInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div
        className="modal fade show"
        tabIndex={-1}
        role="dialog"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div
          className="modal-dialog"
          role="document"
          style={{ maxWidth: "40%" }}
        >
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className=" text-success mt-4 mb-0">Booking Details</h4>
              <button
                className="btn-close"
                type="button"
                aria-label="Close"
                onClick={props.closeDetailsModal}
              ></button>
            </div>
            <div className="modal-body text-left">
              <h5 className="card-title  text-success ml-5">
                Name:
                <span className="text-dark  ml-1">{bookings?.name}</span>
              </h5>
              <h5 className="card-title  text-success  ml-5">
                Email:<span className="text-dark  ml-1">{bookings?.email}</span>
              </h5>
              <h5 className="card-title  text-success  ml-5">
                Mobile:
                <span className="text-dark  ml-1">{bookings?.mobile}</span>
              </h5>
              <h5 className="card-title  text-success  ml-5">
                Booked on:
                <span className="text-dark  ml-1">{bookings?.createdAt}</span>
              </h5>
              <h5 className="card-title  text-success  ml-5">
                Package:
                <span className="text-dark  ml-1">
                  {bookings?.package_id?.pname}
                </span>
              </h5>
              <h5 className="card-title text-success  ml-5">
                Total persons:
                <span className="text-dark  ml-1">{bookings?.persons}</span>
              </h5>
              <h5 className="card-title text-success  ml-5">
                Total amount:
                <span className="text-dark  ml-1">
                  &#8377;{bookings?.grandTotal}
                </span>
              </h5>

              <button
                className="btn btn-sm btn-success col-md-12 mb-2 mt-2"
                onClick={props.open}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailsModal;
