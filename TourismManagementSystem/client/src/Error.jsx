import React from "react";
import { BiSolidError } from "react-icons/bi";
const Error = () => {
  return (
    <div className="main-content" style={{ marginTop: "10rem" }}>
      <section>
        <div className="container mx-auto p-4 mt-4">
          <div className="text-center text-3xl mb-4  border border-dark p-3">
            <h1>
              <BiSolidError />
            </h1>
            <h4 style={{ textAlign: "center", paddingTop: "10px" }}>
              404 Error
            </h4>
          </div>
          <h4 className="text-center text-2xl mb-4">Page not found!</h4>
        </div>
      </section>
    </div>
  );
};

export default Error;
