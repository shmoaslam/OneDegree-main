import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { TestingUrl } from "@/shared/Constant";
import { Loader2 } from "lucide-react";

const AddStore = () => {
  const location = useLocation();
  const store = location.state?.store;
  const [storeByIdData, setStoreByIdData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getStoreById = async () => {
      const res = await axios.get(TestingUrl + `/api/store/${store.store_id}`)
      if (res.status === 200) {
        setStoreByIdData(res.data)
      }
    }
    getStoreById()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (storeByIdData) {
      setValue("store_name", storeByIdData.store_name || "");
      setValue("store_address", storeByIdData.store_address || "");
      setValue("locality", storeByIdData.locality || "");
      setValue("city", storeByIdData.city || "");
      setValue("pincode", storeByIdData.pincode || "");
    }
  }, [storeByIdData, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let response;
      if (store) {
        setLoading(true)
        //  this is my update api
        response = await axios.put(TestingUrl + `/api/store/${storeByIdData.store_id}`, data, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        // post api
        response = await axios.post(TestingUrl + `/api/store`, data, {
          headers: { "Content-Type": "application/json" },
        });
      }
      toast.success(response.data.message);
      reset();
      setLoading(false)
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || error.response.data.error || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="w-full">
      {/* form add Products */}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 px-4 md:px-20 gap-5 mt-16 w-full">

          <div className="w-full">
            <label htmlFor="store_name">
              Store Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Store Name"
              className={`w-full border ${errors.store_name ? "border-red-500" : "border-gray-300"
                } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
              {...register("store_name", { required: true })}
              name="store_name"
            />
            {errors.store_name && (
              <span className="text-red-500 text-sm">Store Name is required.</span>
            )}
          </div>



          <div className="w-full">
            <label htmlFor="store_address">
              Store Address <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter Address"
              className={`w-full border ${errors.store_address ? "border-red-500" : "border-gray-300"
                } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
              {...register("store_address", { required: true })}
              name="store_address"
            />
            {errors.store_address && (
              <span className="text-red-500 text-sm">Address is required.</span>
            )}
          </div>



          <div className="w-full">
            <label htmlFor="locality">
              Locality <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Locality"
              className={`w-full border ${errors.locality ? "border-red-500" : "border-gray-300"
                } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
              {...register("locality", { required: true })}
              name="locality"
            />
            {errors.locality && (
              <span className="text-red-500 text-sm">Locality is required.</span>
            )}
          </div>


          <div className="w-full">
            <label htmlFor="city">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter City"
              className={`w-full border ${errors.city ? "border-red-500" : "border-gray-300"
                } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
              {...register("city", { required: true })}
              name="city"
            />
            {errors.city && (
              <span className="text-red-500 text-sm">City is required.</span>
            )}
          </div>


          <div className="w-full">
            <label htmlFor="pincode">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter Pincode"
              className={`w-full border ${errors.pincode ? "border-red-500" : "border-gray-300"
                } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
              {...register("pincode", { required: true })}
              name="pincode"
            />
            {errors.pincode && (
              <span className="text-red-500 text-sm">Pincode is required.</span>
            )}
          </div>
          <div>
            {loading ? (
              <Button disabled className="w-28">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-28">Submit</Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStore;
