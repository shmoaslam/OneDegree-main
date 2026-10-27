import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns } from "./Colum";
import useAllProduct from "@/hooks/useAllProduct";


const StoreTable2 = () => {

  useAllProduct()
  // const { allproduct } = useSelector((state) => state.AppSlice);
  const [filteredEntries, setFilteredEntries] = useState([])

  // useEffect(() => {
  //   if (allproduct) {
  //     setFilteredEntries(allproduct)
  //   }
  // }, [allproduct]);;

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredData = StoreData.filter(
      (row) =>
        row.name.toLowerCase().includes(searchQuery) ||
        row.category.toLowerCase().includes(searchQuery) ||
        row.Pincode.toLowerCase().includes(searchQuery) ||
        row.Subcity.toLowerCase().includes(searchQuery) ||
        row.bpName.toLowerCase().includes(searchQuery) ||
        row.fullAddress.toLowerCase().includes(searchQuery) ||
        row.number.toLowerCase().includes(searchQuery) ||
        row.material.toLowerCase().includes(searchQuery)
    );
    setFilteredEntries(filteredData);
  };

  return (
    <div>
      <h1 className="font-bold text-center mt-16">Store Table</h1>

      <div className="md:mx-10">
        {/* Search Bar and Button */}
        <div className="w-full flex justify-between items-center mb-5">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 p-1 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
          />
        </div>

        {/* Data Table */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <DataTable
            columns={columns}
            data={filteredEntries}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            highlightOnHover
            striped
          />
        </div>
      </div>
    </div>
  );
};

export default StoreTable2;
