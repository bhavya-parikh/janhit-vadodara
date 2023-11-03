import React from "react";
const Layout = () => {
  return (
    <div>
      <section id="body-part">
        {/* First Part */}
        <div className="first-p flex items-center justify-between shadow-lg">
          <div className="first-p-text ml-40">
            <h1 className="text-4xl">
              Empowering Vadodara for a Better Tomorrow
            </h1>
            <h2 className="text-2xl py-5">
              Help Us Make Vadodara a Civic-Friendly City
            </h2>
            <br />
            <p>
              This platform is dedicated to aiding you in raising awareness
              about civic issues and facilitating their swift resolution.
            </p>
            <button className="text-white font-semibold py-2 px-6 hover:border-transparent rounded-full">
              <a href="/request-certificate" className="hover:text-white">
                Track Complaint
              </a>
            </button>
            <button className="text-white font-semibold py-2 px-6 ml-6 mt-8 hover:border-transparent rounded-full">
              <a href="/complain-form" className="hover:text-white">
                Register Complaint
              </a>
            </button>
          </div>
          <div>
            <img src="/images/front.png" className="mr-40" alt="Front" />
          </div>
        </div>

        {/* Second Part */}
        <div
          className="flex items-center justify-between px-20 py-20 shadow-lg"
          id="second-p"
        >
          <div className="second-p-con pl-32">
            <div>
              <h1 className="text-5xl text-white font-bold inset-x-0">
                Complaint Registerd
              </h1>
            </div>
            <div className="px-6 py-6">
            </div>
          </div>
          <div className="second-p-con pr-32 w-200">
            <div className="second-p-con pr-32 w-200">
              <h1 className="text-5xl text-white font-bold w-max">
                Complaint Accomplished
              </h1>
            </div>

            <div className="px-6 py-6">
            </div>
          </div>
        </div>
        {/* Third Part */}
        <section id="third-part" className="px-6 py-30 shadow-lg pb-32">
          <div className="Carousel">
          </div>
        </section>

        <footer id="footer">
          <a
            className="btn btn-primary btn-lg btn-floating footer-link-1"
            style={{ backgroundColor: "#367E18" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            className="btn btn-primary btn-lg btn-floating footer-link-2"
            style={{ backgroundColor: "#367E18" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook"></i>
          </a>

          <a
            className="btn btn-primary btn-lg btn-floating footer-link-3"
            style={{ backgroundColor: "#367E18" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <p
            style={{ textAlign: "center", paddingTop: "50px", color: "white" }}
          >
            ©2023 Vadodara Municipal Corporation. All rights reserved.
          </p>
        </footer>
      </section>
    </div>
  );
};

export default Layout;
