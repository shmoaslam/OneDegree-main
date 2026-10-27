import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns } from "./Colum";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useGetStore from "@/hooks/useGetStore";
import { useSelector } from "react-redux";
import axios from "axios";
import { TestingUrl } from "@/shared/Constant";

const AddStore = () => {
  const navi = useNavigate();
  useGetStore();

  const { Store } = useSelector((state) => state.AppSlice);

  const [StoreData, setStoreData] = useState(Store);
  const [filteredEntries, setFilteredEntries] = useState(Store);

  useEffect(() => {
    if (Store) {
      setStoreData(Store);
      setFilteredEntries(Store);
    }
  }, [Store]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredData = StoreData.filter(
      (row) =>
        row.store_name.toLowerCase().includes(searchQuery) ||
        row.store_address.toLowerCase().includes(searchQuery) ||
        row.locality.toLowerCase().includes(searchQuery) ||
        row.city.toLowerCase().includes(searchQuery)
    );
    setFilteredEntries(filteredData);
  };

  const handleEdit = (row) => {
    navi("/addstore", { state: { store: row } });
  };

  const handleDelete = async (row) => {
    try {
      const res = await axios.delete(`${TestingUrl}/api/store/${row.id}`);
      if (res.status === 200) {
        setFilteredEntries((prev) => prev.filter((store) => store.id !== row.id));
      }
    } catch (error) {
      console.error("Error deleting store:", error);
    }
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
          <Button
            className="ml-4 text-sm px-2 py-1 md:text-base md:px-4 md:py-2"
            onClick={() => navi("/addstore")}
          >
            Add Store
          </Button>
        </div>

        {/* Data Table */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <DataTable
            columns={columns(handleEdit, handleDelete)}
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

export default AddStore;
