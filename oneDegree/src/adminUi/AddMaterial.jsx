import { Button } from "@/components/ui/button";
import { TestingUrl } from "@/shared/Constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddMaterial = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    try {

      const upperCaseData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, typeof value === "string" ? value.toUpperCase() : value])
      );
      const res = await axios.post(TestingUrl + "/api/materials", upperCaseData);
      if (res.status === 201) {
        toast.success(res.data.message);
        setLoading(false)
        reset();
      }
    } catch (error) {
      setLoading(false)
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  };
  return (
    <div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 px-4 md:px-20 gap-5 mt-16 w-full">
          {/* Name Field */}
          <div className="w-full">
            <label htmlFor="Name">
              Add Materials <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"
                } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Materials is required.</span>
            )}
          </div>
        </div>
        <div className="">
          {loading ? (
            <Button disabled className=" w-full sm:w-fit  mx-4 md:mx-20 mt-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="aw-full sm:w-fit  mx-4 md:mx-20 mt-4">Submit</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddMaterial;
