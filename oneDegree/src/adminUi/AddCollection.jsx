import { Button } from "@/components/ui/button";
import { toBase64 } from "@/shared/Base64";
import { TestingUrl } from "@/shared/Constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddCollection = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();


    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const file = data.collection_image[0];
            const imageBase64 = await toBase64(file);
            
            const res = await axios.post(TestingUrl + "/api/collection", {
                collection_name: data.collection_name,
                collection_desc: data.collection_desc,
                collection_image: imageBase64,
            });

            if (res.status === 201) {
                toast.success(res.data.message);
                reset();
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 px-4 md:px-20 gap-5 mt-16 w-full">
                    {/* Collection Image Add */}
                    <div className="w-full">
                        <label htmlFor="collection_image">
                            Add Banner Image <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            id="collection_image"
                            className={`w-full border ${errors.collection_image ? "border-red-500" : "border-gray-300"} bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
                            {...register("collection_image", { required: "Banner image is required" })}
                        />
                        {errors.collection_image && (
                            <span className="text-red-500 text-sm">{errors.collection_image.message}</span>
                        )}
                    </div>

                    {/* Collection Name */}
                    <div className="w-full">
                        <label htmlFor="collection_name">
                            Add Collection Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="collection_name"
                            className={`w-full border ${errors.collection_name ? "border-red-500" : "border-gray-300"} bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
                            {...register("collection_name", { required: "Collection name is required" })}
                        />
                        {errors.collection_name && (
                            <span className="text-red-500 text-sm">{errors.collection_name.message}</span>
                        )}
                    </div>

                    {/* Collection Description */}
                    <div className="w-full">
                        <label htmlFor="collection_desc">
                            Add Description (max 200 character) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="collection_desc"
                            className={`w-full border ${errors.collection_desc ? "border-red-500" : "border-gray-300"} bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
                            {...register("collection_desc", { required: "Description is required" })}
                        />
                        {errors.collection_desc && (
                            <span className="text-red-500 text-sm">{errors.collection_desc.message}</span>
                        )}
                    </div>
                </div>

                <div>
                    {loading ? (
                        <Button disabled className="w-full sm:w-fit mx-4 md:mx-20 mt-4">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button className="w-full sm:w-fit mx-4 md:mx-20 mt-4">Submit</Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddCollection;
