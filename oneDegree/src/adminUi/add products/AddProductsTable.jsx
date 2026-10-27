import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns } from "./Colum";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiseLoader, } from "react-spinners";
import toast from "react-hot-toast";
import axios from "axios";
import { TestingUrl } from "@/shared/Constant";
import useAllProduct from "@/hooks/useAllProduct";

const AddProductsTable = () => {
  useAllProduct();

  const navigate = useNavigate();
  const { allproduct = [] } = useSelector((state) => state.AppSlice);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFilteredEntries(allproduct);
    if (allproduct.length > 0) {
      setLoading(false);
    }
  }, [allproduct]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredData = allproduct.filter(
      (row) =>
        row.product_name.toLowerCase().includes(searchQuery) ||
        row.category_name.toLowerCase().includes(searchQuery) ||
        row.material_name.toLowerCase().includes(searchQuery) ||
        row.collection_name.toLowerCase().trim().includes(searchQuery)
    );
    setFilteredEntries(filteredData);
  };

  const handleEdit = (row) => {
    navigate("/AddProduct", { state: { product: row } });
  };

  const handleDelete = async (row) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${TestingUrl}/api/products/${row.product_id}`);
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-center mt-16">Product Table</h1>
      <div className="md:mx-36">
        <div className="w-full flex justify-between items-center mb-5">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 p-1 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
          />
          <Button
            className="ml-4 text-sm px-2 py-1 md:text-base md:px-4 md:py-2"
            onClick={() => navigate("/AddProduct")}
          >
            Add Product
          </Button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <RiseLoader color="#3A4831" loading={loading} size={10} />
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center text-gray-500">
              No records to display
            </div>
          ) : (
            <DataTable
              columns={columns(handleEdit, handleDelete)}
              data={filteredEntries}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30]}
              highlightOnHover
              striped
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProductsTable;
