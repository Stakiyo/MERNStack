import React, { useEffect, useState } from "react";
import Header from "../../Components/AdminComponents/Header";
import SideNav from "../../Components/AdminComponents/SideNav";
import BreadCrumbNav from "../../Components/AdminComponents/BreadCrumbNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ManageFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [state, setState] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const host = "http://127.0.0.1:3000";
  let admin = null;
  const nav = useNavigate();
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredData = feedback.filter((row) => {
    return row.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  useEffect(() => {
    if (localStorage.getItem("admintoken") != null) {
      admin = JSON.parse(localStorage.getItem("admintoken"));
    } else {
      nav("/login");
    }

    axios
      .get(`${host}/api/feedback/readFeedback`)
      .then((response) => {
        console.log(response.data);
        setFeedback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state]);
  const handleDelete = (id) => {
    const confirm = window.confirm("Delete feedback?");
    if (confirm) {
      axios
        .delete(`${host}/api/feedback/deleteFeedback/${id}`)
        .then((response) => {
          console.log(response.data);
          setState(!state);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    alert(response.data.message);
  };
  return (
    <div>
      <Header />
      <SideNav />
      <BreadCrumbNav
        title={
          <>
            <i className="ml-1 mr-1 fa-solid fa-angle-right"></i>Manage Feedback
          </>
        }
      />
      <div className="table-container mtop-6 mleft-6 col-lg-9">
        <div className="card bg-light p-0 border-dark mb-4">
          <div className="card-title">
            <h4
              className="text-primary mt-4 mb-1"
              style={{ marginLeft: "1.2rem" }}
            >
              Manage Feedback
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
                  id="feedback-search"
                  name="search_value"
                  placeholder="Search..."
                  onChange={handleSearch}
                  className="form-control float-right col-md-3 mb-2"
                />
              </div>
              <div className="table-responsive">
                <table
                  id="feedback-table"
                  className="table table-borderless table-striped  text-center w-100"
                >
                  <thead
                    className="bg-danger text-white "
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <th>#</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Suggestion</th>
                    <th>Posted On</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr style={{ whiteSpace: "nowrap" }} key={index}>
                        <th>{index + 1}</th>
                        <td>{item?.name}</td>
                        <td>{item?.phone}</td>
                        <td>{item?.email}</td>
                        <td>{item?.suggestion}</td>
                        <td> {item?.createdAt}</td>

                        <td className="links">
                          <center>
                            <button
                              className="btn btn-sm btn-danger ml-2"
                              onClick={() => handleDelete(item?._id)}
                            >
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

export default ManageFeedback;
