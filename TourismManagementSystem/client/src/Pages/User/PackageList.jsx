import React from "react";
import DubaiImage from "../../images/DubaiImage.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const PackageList = () => {
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
      <div>
        <h4
          style={{
            paddingLeft: "70px",
            paddingBottom: "0px",
            paddingTop: "60px",
          }}
          className="text-success"
        >
          Package List
        </h4>
      </div>
      <div
        className="card border-dark"
        style={{
          width: "90%",
          marginLeft: "70px",
          marginTop: "20px",
          objectFit: "cover",
        }}
      >
        <div className="row no-gutters">
          <div className="col-auto">
            <img
              src={DubaiImage}
              alt="Tourism Image"
              width={400}
              height={200}
              style={{
                padding: "10px 10px 10px 10px",
              }}
            />
          </div>
          <div className="col col-md-6 ">
            <div className="card-body p-0 "></div>
            <h5 className="card-title pt-3 pl-3 text-success">
              Package Name:<span> Short Trip to Dubai</span>
            </h5>
            <p className="card-text text-dark font-weight-bold  pt-1 pl-3">
              Package Type:<span> Family Package</span>
            </p>
            <p className="card-text text-secondary   pl-3">
              <span className=" font-weight-bold">Package Location:</span>
              <span> Guwahati(Sikkim)</span>
            </p>
            <p className="card-text text-secondary  m-0 pl-3">
              <span className="font-weight-bold ">Features</span>
              :&nbsp;
              <span>
                BreakFast,Accomodation &gt;&gt; Pickup &gt;&gt; Drop &gt;&gt;
                SightSeeing
              </span>
            </p>
          </div>
          <div className="col">
            <h5
              className="text-dark font-weigth-bold"
              style={{ margin: "4rem 0rem 0rem 5rem" }}
            >
              USD 4000
            </h5>
            <Link to="/package-details">
              <button
                className="btn btn-success btn-sm"
                style={{ margin: "0.5rem 0rem 0rem 6rem" }}
              >
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
      <button
        className="btn btn-success btn-sm"
        style={{ margin: "20px 0px 0px 70px" }}
      >
        View More Packages
      </button>
    </div>
  );
};

export default PackageList;
