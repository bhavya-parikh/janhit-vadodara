import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="text-center mt-16">
      <h2 className="text-4xl text-blue-500 mb-4">404 Not Found</h2>
      <p className="text-lg text-gray-700 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default Error;
