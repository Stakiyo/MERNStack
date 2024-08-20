import React, { useEffect, useState } from "react";
import CircleCheck from "../../Components/UserComponents/CircleCheck";
import axios from "axios";
import PaymentHistoryModal from "./PaymentHistory";
import { Link } from "react-router-dom";
function SuccessModal(props) {
  const host = "http://127.0.0.1:3000";
  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    axios
      .get(`${host}/api/payment/paymentRead`)
      .then((response) => {
        console.log(response.data);
        setPaymentId(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("paymentId", paymentId);

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
          style={{ maxWidth: "40%", marginTop: "7rem" }}
        >
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                className="btn-close"
                type="button"
                aria-label="Close"
                onClick={props.closeModal}
              ></button>
            </div>
            <div className="modal-body pt-0 text-center">
              <CircleCheck size={20} />
              <h2 className="text-success">Payment Successfull</h2>
              <Link to="/payment-history">
                <button className="btn btn-sm btn-primary col-md-12 mt-4 mb-3">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
