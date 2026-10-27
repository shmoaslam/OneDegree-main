import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StoreTable from "./StoreTable";
import useGetStore from "@/hooks/useGetStore";
import { useSelector } from "react-redux";

const StoreLocatorPage = () => {
  useGetStore();

   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  

  const { Store } = useSelector((state) => state.AppSlice);
  const [storeData, setStoreData] = useState(Store);
  const [storeDataTable, setStoreDataTable] = useState([]);
  const [filters, setFilters] = useState({ city: "", locality: "", pincode: "" });

  useEffect(() => {
    if (Store) {
      setStoreData(Store);
      setStoreDataTable(Store);
    }
  }, [Store]);

  const {
    register: registerCityLocality,
    handleSubmit: handleSubmitCityLocality,
    formState: { errors: errorsCityLocality },
    reset: resetCityLocality,
  } = useForm();

  const {
    register: registerPincode,
    handleSubmit: handleSubmitPincode,
    formState: { errors: errorsPincode },
    reset: resetPincode,
  } = useForm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitCityLocality = () => {
    const { city, locality } = filters;
    let filteredData = storeData;

    if (locality) {
      filteredData = filteredData.filter(
        (item) => item.locality?.trim().toLowerCase() === locality.trim().toLowerCase()
      );
    } else if (city) {
      filteredData = filteredData.filter(
        (item) => item.city?.trim().toLowerCase() === city.trim().toLowerCase()
      );
    }

    setStoreDataTable(filteredData);
  };

  const onSubmitPincode = () => {
    const { pincode } = filters;
    let filteredData = storeData;

    if (pincode) {
      filteredData = filteredData.filter(
        (item) => item.pincode?.toString().trim() === pincode.trim()
      );
    }

    setStoreDataTable(filteredData);
  };

  const handleClear = () => {
    setStoreDataTable(storeData);
    setFilters({ city: "", locality: "", pincode: "" });
    resetCityLocality();
    resetPincode();
  };

  return (
    <>
      <div className="md:mx-28 mx-5 mt-16 md:mt-10">
        {/* Filters Section */}
        <div className="grid md:grid-cols-2 gap-2 md:gap-10">
          {/* City & Locality Filter */}
          <form
            onSubmit={handleSubmitCityLocality(onSubmitCityLocality)}
            className="bg-white shadow-md border-2 rounded-lg p-5"
          >
            <h3 className="text-lg font-medium mb-3">Filter by City & Locality</h3>

            <div className="grid grid-cols-1 gap-4">
              {/* City Dropdown */}
              <div>
                <label htmlFor="city">City</label>
                <select
                  className={`w-full border ${errorsCityLocality.city ? "border-red-500" : "border-gray-300"} rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500`}
                  {...registerCityLocality("city")}
                  onChange={(e) => {
                    handleInputChange(e);
                    setFilters((prev) => ({ ...prev, locality: "" }));
                  }}
                  name="city"
                >
                  <option value="">Select City</option>
                  {[...new Set(storeData.map((item) => item.city?.trim()))].map(
                    (city) => <option key={city} value={city}>{city}</option>
                  )}
                </select>
                {errorsCityLocality.city && <span className="text-red-500 text-sm">City is required.</span>}
              </div>

              {/* Locality Dropdown */}
              <div>
                <label htmlFor="locality">Locality</label>
                <select
                  className={`w-full border ${errorsCityLocality.locality ? "border-red-500" : "border-gray-300"} rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500`}
                  {...registerCityLocality("locality")}
                  onChange={handleInputChange}
                  name="locality"
                  disabled={!filters.city}
                >
                  <option value="">Select Locality</option>
                  {storeData
                    .filter((item) => item.city?.trim().toLowerCase() === filters.city.trim().toLowerCase()) // Filter localities by selected city
                    .map((item) => item.locality?.trim()) // Get localities
                    .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
                    .map((locality) => <option key={locality} value={locality}>{locality}</option>)
                  }
                </select>
                {errorsCityLocality.locality && <span className="text-red-500 text-sm">Locality is required.</span>}
              </div>
            </div>

            <div className="flex gap-5 mt-4">
              <button type="submit" className="bg-[#3A4831] text-white px-4 py-2 rounded-lg">
                Search
              </button>
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={handleClear}>
                Clear
              </button>
            </div>
          </form>

          {/* Pincode Filter */}
          <form
            onSubmit={handleSubmitPincode(onSubmitPincode)}
            className="bg-white shadow-md rounded-lg p-5 border-2"
          >
            <h3 className="text-lg font-medium mb-3">Filter by Pincode</h3>

            <div>
              <label htmlFor="pincode">Pincode</label>
              <input
                type="number"
                placeholder="Enter Pincode"
                className={`w-full border ${errorsPincode.pincode ? "border-red-500" : "border-gray-300"} rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500`}
                {...registerPincode("pincode")}
                onChange={handleInputChange}
                name="pincode"
              />
              {errorsPincode.pincode && <span className="text-red-500 text-sm">Pincode is required.</span>}
            </div>

            <div className="flex gap-5 mt-4">
              <button type="submit" className="bg-[#3A4831] text-white px-4 py-2 rounded-lg">
                Search
              </button>
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={handleClear}>
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="mt-10 mb-10">
          <StoreTable storeDataTable={storeDataTable} />
        </div>
      </div>
    </>
  );
};

export default StoreLocatorPage;
