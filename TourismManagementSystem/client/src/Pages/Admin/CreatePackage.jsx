import React, { useState, useEffect } from "react";
import SideNav from "../../Components/AdminComponents/SideNav";
import Header from "../../Components/AdminComponents/Header";
import "../../Pages/Admin/CreatePackage.css";
import BreadCrumbNav from "../../Components/AdminComponents/BreadCrumbNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePackage() {
  let nav = useNavigate();
  const host = "http://127.0.0.1:3000";
  const [packageInfo, setPackageInfo] = useState(null);
  let admin = null;
  useEffect(() => {
    if (localStorage.getItem("admintoken") != null) {
      admin = JSON.parse(localStorage.getItem("admintoken"));
    } else {
      nav("/login");
    }
  }, []);
  const handleChange = (e) => {
    setPackageInfo({
      ...packageInfo,
      [e.target.name]: e.target.value,
    });
    // console.log(packageInfo)
  };
  const handleSubmit = () => {
    axios
      .post(`${host}/api/package/createPackage`, packageInfo)
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        setTimeout(() => {
          nav("/view-package");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCancel = () => {
    nav("/dashboard");
  };
  return (
    <div>
      <Header />
      <SideNav />
      <BreadCrumbNav
        title={
          <>
            <i className="ml-1 mr-1 fa-solid fa-angle-right"></i>Create Package
          </>
        }
      />
      <div className="container mtop-6 mleft-6 col-lg-9 mb-4">
        <div className="card bg-light ml-3 pl-4 border-dark">
          <div className="card-body"></div>
          <h4 className="text-primary  d-inline mb-4">Create Package</h4>

          <div className="form-group row mr-2">
            <label
              htmlFor="package_name"
              className="control-label col-sm-2 col-form-label"
            >
              Package Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="package_name"
                name="pname"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group row mr-2">
            <label
              htmlFor="package_type"
              className="control-label col-sm-2 col-form-label"
            >
              Package Type
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="package_type"
                name="ptype"
                placeholder="e.g. Family Package/Couple Package"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group row mr-2">
            <label
              htmlFor="package_location"
              className="control-label col-sm-2 col-form-label"
            >
              Location
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="package_location"
                name="location"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group row mr-2">
            <label
              htmlFor="package_price"
              className="control-label col-sm-2 col-form-label"
            >
              Price
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="package_price"
                name="price"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group row mr-2">
            <label
              htmlFor="package_features"
              className="control-label col-sm-2 col-form-label"
            >
              Features
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="package_features"
                name="features"
                placeholder="e.g. Free Pickup/Drop facility,Accomodation"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group row mr-2">
            <label
              htmlFor="package_details"
              className="control-label col-sm-2 col-form-label"
            >
              Details
            </label>
            <div className="col-sm-10">
              <textarea
                type="text"
                className="form-control"
                id="package_details"
                name="details"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group row mr-2">
            <label
              htmlFor="package_image"
              className="control-label col-sm-2 col-form-label"
            >
              Image
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="package_image"
                name="image"
                onChange={handleChange}
                required
              />
            </div>
            <img
              src=""
              alt="Tourism Image"
              width={100}
              height={100}
              style={{
                marginLeft: "10rem",
                marginTop: "1rem",
                width: "200px",
                height: "100px",
              }}
            />
          </div>

          <div className=" form-group row">
            <button
              className="btn btn-sm btn-info btn-create-ml col-md-2"
              onClick={handleSubmit}
            >
              Create
            </button>

            <button
              className="btn btn-sm btn-danger  btn-cancel-ml col-md-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePackage;
