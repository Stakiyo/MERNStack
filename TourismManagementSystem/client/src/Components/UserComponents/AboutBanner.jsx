import React from "react";
import img from "../../images/travel-img.jpg";
import "../UserComponents/AboutBanner.css";
const AboutBanner = () => {
  return (
    <div>
      <div>
        <img className="banner-img" src={img} alt="About Banner" />
      </div>
    </div>
  );
};

export default AboutBanner;
