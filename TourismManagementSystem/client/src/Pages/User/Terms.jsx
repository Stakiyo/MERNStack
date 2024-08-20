import React from "react";
import HeaderContent from "../../Components/UserComponents/HeaderContent";
import Navbar from "../../Components/UserComponents/Navbar";
import AboutBanner from "../../Components/UserComponents/AboutBanner";
import Header from "../../Components/UserComponents/Header";
import Footer from "../../Components/UserComponents/Footer";

const Terms = () => {
  return (
    <div>
      <Header />
      <HeaderContent />
      <Navbar />
      <AboutBanner />
      <h4 className="text-success" style={{ margin: "30px 0px 10px 50px" }}>
        (1)Terms of Acceptance
      </h4>
      <div className="card col-md-11 offset-md-12 ml-5 mr-auto border-dark">
        <p className="p-3" style={{ lineHeight: "2" }}>
          The Website may contain links to other Websites (“Linked Websites”).
          The Linked Websites are not under the control of the Company and the
          Company is not responsible for the contents of any Linked Website,
          including without limitation any link contained in a Linked Website,
          or any changes or updates to a Linked Website. The Company is
          providing these links to you only as a convenience, and the inclusion
          of any link does not imply endorsement by the Company of the Website
          or any association with its operators. Certain services made available
          via the Website are delivered by third-party Websites and
          organizations. By using any product, service, or functionality
          originating from the Website, you hereby acknowledge and consent that
          the Company may share such information and data with any third party
          with whom the Company has a contractual relationship to provide the
          requested product, service or functionality on behalf of the Website’s
          users and customers.
        </p>
      </div>
      <h4 className="text-success" style={{ margin: "30px 0px 10px 50px" }}>
        (2)Terms of Acceptance
      </h4>
      <div className="card col-md-11 offset-md-12 ml-5 mr-auto border-dark">
        <p className="p-3" style={{ lineHeight: "2" }}>
          The Company does not claim ownership of the materials you provide to
          the Website (including feedback and suggestions) or post, upload,
          input or submit to any Website or our associated services
          (collectively “Submissions”). However, by posting, uploading,
          inputting, providing, or submitting your Submission you are granting
          the Company, our affiliated companies, and necessary sub-licensees
          permission to use your Submission in connection with the operation of
          their Internet businesses including, without limitation, the rights
          to: copy, distribute, transmit, publicly display, publicly perform,
          reproduce, edit, translate, and reformat your Submission; and to
          publish your name in connection with your Submission. No compensation
          will be paid with respect to the use of your Submission, as provided
          herein. The Company is under no obligation to post or use any
          Submission you may provide and may remove any Submission at any time
          in the Company’s sole discretion.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
