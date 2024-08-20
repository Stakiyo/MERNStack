import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/User/Home";
import About from "./Pages/User/About";
import Privacy from "./Pages/User/Privacy";
import Enquiry from "./Pages/User/Enquiry";
import Terms from "./Pages/User/Terms";
import ForgotPassword from "./Pages/User/ForgotPassword";
import Error from "./Error";
import TourPackages from "./Pages/User/TourPackages";
import SignInModal from "./Pages/User/SignInModal";
import SignUpModal from "./Pages/User/SignUpModal";
import Login from "./Pages/Admin/Login";
import AdminPanel from "./Pages/Admin/AdminPanel";
import DashBoard from "./Pages/Admin/Dashboard";
import ManageBookings from "./Pages/Admin/ManageBookings";
import CreatePackage from "./Pages/Admin/CreatePackage";
import ViewPackage from "./Pages/Admin/ViewPackage";
import EditPackage from "./Pages/Admin/EditPackage";
import ManageUsers from "./Pages/Admin/ManageUsers";
import ManageIssues from "./Pages/Admin/ManageIssues";
import ManageEnquiries from "./Pages/Admin/ManageEnquiries";
import Profile from "./Pages/User/Profile";
import ManageFeedback from "./Pages/Admin/ManageFeedback";
import AdminProfile from "./Pages/Admin/AdminProfile";
import PackageDetails from "./Pages/User/PackageDetails";
import BookingHistory from "./Pages/User/BookingHistory";
import ManagePayment from "./Pages/Admin/ManagePayment";
import PaymentHistory from "./Pages/User/PaymentHistory";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/signin" element={<SignInModal />} />
          <Route path="/signup" element={<SignUpModal />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/tour-packages" element={<TourPackages />} />
          <Route path="/package-details/:id" element={<PackageDetails />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/create-package" element={<CreatePackage />} />
          <Route path="/edit-package/:id" element={<EditPackage />} />
          <Route path="/manage-bookings" element={<ManageBookings />} />
          <Route path="/manage-payment" element={<ManagePayment />} />
          <Route path="/view-package" element={<ViewPackage />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-issues" element={<ManageIssues />} />
          <Route path="/manage-enquiries" element={<ManageEnquiries />} />
          <Route path="/manage-feedback" element={<ManageFeedback />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
