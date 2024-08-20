import React from "react";
import HeaderContent from "../../Components/UserComponents/HeaderContent";
import Navbar1 from "../../Components/UserComponents/Navbar";
import AboutBanner from "../../Components/UserComponents/AboutBanner";
import Header from "../../Components/UserComponents/Header";
import Footer from "../../Components/UserComponents/Footer";

const Privacy = () => {
  return (
    <div>
      <Header />
      <HeaderContent />
      <Navbar1 />
      <AboutBanner />
      <h4 className="text-success" style={{ margin: "30px 0px 10px 50px" }}>
        Privacy Policy
      </h4>
      <div className="card col-md-11 offset-md-12 ml-5 mr-auto border-dark">
        <p className="p-3" style={{ lineHeight: "2" }}>
          We at Wasai LLC respect the privacy of your personal information and,
          as such, make every effort to ensure your information is protected and
          remains private. As the owner and operator of loremipsum.io (the
          "Website") hereafter referred to in this Privacy Policy as "Lorem
          Ipsum", "us", "our" or "we", we have provided this Privacy Policy to
          explain how we collect, use, share and protect information about the
          users of our Website (hereafter referred to as “user”, “you” or
          "your"). For the purposes of this Agreement, any use of the terms
          "Lorem Ipsum", "us", "our" or "we" includes Wasai LLC, without
          limitation. We will not use or share your personal information with
          anyone except as described in this Privacy Policy. This Privacy Policy
          will inform you about the types of personal data we collect, the
          purposes for which we use the data, the ways in which the data is
          handled and your rights with regard to your personal data.
          Furthermore, this Privacy Policy is intended to satisfy the obligation
          of transparency under the EU General Data Protection Regulation
          2016/679 ("GDPR") and the laws implementing GDPR.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
