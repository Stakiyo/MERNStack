import React, { useEffect, useState } from "react";
import HeaderContent from "../../Components/UserComponents/HeaderContent";
import Navbar from "../../Components/UserComponents/Navbar";
import AboutBanner from "../../Components/UserComponents/AboutBanner";
import Footer from "../../Components/UserComponents/Footer";
import { Link, useParams } from "react-router-dom";
import BookPackageModal from "./BookPackageModal";
import SignInModal from "./SignInModal";
import axios from "axios";
import Header from "../../Components/UserComponents/Header";
function PackageDetails() {
  const host = "http://127.0.0.1:3000";
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBookPackageModal, setShowBookPackageModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [packages, setPackage] = useState([]);
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const handleClick = () => {
    setShowDetails(!showDetails);
  };
  const handleShowLoginModal = () => {
    setShowLoginModal(true);
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
      .get(`${host}/api/package/viewPackage/${id}`)
      .then((response) => {
        console.log("single package", response.data.packageInfo);

        setPackage(response.data.packageInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  console.log("Packages", packages);

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
          Package Details
        </h4>
      </div>

      <div
        className="card border-dark pb-3"
        style={{
          width: "90%",
          marginLeft: "80px",
          marginTop: "20px",
          objectFit: "cover",
        }}
      >
        <div className="row no-gutters">
          <div className="col-auto">
            <img
              src={packages?.image}
              alt="Tourism Image"
              width={400}
              height={200}
              style={{ padding: "10px 10px 10px 10px" }}
            />
          </div>
          <div className="col">
            <div className="card-body p-0"></div>
            <h5 className="card-title pt-3 pl-3  text-success">
              Package Name:<span>{packages?.pname}</span>
            </h5>

            <p className="card-text text-dark font-weight-bold  pl-3">
              Package Type:<span>{packages?.ptype}</span>
            </p>

            <p className="card-text text-secondary   pl-3">
              <span className=" font-weight-bold">Package Location:</span>
              <span>{packages?.location}</span>
            </p>

            <p className="card-text text-secondary  m-0 pl-3">
              <span className="font-weight-bold">Features</span>:&nbsp;
              <span style={{ whiteSpace: "nowrap" }}>{packages?.features}</span>
            </p>

            <h6 style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
              One per Package Amount :
              <span className="text-success" style={{ fontSize: "1.5rem" }}>
                &nbsp;&#8377;{packages?.price}
              </span>
            </h6>
          </div>

          <div className="ml-1 mt-4">
            <h5 className="text-secondary">Package Details</h5>
            <p style={{ textAlign: "initial" }}>{packages?.details}</p>

            {!user ? (
              <button
                className="btn btn-sm btn-info mt-1"
                onClick={handleShowLoginModal}
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
              <SignInModal closeSignInModal={handleCloseSignInModal} />
            )}
            {showBookPackageModal && (
              <BookPackageModal
                p_id={id}
                price={packages?.price}
                closeModal={handleCloseBookPackageModal}
              />
            )}
          </div>
        </div>
      </div>
      <Link to="/tour-packages">
        <button
          className="btn btn-sm btn-primary mt-3 "
          style={{ marginLeft: "5rem" }}
        >
          Back
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default PackageDetails;
