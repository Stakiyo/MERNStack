import React, { useEffect, useState } from "react";
import SideNav from "../../Components/AdminComponents/SideNav";
import Header from "../../Components/AdminComponents/Header";
import BreadCrumbNav from "../../Components/AdminComponents/BreadCrumbNav";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPackage() {
  const [packageInfo, setPackageInfo] = useState([]);
  const { id } = useParams();
  const host = "http://127.0.0.1:3000";
  const nav = useNavigate();
  let admin = null;
  const handleChange = (e) => {
    setPackageInfo({
      ...packageInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("admintoken") != null) {
      admin = JSON.parse(localStorage.getItem("admintoken"));
    } else {
      nav("/login");
    }

    axios
      .get(`${host}/api/package/viewPackage/${id}`)
      .then((response) => {
        console.log(response.data.packageInfo);
        setPackageInfo(response.data.packageInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .put(`${host}/api/package/updatePackage/${id}`, packageInfo)
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
    nav("/view-package");
  };
  return (
    <div>
      <Header />
      <SideNav />
      <BreadCrumbNav
        title={
          <>
            <i className="ml-1 mr-1 fa-solid fa-angle-right"></i>Edit Package
          </>
        }
      />
      <div className="container mtop-6 mleft-6 col-lg-9 mb-4">
        <div className="card bg-light ml-3 pl-4 border-dark">
          <div className="card-body"></div>
          <h4 className="text-primary  d-inline mb-4">Edit Package</h4>

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
                value={packageInfo?.pname}
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
                onChange={handleChange}
                value={packageInfo?.ptype}
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
                value={packageInfo?.location}
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
                value={packageInfo?.price}
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
                onChange={handleChange}
                value={packageInfo?.features}
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
                value={packageInfo?.details}
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
                value={packageInfo?.image}
                required
              />
            </div>

            <img
              src={packageInfo?.image}
              alt="Tourism Image"
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
              Save
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

export default EditPackage;
