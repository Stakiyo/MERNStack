import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Header2 from "../../Components/UserComponents/Header2";
import HeaderContent from "../../Components/UserComponents/HeaderContent";
import AboutBanner from "../../Components/UserComponents/AboutBanner";
import Navbar from "../../Components/UserComponents/Navbar";
import Footer from "../../Components/UserComponents/Footer";
function PaymentHistory() {
  const host = "http://127.0.0.1:3000";
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    axios
      .get(`${host}/api/payment/paymentRead`)
      .then((response) => {
        console.log(response.data);
        setPayment(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Header2 />
      <HeaderContent />
      <Navbar />
      <AboutBanner />
      <h4 className="text-success mt-4 mb-1 ml-3">Payment History</h4>
      <table className=" mt-3 table table-borderless table-striped  text-center mb-2 text-center">
        <thead
          className="bg-primary text-white "
          style={{ whiteSpace: "nowrap" }}
        >
          <th>#</th>
          <th>Name</th>
          <th>Package</th>
          <th>Booked On</th>
          <th>Paid On</th>
          <th>Transaction Id</th>
          <th>Paid Amount</th>
          <th>Payment</th>
          <th>Action</th>
        </thead>
        <tbody>
          {payment.map((item, index) => (
            <>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.booking_id?.name}</td>
                <td>{item?.package_id?.pname}</td>
                <td>{item?.booking_id?.createdAt}</td>
                <td>{item?.createdAt}</td>
                <td>{item?.tId}</td>
                <td>&#8377;{item?.booking_id?.grandTotal}</td>
                <td>
                  <td className="p-0">
                    <center>
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
                    </center>
                  </td>
                </td>

                <td>
                  <center>
                    <button className="btn btn-sm btn-success">
                      Generate Bill
                    </button>
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

export default PaymentHistory;
