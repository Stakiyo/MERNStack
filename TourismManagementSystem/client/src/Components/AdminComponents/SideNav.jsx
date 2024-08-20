import React, { useState } from "react";
import "../AdminComponents/SideNav.css";
import { MdDashboard, MdKeyboardArrowRight, MdPayment } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineBars3 } from "react-icons/hi2";
import { BsFileEarmarkText } from "react-icons/bs";
import { PiFilesLight } from "react-icons/pi";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { LuPackagePlus } from "react-icons/lu";
import { MdFeedback } from "react-icons/md";

const SideNav = ({ open }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  return (
    <div>
      <div>
        <div className="box-container">
          <div className="side-nav-open">
            <ul className="nav-list side-nav-content">
              <li className="nav-list-item ">
                <i>
                  <MdDashboard />
                </i>
                <span>
                  <Link to="/dashboard">Dashboard</Link>
                </span>
              </li>
              <li className="nav-list-item tour-pack-link">
                <i>
                  <AiOutlineBars />
                </i>
                <span className="main-link">
                  <Link onClick={toggleDropDown}>Manage Package</Link>
                </span>
                <i className="arrow-icon">
                  {dropDownOpen ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowRight />
                  )}
                </i>
                {dropDownOpen && (
                  <ul className="dropdown">
                    <li className="dropdown-link">
                      <i>
                        <LuPackagePlus />
                      </i>
                      <span>
                        <Link
                          to="/create-package"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Create Package
                        </Link>
                      </span>
                    </li>

                    <li className="dropdown-link">
                      <i>
                        <BsFillEyeFill style={{ marginRight: "2px" }} />
                      </i>
                      <span>
                        <Link
                          to="/view-package"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Package
                        </Link>
                      </span>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-list-item">
                <i>
                  <FaUsers size={22} />
                </i>
                <span>
                  <Link to="/manage-users">Manage Users</Link>
                </span>
              </li>
              <li className="nav-list-item">
                <i>
                  <HiOutlineBars3 />
                </i>
                <span>
                  <Link to="/manage-bookings">Manage Bookings</Link>
                </span>
              </li>
              <li className="nav-list-item">
                <i>
                  <MdPayment />
                </i>
                <span>
                  <Link to="/manage-payment">Manage Payment</Link>
                </span>
              </li>
              <li className="nav-list-item">
                <i>
                  <BsLayoutTextSidebarReverse />
                </i>
                <span>
                  <Link to="/manage-issues">Manage Issues</Link>
                </span>
              </li>
              <li className="nav-list-item">
                <i>
                  <BsFileEarmarkText />
                </i>
                <span>
                  <Link to="/manage-enquiries">Manage Enquiries</Link>
                </span>
              </li>
              <li className="nav-list-item">
                <i>
                  <MdFeedback />
                </i>
                <span>
                  <Link to="/manage-feedback">Manage Feedback</Link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
