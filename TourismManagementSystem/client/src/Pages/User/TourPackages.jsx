import React from "react";
import Header from "../../Components/UserComponents/Header";
import HeaderContent from "../../Components/UserComponents/HeaderContent";
import Navbar from "../../Components/UserComponents/Navbar";
import AboutBanner from "../../Components/UserComponents/AboutBanner";
import Footer from "../../Components/UserComponents/Footer";
import SignInModal from "./SignInModal";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BookPackageModal from "./BookPackageModal";
const TourPackages = () => {
  const host = "http://127.0.0.1:3000";

  const nav = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBookPackageModal, setShowBookPackageModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loginUsingBook, setLoginUsingBook] = useState(false);
  const [user, setUser] = useState(null);
  const handleClick = () => {
    setShowDetails(!showDetails);
  };
  const handleShowLoginModal = (value) => {
    setShowLoginModal(true);
    setLoginUsingBook(value);
  };

  const handleShowBookModal = () => {
    setShowBookPackageModal(true);
  };
  const handleCloseBookPackageModal = () => {
    setShowBookPackageModal(false);
  };

  useEffect(() => {
    if (localStorage.getItem("usertoken") != null) {
      setUser(JSON.parse(localStorage.getItem("usertoken")));
    } else {
      nav("/");
    }
    axios
      .get(`${host}/api/package/readPackage`)
      .then((response) => {
        console.log(response.data);
        setPackages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Header />
      <HeaderContent />
      <Navbar />
      <AboutBanner />
      <div>
        <h4
          style={{
            paddingLeft: "80px",
            paddingBottom: "0px",
            paddingTop: "30px",
          }}
          className="text-success"
        >
          Tour Packages
        </h4>
      </div>
      {packages.map((item, index) => (
        <div
          className={`card border-dark ${showDetails ? "pb-3" : ""}`}
          style={{
            width: "90%",
            marginLeft: "80px",
            marginTop: "20px",
            objectFit: "cover",
          }}
        >
          <div className="row no-gutters" key={index}>
            <div className="col-auto">
              <img
                src={item?.image}
                alt="Tourism Image"
                width={400}
                height={200}
                style={{ padding: "10px 10px 10px 10px" }}
              />
            </div>
            <div className="col">
              <div className="card-body p-0"></div>
              <h5 className="card-title pt-3 pl-3  text-success">
                Package Name:<span>{item?.pname}</span>
              </h5>

              <p className="card-text text-dark font-weight-bold  pl-3">
                Package Type:<span>{item?.ptype}</span>
              </p>
              <div className="col">
                <Link to={`/package-details/${item?._id}`}>
                  <button
                    className={`mb-5 ml-0${
                      showDetails
                        ? "btn btn-danger btn-sm float-right"
                        : "btn btn-success btn-sm float-right"
                    }`}
                    style={{ marginRight: "2rem" }}
                    onClick={handleClick}
                  >
                    {showDetails ? "Hide Details" : "Show Details"}
                  </button>
                </Link>
              </div>
              <p className="card-text text-secondary   pl-3">
                <span className=" font-weight-bold">Package Location:</span>
                <span>{item?.location}</span>
              </p>

              <p className="card-text text-secondary  m-0 pl-3">
                <span className="font-weight-bold">Features</span>:&nbsp;
                <span style={{ whiteSpace: "nowrap" }}>{item?.features}</span>
              </p>

              <h6 style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                One per Package Amount :
                <span className="text-success" style={{ fontSize: "1.5rem" }}>
                  &nbsp;&#8377;{item?.price}
                </span>
              </h6>
            </div>
            {showDetails && (
              <div className="ml-1 mt-4">
                <h5 className="text-secondary">Package Details</h5>
                <p style={{ textAlign: "initial" }}>{item?.details}</p>

                {!user ? (
                  <button
                    className="btn btn-sm btn-info mt-1"
                    onClick={() => handleShowLoginModal("BookButton")}
                  >
                    Book Package
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-info mt-1"
                    onClick={handleShowBookModal}
                  >
                    Book Package
                  </button>
                )}
                {showLoginModal && (
                  <SignInModal
                    setShowBookPackageModal={setShowBookPackageModal}
                  />
                )}
                {showBookPackageModal && (
                  <BookPackageModal closeModal={handleCloseBookPackageModal} />
                )}
              </div>
            )}
          </div>
        </div>
      ))}
      <button
        className="btn btn-sm btn-primary mt-3 "
        style={{ marginLeft: "5rem" }}
      >
        Show More
      </button>
      <Footer />
    </div>
  );
};

export default TourPackages;
