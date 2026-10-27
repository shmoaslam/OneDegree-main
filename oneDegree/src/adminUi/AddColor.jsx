import { Button } from "@/components/ui/button";
import { TestingUrl } from "@/shared/Constant";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SketchPicker } from "react-color";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const AddColor = () => {
    const [loading, setLoading] = useState(false);
    const [colorType, setColorType] = useState("solid"); // Toggle between Solid & Gradient
    const [color, setColor] = useState("#ffffff");
    const [gradient, setGradient] = useState({
        start: "#ff0000",
        end: "#0000ff",
        direction: "to right",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const upperCaseData = Object.fromEntries(
                Object.entries(data).map(([key, value]) => [key, typeof value === "string" ? value.toUpperCase() : value])
            );
            const colorCode =
                colorType === "solid"
                    ? color.toUpperCase()
                    : `linear-gradient(${gradient.direction}, ${gradient.start.toUpperCase()}, ${gradient.end.toUpperCase()})`;

            const formData = { ...upperCaseData, color_code: colorCode };

            
            const res = await axios.post(TestingUrl + "/api/colors", formData);

            if (res.status === 201) {
                toast.success("Color added successfully");
                setLoading(false);
                reset();
                setColor("#FFFFFF");
                setGradient({ start: "#ff0000", end: "#0000ff", direction: "to right" });
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
        <div className="mb-10">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 px-4 md:px-20 gap-5 mt-16 w-full">

                    {/* Color Name Input */}
                    <div className="w-full">
                        <label htmlFor="color_name">
                            Color Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="color_name"
                            className={`w-full border ${errors.color_name ? "border-red-500" : "border-gray-300"
                                } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
                            {...register("color_name", { required: true })}
                        />
                        {errors.color_name && (
                            <span className="text-red-500 text-sm">Name is required.</span>
                        )}
                    </div>

                    {/* Toggle Buttons for Solid/Gradient */}
                    <div className="flex gap-4">
                        <button
                            className={`px-4 py-1 border ${colorType === "solid" ? "bg-gray-300" : ""}`}
                            onClick={(e) => { e.preventDefault(); setColorType("solid"); }}
                        >
                            Solid
                        </button>
                        <button
                            className={`px-4 py-1 border ${colorType === "gradient" ? "bg-gray-300" : ""}`}
                            onClick={(e) => { e.preventDefault(); setColorType("gradient"); }}
                        >
                            Gradient
                        </button>
                    </div>

                    {/* Solid Color Picker */}
                    {colorType === "solid" && (
                        <div className="w-full">
                            <label htmlFor="color-picker">
                                Select Color <span className="text-red-500">*</span>
                            </label>
                            <SketchPicker
                                color={color}
                                onChangeComplete={(color) => setColor(color.hex)}
                                className="mt-2"
                            />
                        </div>
                    )}

                    {/* Gradient Color Picker */}
                    {colorType === "gradient" && (
                        <div className="w-full">
                            <label>Start Color</label>
                            <SketchPicker
                                color={gradient.start}
                                onChangeComplete={(color) =>
                                    setGradient((prev) => ({ ...prev, start: color.hex }))
                                }
                                className="mt-2"
                            />
                            <label className="mt-2">End Color</label>
                            <SketchPicker
                                color={gradient.end}
                                onChangeComplete={(color) =>
                                    setGradient((prev) => ({ ...prev, end: color.hex }))
                                }
                                className="mt-2"
                            />

                            {/* Gradient Direction */}
                            <label className="mt-2">Direction</label>
                            <select
                                className="w-full border p-2 mt-1"
                                onChange={(e) =>
                                    setGradient((prev) => ({ ...prev, direction: e.target.value }))
                                }
                            >
                                <option value="to right">Left to Right</option>
                                <option value="to left">Right to Left</option>
                                <option value="to bottom">Top to Bottom</option>
                                <option value="to top">Bottom to Top</option>
                                <option value="45deg">Diagonal</option>
                            </select>

                            {/* Gradient Preview */}
                            <div
                                className="mt-4 w-full h-12 border"
                                style={{
                                    background: `linear-gradient(${gradient.direction}, ${gradient.start}, ${gradient.end})`,
                                }}
                            ></div>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
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

export default AddColor;
