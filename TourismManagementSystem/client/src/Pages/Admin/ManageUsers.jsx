import React, { useState, useEffect } from "react";
import Header from "../../Components/AdminComponents/Header";
import SideNav from "../../Components/AdminComponents/SideNav";
import BreadCrumbNav from "../../Components/AdminComponents/BreadCrumbNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const host = "http://127.0.0.1:3000";
  let admin = null;
  const nav = useNavigate();
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredData = users.filter((row) => {
    return row.username.toLowerCase().includes(searchValue.toLowerCase());
  });
  useEffect(() => {
    if (localStorage.getItem("admintoken") != null) {
      admin = JSON.parse(localStorage.getItem("admintoken"));
    } else {
      nav("/login");
    }

    axios
      .get(`${host}/api/user/getUsers`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <SideNav />
      <BreadCrumbNav
        title={
          <>
            <i className="ml-1 mr-1 fa-solid fa-angle-right"></i>Manage Users
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
              Manage Users
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
                  id="users-search"
                  name="search_value"
                  placeholder="Search..."
                  onChange={handleSearch}
                  className="form-control float-right col-md-3 mb-2"
                />
              </div>
              <div className="table-responsive">
                <table
                  id="users-table"
                  className="table table-borderless table-striped  text-center"
                >
                  <thead className="bg-danger text-white mt-0 ">
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Email</th>
                    <th scope="col">Registered On</th>
                    <th scope="col">Updated On</th>
                    <th scope="col">Action</th>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index} style={{ whiteSpace: "nowrap" }}>
                        <th scope="row">{index + 1}</th>
                        <td>{item?.username}</td>
                        <td>{item?.phone}</td>
                        <td>{item?.email}</td>
                        <td>{item?.createdAt}</td>
                        <td>{item?.updatedAt}</td>
                        <td>
                          <center>
                            <button className="btn btn-sm btn-primary">
                              User Bookings
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

export default ManageUsers;
