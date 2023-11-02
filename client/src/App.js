import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
const App = () => {
  return (
    <div>
      <Navbar />
      <section id="body-part">
        {/* First Part */}
        <div className="first-p flex items-center justify-between shadow-lg">
          <div className="first-p-text ml-40">
            <h1 className="text-4xl">NO MORE PLASTIC</h1>
            <h2 className="text-2xl">
              Help Us To Make Vadodara A Plastic Free City
            </h2>
            <br />
            <p>
              This Portal Is To Help You To Request For Plastic Free Certificate
              And To Complain Illegal Plastic Consumption Anonymously. Lorem
              ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
              ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et
              magnis dis parturient montes, nascetur ridiculus mus.
            </p>
            <button className="text-white font-semibold py-2 px-6 hover:border-transparent rounded-full">
              <a href="/request-certificate" className="hover:text-white">
                Certificate
              </a>
            </button>
            <button className="text-white font-semibold py-2 px-6 ml-6 mt-8 hover:border-transparent rounded-full">
              <a href="/complain-form" className="hover:text-white">
                Complain
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
              <img src="#" className="second-p-img mx-auto" alt="Register" />
            </div>
            <div className="px-6 py-6">
              <h1 className="text-2xl font-bold">Extra collection request</h1>
              <button className="text-white font-bold py-2 px-4 rounded-full my-8">
                Click Here
              </button>
            </div>
          </div>
          <div className="second-p-con pr-32">
            <div>
              <img
                src="/images/trusted-seller.png"
                className="second-p-img mx-auto"
                alt="Trusted Seller"
              />
            </div>
            <div className="px-6 py-6">
              <h1 className="text-2xl font-bold">Seller info</h1>
              <button className="text-white font-bold py-2 px-4 rounded-full my-8">
                <a href="/seller-details" className="hover:text-white">
                  Click Here
                </a>
              </button>
            </div>
          </div>
        </div>

        {/* Third Part */}
        <section id="third-part" className="px-6 py-30 shadow-lg pb-32">
          <div className="third-p-heading">
            <h1 className="text-6xl">--- Articles ---</h1>
          </div>
          <div
            id="testimonial-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            {/* Carousel Items Go Here */}
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
            ©2022 Surat Municipal Corporation. All rights reserved.
          </p>
        </footer>
      </section>
    </div>
  );
};

export default App;
