import React from "react";
import QRCode from "react-qr-code";

function PaymentQRCode({ url }) {
  return (
    <div>
      <QRCode value={url} size={140} />
    </div>
  );
}

export default PaymentQRCode;
