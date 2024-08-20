import React from "react";
import Header from "../../Components/UserComponents/Header";
import HeaderContent from "../../Components/UserComponents/HeaderContent";
import Navbar from "../../Components/UserComponents/Navbar";
import AboutBanner from "../../Components/UserComponents/AboutBanner";
import Footer from "../../Components/UserComponents/Footer";
const About = () => {
  return (
    <div>
      <Header />
      <HeaderContent />
      <Navbar />
      <AboutBanner />
      <h4 className="text-success" style={{ margin: "30px 0px 10px 50px" }}>
        About Us
      </h4>
      <div className="card col-md-11 offset-md-12 ml-5 mr-auto border-dark">
        <p className="p-3" style={{ lineHeight: "2" }}>
          Since,then our courteous and committed team members have always
          ensured a pleasant and enjoyable tour for the clients. This arduous
          effort has enabled for <span>Tourism Management System</span> to be
          recognized as a dependable Travel Solutions Provider with three
          offices in Karnataka.We have got packages to suit the discerning
          traveler's budget and savor.Book your dream vacation online and
          supported quality and proposals of our travel consultants.We have a
          tendency to welcome you to decide on from holiday packages and
          customize them according to your plan.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
