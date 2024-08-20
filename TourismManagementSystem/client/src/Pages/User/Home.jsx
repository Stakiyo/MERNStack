import React, { useState, useEffect } from "react";
import Header from "../../Components/UserComponents/Header";
import HeaderContent from "../../Components/UserComponents/HeaderContent";
import Navbar from "../../Components/UserComponents/Navbar";
import Banner from "../../Components/UserComponents/Banner";
import Footer from "../../Components/UserComponents/Footer";
import CardInfo from "../../Components/UserComponents/CardInfo";
import Packages from "../../Pages/User/Packages";
import Feedback from "./Feedback";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);

  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("usertoken") != null) {
      setUser(JSON.parse(localStorage.getItem("usertoken")));
    } else {
      nav("/");
    }
  }, []);

  return (
    <div>
      
      <Header />
      <HeaderContent />
      <Navbar />
      <Banner />
      <Packages />
      <Feedback />
      <CardInfo />
      <Footer />
    </div>
  );
};

export default Home;
