// AboutUsPage.jsx

import React from "react";
import "./AboutUs.css";

const AboutUsPage = () => {
  return (
    <div className="about-us-container">
      <h1 className="section-title">About Vadodara Municipal Corporation</h1>

      <div className="content-section">
        <p className="paragraph">
          Welcome to the Vadodara Municipal Corporation's online portal. We are
          dedicated to providing efficient services and addressing civic issues
          to enhance the quality of life for the residents of Vadodara.
        </p>
      </div>

      <div className="content-section">
        <h2 className="section-subtitle">Our Mission</h2>
        <p className="paragraph">
          At Vadodara Municipal Corporation, our mission is to create a cleaner,
          safer, and more sustainable city by addressing and resolving civic
          issues effectively. We aim to provide transparent, accountable, and
          citizen-centric services to meet the diverse needs of our community.
        </p>
      </div>

      <div className="content-section">
        <h2 className="section-subtitle">Services We Offer</h2>
        <ul className="service-list">
          <li>
            Register complaints related to electricity, waterlogging, and other
            civic problems.
          </li>
          <li>Track the status of your complaints in real-time.</li>
          <li>Access government services efficiently.</li>
          {/* Add more services as needed */}
        </ul>
      </div>

      <div className="content-section">
        <h2 className="section-subtitle">Contact Information</h2>
        <p className="paragraph">
          Address: [Add the address here]
          <br />
          Phone: [Add the contact number here]
          <br />
          Email: [Add the email address here]
        </p>
      </div>

      <div className="content-section">
        <p className="paragraph">
          Thank you for choosing Vadodara Municipal Corporation. We are
          committed to serving you and making Vadodara a better place for all.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
