import React from "react";
import Tourism from "../../images/Tourism.jpg";
import "../UserComponents/Banner.css";
const Banner = () => {
  return (
    <div>
      <div className="container-box">
        <img className="image" src={Tourism} alt="Tourism Image" />
      </div>
    </div>
  );
};

export default Banner;
