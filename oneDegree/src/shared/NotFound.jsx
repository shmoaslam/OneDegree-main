import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-6">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-600 mt-4">
        Page Not Found
      </p>
      <p className="text-gray-500 mt-2 text-center">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#3A4831] text-white rounded-xl  transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
