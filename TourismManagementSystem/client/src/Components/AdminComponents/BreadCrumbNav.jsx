import React from "react";

function BreadCrumbNav({ title }) {
  return (
    <div>
      <div className="container">
        <nav aria-label="breadcrumb row ">
          <ol
            className="breadcrumb bg-info fixed-top "
            style={{ margin: "4rem 0.3rem 0 16rem" }}
          >
            <li
              className="breadcrumb-item active text-white font-weight-bold"
              aria-current="page"
            >
              Home<span>{title}</span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default BreadCrumbNav;
