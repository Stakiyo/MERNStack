import React from "react";
import Header from "../../Components/AdminComponents/Header";
import SideNav from "../../Components/AdminComponents/SideNav";
import BreadCrumbNav from "../../Components/AdminComponents/BreadCrumbNav";
import { BsEyeFill } from "react-icons/bs";
import { BiSolidTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// const [searchValue, setSearchValue] = useState("");
function ManageIssues() {
  let admin = null;
  const nav = useNavigate();
  // const handleSearch = (e) => {
  //   setSearchValue(e.target.value);
  // };

  // const filteredData = feedback.filter((row) => {
  //   return row.name.toLowerCase().includes(searchValue.toLowerCase());
  // });

  useEffect(() => {
    if (localStorage.getItem("admintoken") != null) {
      admin = JSON.parse(localStorage.getItem("admintoken"));
    } else {
      nav("/login");
    }
  }, []);
  return (
    <div>
      <Header />
      <SideNav />
      <BreadCrumbNav
        title={
          <>
            <i className="ml-1 mr-1 fa-solid fa-angle-right"></i>Manage Issues
          </>
        }
      />
      <div className="table-container mtop-6 mleft-6 col-lg-9 w-100">
        <div className="card bg-light p-0 border-dark mb-4">
          <div className="card-title">
            <h4
              className="text-primary  mt-4 mb-1"
              style={{ marginLeft: "1.2rem" }}
            >
              Manage Issues
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
                  id="issues-search"
                  name="search_value"
                  placeholder="Search..."
                  // onChange={handleSearch}
                  className="form-control float-right col-md-3 mb-2"
                />
              </div>
              <div className="table-responsive">
                <table
                  id="issues-table"
                  className="table table-borderless table-striped  text-center"
                >
                  <thead className="bg-danger text-white mt-0 ">
                    <th>#</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Issue</th>
                    <th>Description</th>
                    <th>Posted On</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    <tr style={{ whiteSpace: "nowrap" }}>
                      <th>1</th>
                      <td>sjfaskfaksj</td>
                      <td>scnaslncklas</td>
                      <td>savnnlkadsmvklsd</td>
                      <td>,svlksdmvl</td>
                      <td>sm vlkdsv</td>
                      <td> ldnv lkdnm</td>
                      <td>
                        <center>
                          <button className="btn btn-sm  btn-info">
                            <i>
                              <BsEyeFill />
                            </i>
                          </button>
                          <button className="btn btn-sm btn-danger ml-1">
                            <i>
                              <BiSolidTrashAlt style={{ color: "white" }} />
                            </i>
                          </button>
                        </center>
                      </td>
                    </tr>
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

export default ManageIssues;
