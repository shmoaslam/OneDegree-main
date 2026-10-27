import React, { useState } from "react";
import { LuMapPin } from "react-icons/lu";

const StoreTable = ({ storeDataTable }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(storeDataTable.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = storeDataTable.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="overflow-x-auto mt-10">
      <table className="min-w-full table-auto bg-white shadow-lg border-separate border-spacing-0 border-2">
        <thead className="bg-[#394731] text-white">
          <tr>
            <th className="px-6 py-3 text-center border-b">Store Name</th>
            <th className="px-6 py-3 text-center border-b">Store Address</th>
            <th className="px-6 py-3 text-center border-b">Locality</th>
            <th className="px-6 py-3 text-center border-b">City</th>
            <th className="px-6 py-3 text-center border-b">Pincode</th>
            <th className="px-6 py-3 text-center border-b">Map</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No Store Available.
              </td>
            </tr>
          ) : (
            currentData.map((data) => (
              <tr key={data.store_id} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4 text-center border-b">{data.store_name}</td>
                <td className="px-6 py-4 text-center border-b">{data.store_address}</td>
                <td className="px-6 py-4 text-center border-b">{data.locality}</td>
                <td className="px-6 py-4 text-center border-b">{data.city}</td>
                <td className="px-6 py-4 text-center border-b">{data.pincode}</td>
                <td className="px-6 py-4 text-center border-b">
                  {data.google_map ? (
                    <a
                      href={`${data.google_map}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-3xl"
                    >
                      <LuMapPin />
                    </a>
                  ) : (
                    <span></span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#394731] text-white hover:bg-[#2c3729]"}`}
        >
          Previous
        </button>
        
        <span className="px-4 py-2 border rounded bg-white text-black">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-[#394731] text-white hover:bg-[#2c3729]"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StoreTable;
