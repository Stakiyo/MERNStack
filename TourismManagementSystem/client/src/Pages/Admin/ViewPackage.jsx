import React from "react";
import SideNav from "../../Components/AdminComponents/SideNav";
import BreadCrumbNav from "../../Components/AdminComponents/BreadCrumbNav";
import Header from "../../Components/AdminComponents/Header";
import "../Admin/ViewPackage.css";
import { FiEdit } from "react-icons/fi";
import { BiSolidTrashAlt } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ViewPackage() {
  const host = "http://127.0.0.1:3000";
  const [packages, setPackages] = useState([]);
  const [state, setState] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  let admin = null;
  const nav = useNavigate();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredData = packages.filter((row) => {
    return row.pname.toLowerCase().includes(searchValue.toLowerCase());
  });
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Delete Package?");
    if (isConfirmed) {
      axios
        .delete(`${host}/api/package/deletePackage/${id}`)
        .then((response) => {
          console.log(response.data);
          setState(!state);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("admintoken") != null) {
      admin = JSON.parse(localStorage.getItem("admintoken"));
    } else {
      nav("/login");
    }
    axios
      .get(`${host}/api/package/readPackage`)
      .then((response) => {
        setPackages(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state]);

  return (
    <div>
      <Header />
      <SideNav />
      <BreadCrumbNav
        title={
          <>
            <i className="ml-1 mr-1 fa-solid fa-angle-right"></i>View Package
          </>
        }
      />
      <div className="table-container mtop-6 mleft-6 col-lg-9 w-100">
        <div className="card bg-light p-0 border-dark mb-4">
          <div className="card-title">
            <h4
              className="text-primary mt-4 mb-1"
              style={{ marginLeft: "1.2rem" }}
            >
              View Package
            </h4>
            <div className="card-body py-2">
              <div className="col-12 p-0 mb-0">
                Showing&nbsp;
                <select id="record-select">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
                &nbsp;of <span id="allRecords"></span> Records
                <input
                  type="text"
                  id="package-search"
                  name="search_value"
                  placeholder="Search..."
                  onChange={handleSearch}
                  className="form-control float-right col-md-3 mb-2"
                />
              </div>
              <div className="table-responsive">
                <table
                  id="package-table"
                  className="table table-borderless table-striped  text-center"
                >
                  <thead
                    className="bg-danger text-white mt-0 "
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <th scope="col">#</th>
                    <th scope="col">Package Name</th>
                    <th scope="col">Package Type</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price per Person</th>
                    <th scope="col">Action</th>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index} style={{ whiteSpace: "nowrap" }}>
                        <th scope="row">{index + 1}</th>
                        <td>{item?.pname}</td>
                        <td>{item?.ptype}</td>
                        <td>{item?.location}</td>
                        <td>&#8377;{item?.price}</td>
                        <td>
                          <center>
                            <Link to={`/edit-package/${item?._id}`}>
                              <button className="btn btn-sm btn-primary">
                                <i>
                                  <FiEdit />
                                </i>
                                Edit
                              </button>
                            </Link>

                            <button
                              className="btn btn-sm btn-danger ml-2"
                              onClick={() => handleDelete(item?._id)}
                            >
                              <i>
                                <BiSolidTrashAlt />
                              </i>
                              Delete
                            </button>
                          </center>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPackage;
