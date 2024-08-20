import React from "react";
import LoginModal from "../Admin/LoginModal";
import Img from "../../images/MountainSunset.jpg";
import { useState } from "react";
import "../../Pages/Admin/Login.css";

function Login() {
  const [openLoginModal, setOpenLoginModal] = useState(true);

  return (
    <div>
      {openLoginModal && <LoginModal />}
      <div className="bg-img">
        <img src={Img} alt="Admin Image" className="img-responsive" />
      </div>
    </div>
  );
}

export default Login;
