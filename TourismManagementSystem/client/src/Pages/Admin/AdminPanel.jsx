import React, { useState, useEffect } from "react";
import Header from "../../Components/AdminComponents/Header";
import SideNav from "../../Components/AdminComponents/SideNav";
import BreadCrumbNav from "../../Components/AdminComponents/BreadCrumbNav";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  // const [sideNavOpen, setSideNavOpen] = useState(true);

  // const handleClick = () => {
  //   setSideNavOpen(!sideNavOpen);
  // };
  let admin = null;
  const nav = useNavigate();
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
      <BreadCrumbNav title="" />
    </div>
  );
};

export default AdminPanel;
