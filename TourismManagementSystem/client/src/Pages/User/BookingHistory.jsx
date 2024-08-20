import React, { useEffect, useState } from "react";
import Header2 from "../../Components/UserComponents/Header2";
import HeaderContent from "../../Components/UserComponents/HeaderContent";
import Navbar from "../../Components/UserComponents/Navbar";
import AboutBanner from "../../Components/UserComponents/AboutBanner";
import Footer from "../../Components/UserComponents/Footer";
import axios from "axios";
import ViewDetailsModal from "./ViewDetailsModal";
import PaymentModal from "./PaymentModal";
import SuccessModal from "./SuccessModal";

function BookingHistory() {
  const host = "http://127.0.0.1:3000";
  const [booking, setBookings] = useState([]);
  const [openViewDetailsModal, setOpenViewDetailsModal] = useState(false);
  const [payment, setPayment] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [bookingId, setBookingId] = useState(null);
  const [packageId, setPackageId] = useState(null);
  const [successModal, setSuccessModal] = useState(false);

  // const handleShowClick = (bId, pId) => {
  //   setBookingId(bId);
  //   setPackageId(pId);
  //   setOpenViewDetailsModal(true);
  // };
  // const handleCloseClick = () => {
  //   setOpenViewDetailsModal(false);
  // };
  const handleHide = () => {
    setSuccessModal(false);
  };
  const handleShow = () => {
    setSuccessModal(true);
    setPayment(false);
  };

  const handlePaymentOpen = () => {
    setPayment(true);
    // setOpenViewDetailsModal(false);
  };
  const handlePaymentClose = () => {
    setPayment(false);
  };
  const getPaymentsStatus = (id) => {
    axios
      .post(`${host}/api/payment/singleBookingPayment`, { id })
      .then((res) => {
        console.log(res.data.paymentStatus);
        setPaymentStatus(res.data.paymentStatus);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("usertoken"));
    axios
      .get(`${host}/api/booking/readBookingUser`, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        response.data.map((items) => {
          getPaymentsStatus(items._id);
        });

        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePay = (bId, pId) => {
    setBookingId(bId);
    setPackageId(pId);
    handlePaymentOpen();
  };
  return (
    <div>
      <Header2 />
      <HeaderContent />
      <Navbar />
      <AboutBanner />
      <h4 className="text-success mt-4 mb-1 ml-3">Booking History</h4>
      <table className=" mt-3 table table-borderless table-striped  text-center mb-2 text-center">
        <thead
          className="bg-primary text-white "
          style={{ whiteSpace: "nowrap" }}
        >
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Package</th>
          <th>Booked On</th>
          <th>Total Amount</th>
          <th>Booking Status</th>
          <th>Payment</th>
          <th>Action</th>
        </thead>
        <tbody>
          {booking.map((item, index) => (
            <>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.package_id?.pname}</td>
                <td>{item?.createdAt}</td>

                <td>&#8377;{item?.grandTotal}</td>

                <td>
                  <td className="p-0">
                    <center>
                      <span
                        className={`badge ${
                          item?.booking_status === "Pending"
                            ? "badge-info"
                            : item?.booking_status === "Confirmed"
                            ? "badge-success"
                            : "badge-danger"
                        } rounded-pill`}
                      >
                        {item?.booking_status}
                      </span>
                    </center>
                  </td>
                </td>
                <td>
                  <center>
                    <span
                      className={`badge ${
                        paymentStatus[index]?.payment_status == "Verified"
                          ? "badge-success"
                          : paymentStatus[index]?.payment_status == "Denied"
                          ? "badge-danger"
                          : "badge-info"
                      } rounded-pill`}
                    >
                      {paymentStatus[index]?.payment_status
                        ? paymentStatus[index]?.payment_status
                        : "Pending"}
                    </span>
                  </center>
                </td>

                <td>
                  <center>
                    {paymentStatus[index]?.payment_status === "Pending" ? (
                      <button
                        className="btn btn-sm btn-success"
                        //  onClick={() =>
                        // handleShowClick(item?._id, item?.package_id)
                        onClick={() => handlePay(item?._id, item?.package_id)}
                      >
                        Pay
                      </button>
                    ) : (
                      <span className="badge badge-success rounded-pill">
                        Paid
                      </span>
                    )}

                    {/* {bookingId === item?._id && openViewDetailsModal && (
                      <ViewDetailsModal
                        id={item?._id}
                        closeDetailsModal={handleCloseClick}
                        open={handlePaymentOpen}
                      />
                    )} */}
                    {bookingId === item?._id &&
                      packageId === item?.package_id &&
                      payment && (
                        <PaymentModal
                          closeModal={handlePaymentClose}
                          b_id={item?._id}
                          p_id={item?.package_id}
                          open={handleShow}
                        />
                      )}
                    {successModal && <SuccessModal closeModal={handleHide} />}
                  </center>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

export default BookingHistory;
