const express = require("express");
const { dbConnection } = require("./db");
const app = express();
const cors = require("cors");
const PORT = 3000;

dbConnection();
app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/user_route"));
app.use("/api/package", require("./routes/package_route"));
app.use("/api/booking", require("./routes/booking_route"));
app.use("/api/enquiry", require("./routes/enquiry_route"));
app.use("/api/feedback", require("./routes/feedback_route"));
app.use("/api/admin", require("./routes/admin_route"));
app.use("/api/payment", require("./routes/payment_route"));
app.listen(PORT, () => {
  console.log(`Application is Running on Port ${PORT}`);
});
