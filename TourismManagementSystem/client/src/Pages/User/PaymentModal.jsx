import React, { useState, useEffect } from "react";
import PaymentQRCode from "../../Components/UserComponents/PaymentQRCode";
import axios from "axios";

function PaymentModal(props) {
  const host = "http://127.0.0.1:3000";
  const [transactionId, setTransactionId] = useState();

  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState([]);
  const [payCheck, setPayCheck] = useState(false);

  const handleChange = (e) => {
    setTransactionId(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("usertoken") != null) {
      let userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    } else {
      nav("/");
    }
  }, []);

  const checkTransactionId = () => {
    if (transactionId.length !== 12) {
      setFlag(true);
      setMessage("Invalid Transaction Id");
    } else {
      setFlag(false);
      setMessage("");
    }
  };

  const handleSubmit = async (bid) => {
    props.open();
    setPayCheck(true);

    const paymentInfo = {
      tId: transactionId,
      booking_id: bid,
      customer_id: user?._id,
      package_id: props.p_id,
      payCheck,
    };

    if (!flag) {
      const payment_status = "Payment Initiated";
      await axios
        .patch(`${host}/api/payment/updatePayment/${bid}`, { payment_status })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post(`${host}/api/payment/paymentCreate`, paymentInfo)
        .then((response) => {
          console.log(response.data.payment);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div
        className="modal fade show"
        tabIndex={-1}
        role="dialog"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div
          className="modal-dialog mt-5"
          role="document"
          style={{ maxWidth: "40%" }}
        >
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="text-success mt-4 mb-0">Payment</h4>
              <button
                className="btn-close"
                type="button"
                aria-label="Close"
                onClick={props.closeModal}
              ></button>
            </div>
            <div className="modal-body pt-0 text-center">
              <PaymentQRCode url="https://example.com" />
              <div className="form-group mt-4">
                <input
                  type="text"
                  name="tId"
                  className="form-control"
                  placeholder="Transcation Id"
                  onChange={handleChange}
                  onBlur={checkTransactionId}
                  required
                />
              </div>
              <p className="text-danger">{message}</p>
              <button
                className="btn btn-sm btn-primary col-md-12 mb-2 mt-1"
                onClick={() => handleSubmit(props.b_id)}
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

export default PaymentModal;
