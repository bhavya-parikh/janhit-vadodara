import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";

import { Link } from "react-router-dom";
import "./Layout.css";
import { useCookies } from "react-cookie";
import ComplaintCounters from "../NumberAnimation/Number";
import Testimonial from "../Testimonials/Testimonial";
import home_image from "../Assets/home_image.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../AuthProvider";
const Layout = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const { setAuth } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuth(true);
  });
  return (
    <div>
      <ToastContainer />
      <section id="body-part" className="sm:mt-0 h-fit">
        {/* First Part */}
        <div className=" first-p flex pl-10 items-center justify-between shadow-lg p-0">
          <div className="first-p-text">
            <div className="text-center md:text-left">
              <h1 className="text-2xl  md:text-3xl lg:text-4xl">
                Empowering Vadodara for a Better Tomorrow
              </h1>
              <h2 className="text-xl mr-0 md:text-2xl lg:text-3xl py-5">
                Help Us Make Vadodara a Civic-Friendly City
              </h2>
              <p className="text-sm mr-0 md:text-base lg:text-lg">
                This platform is dedicated to aiding you in raising awareness
                about civic issues and facilitating their swift resolution.
              </p>
            </div>

            <button className="text-white font-semibold py-2 px-6 ml-4 hover:border-transparent rounded-full">
              <a href="/complaintTracking" className="hover:text-white">
                Track Complaint
              </a>
            </button>
            <button className="text-white font-semibold py-2 px-6 ml-4 mt-8 hover:border-transparent rounded-full">
              <a href="/Complaint" className="hover:text-white">
                Register Complaint
              </a>
            </button>
          </div>
          <div className="right-image-container hidden md:block lg:block">
            <img className="right-img" src={home_image} alt="" />
          </div>
        </div>

        {/* Second Part */}
        <div
          className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-8 md:py-20 shadow-lg"
          id="second-p"
        >
          <div className="md:w-1/2 pl-0 md:pl-32">
            <div>
              <h1 className="text-2xl md:text-4xl md:pl-3 lg:text-4xl lg:ml-14 text-white font-bold">
                Complaint Registered
              </h1>
            </div>
            <div className="flex items-center justify-center md:justify-start px-4 py-3 md:px-2 py-4 md:py-6">
              <ComplaintCounters type="registered" />
            </div>
          </div>
          <div className="md:w-1/2 pl-0 md:pr-32">
            <div className="w-max md:w-full">
              <h1 className="text-2xl md:text-4xl md:pl-6 lg:text-4xl text-white font-bold">
                Complaint Accomplished
              </h1>
            </div>
            <div className="flex items-center justify-center md:justify-start px-4 py-3 md:px-5 py-4 md:py-6">
              <ComplaintCounters type="accomplished" />
            </div>
          </div>
        </div>

        {/* Third Part */}
        <section id="third-part" className="p-4 md:p-8 shadow-lg pb-8">
          <div>
            <Testimonial />
          </div>
        </section>
        <footer id="footer" className="p-0 md:p-8 text-center">
          <p className="text-white">
            ©2023 Vadodara Municipal Corporation.
            <br /> All rights reserved.
          </p>
        </footer>
      </section>
    </div>
  );
};

export default Layout;
