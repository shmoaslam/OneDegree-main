import { Button } from "@/components/ui/button";
import { toBase64 } from "@/shared/Base64";
import { TestingUrl } from "@/shared/Constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddShape = () => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);

        const file = data.shape_img[0];
        const ImgBase64 = await toBase64(file)

        try {
            const res = await axios.post(TestingUrl + "/api/shape", {
                shape_name: data.shape_name,
                shape_img: ImgBase64,
            });

            if (res.status === 201) {
                toast.success(res.data.message);
                setLoading(false);
                reset();
            }
        } catch (error) {
            setLoading(false);
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



                    {/* Image Field */}
                    <div className="w-full">
                        <label htmlFor="shape_img">
                            Add Image <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            className={`w-full border ${errors.shape_img ? "border-red-500" : "border-gray-300"
                                } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
                            {...register("shape_img", { required: true })}
                        />
                        {errors.shape_img && (
                            <span className="text-red-500 text-sm">Shape Image is required.</span>
                        )}
                    </div>

                    {/* Name Field */}
                    <div className="w-full">
                        <label htmlFor="shape_name">
                            Add Shape <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={`w-full border ${errors.shape_name ? "border-red-500" : "border-gray-300"
                                } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
                            {...register("shape_name", { required: true })}
                        />
                        {errors.shape_name && (
                            <span className="text-red-500 text-sm">Shape Name is required.</span>
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

export default AddShape;
