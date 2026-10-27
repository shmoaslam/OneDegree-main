import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useGetCategory from "@/hooks/useGetCategory";
import useGetMaterials from "@/hooks/useGetMaterials";
import { useSelector } from "react-redux";
import { TestingUrl } from "@/shared/Constant";
import useGetAllColors from "@/hooks/useGetAllColors";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import useCollection from "@/hooks/useCollection";
import useGetFinishing from "@/hooks/useGetFinishing";
import useGetFrameType from "@/hooks/useGetFrameType";
import useGetShape from "@/hooks/useGetShape";
import { handleImageUploadProduct } from "@/shared/Base64";

const AddProducts = () => {
  useGetCategory();
  useGetMaterials();
  useGetAllColors();
  useCollection();
  useGetFinishing();
  useGetFrameType();
  useGetShape();

  const location = useLocation();
  const product = location.state?.product;
  // console.log(product)
  const {
    material,
    colors,
    collection,
    category,
    finishing,
    FrameType,
    shape,
  } = useSelector((state) => state.AppSlice);

  const [categoryDrop, setCategoryDrop] = useState([]);
  const [colorsDrop, setColorsDrop] = useState([]);
  const [materialDrop, setMaterialDrop] = useState([]);
  const [collectionDrop, setCollectionDrop] = useState([]);
  const [finishingDrop, setFinishingDrop] = useState([]);
  const [frameTypeDrop, setFrameTypeDrop] = useState([]);
  const [shapeDrop, setShapeDrop] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatedImages, setUpdatedImages] = useState({});
  const [updatedColors, setUpdatedColors] = useState({});

  useEffect(() => {
    if (category) {
      setCategoryDrop(category);
    }
    if (colors) {
      setColorsDrop(colors);
    }
    if (material) {
      setMaterialDrop(Array.isArray(material) ? material : []);
    }

    if (collection) {
      setCollectionDrop(collection);
    }
    if (finishing) {
      setFinishingDrop(finishing);
    }
    if (FrameType) {
      setFrameTypeDrop(FrameType);
    }
    if (shape) {
      setShapeDrop(shape);
    }
  }, [category, material, collection, finishing, FrameType, shape]);

  const [ValuePr, SetValuePr] = useState(product);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const [colorCount, setColorCount] = useState(0);

  useEffect(() => {
    const fetchCategoryId = async () => {
      try {
        if (product) {
          setValue("name", product.product_name);
          setValue("description", product.product_description);
          setValue("category_id", product.category_id);
          setValue("material_id", product.material_id);
          setValue("collection_id", product.collection_id);
          setValue("finishing_id", product.finishing_id);
          setValue("shape_id", product.shape_id);
          setValue("frame_type_id", product.frame_type_id);
          setValue("color", product.colors[0].color_name);
          setValue("size", product.size);
          // console.log("size here ", product.size)

          if (product.colorDetails) {
            setColorCount(product.colorDetails.length);
            product.colorDetails.forEach((color, index) => {
              setValue(`color_${index + 1}`, color.name);
              setValue(`image_${index + 1}`, color.image);
            });
          }
        }
      } catch (error) {
        console.error("Error fetching category ID:", error);
      }
    };
    fetchCategoryId();
  }, [product, setValue]);

  const selectedColors = watch();

  const getAvailableColors = (currentIndex) => {
    const selectedColorNames = Object.keys(selectedColors)
      .filter(
        (key) => key.startsWith("colors_") && key !== `colors_${currentIndex}`
      )
      .map((key) => selectedColors[key]);

    return colorsDrop.filter(
      (color) => !selectedColorNames.includes(color.color_name)
    );
  };

  //  file index onchange
  const handleFileChange = (event, colorIndex, imageIndex) => {
    const file = event.target.files[0];

    if (file) {
      setUpdatedImages((prev) => ({
        ...prev,
        [colorIndex]: {
          ...(prev[colorIndex] || {}),
          [imageIndex]: file,
        },
      }));
    }
  };

  const handleColorNameChange = (colorIndex, newColorName) => {
    setUpdatedColors((prev) => ({
      ...prev,
      [colorIndex]: newColorName,
    }));
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const colors = await Promise.all(
        Array.from({ length: colorCount || formData.colors?.length || 0 }).map(
          async (_, index) => {
            const colorName =
              updatedColors[index] ||
              formData[`colors_${index + 1}`] ||
              product?.colors?.[index]?.color_name;

            const colorCode =
              colorsDrop?.find((c) => c.color_name === colorName)?.color_code ||
              formData.colors?.[index]?.color_code ||
              product?.colors?.[index]?.color_code ||
              "";

            let finalImages =
              product?.colors?.[index]?.images?.map((img) => ({
                url: img.image_url,
              })) || [];

            if (product?.product_id) {
              if (updatedImages[index]) {
                const updatedImgArray = await handleImageUploadProduct(
                  Object.values(updatedImages[index])
                );
                Object.keys(updatedImages[index]).forEach((key, i) => {
                  finalImages[Number(key)] = { url: updatedImgArray[i] };
                });
              }
            } else {
              const newImages =
                formData[`images_${index + 1}`] ||
                formData.colors?.[index]?.images ||
                [];
              const uploadedNewImages = await handleImageUploadProduct(
                Array.from(newImages)
              );
              finalImages = [
                ...finalImages,
                ...uploadedNewImages.map((url) => ({ url })),
              ];
            }

            return {
              color_name: colorName,
              color_code: colorCode,
              images: finalImages,
            };
          }
        )
      );

      const payload = {
        product_id: product?.product_id || null,
        name: formData.name || product?.name || "",
        size: formData.size || product?.size || "",
        category_id:
          Number(formData.category_id) || product?.category_id || null,
        material_id:
          Number(formData.material_id) || product?.material_id || null,
        collection_id:
          Number(formData.collection_id) || product?.collection_id || null,
        finishing_id:
          Number(formData.finishing_id) || product?.finishing_id || null,
        shape_id: Number(formData.shape_id) || product?.shape_id || null,
        frame_type_id:
          Number(formData.frame_type_id) || product?.frame_type_id || null,
        colors,
      };

      if (product?.product_id) {
        const response = await axios.put(`${TestingUrl}/api/products`, payload);
        toast.success(response.data.message);
      } else {
        const response = await axios.post(
          `${TestingUrl}/api/products`,
          payload
        );
        toast.success(response.data.message);
      }

      setLoading(false);
      reset();
    } catch (error) {
      setLoading(false);
      console.error("API error:", error);
      toast.error(
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : "An error occurred"
      );
    }
  };

  const handleColorChange = (e) => {
    setColorCount(Number(e.target.value));
  };

  return (
    <div className="w-full mb-5">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 px-4 md:px-20 gap-5 mt-16 w-full">
          {/* Name Field */}
          <div className="w-full">
            <label htmlFor="Name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Name is required.</span>
            )}
          </div>

          {/* size Field */}
          <div className="w-full">
            <label htmlFor="Size">
              Size <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Size"
              className={`w-full border ${
                errors.size ? "border-red-500" : "border-gray-300"
              } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
              {...register("size", { required: true })}
            />
            {errors.size && (
              <span className="text-red-500 text-sm">Size is required.</span>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="w-full">
            <label htmlFor="category_id">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full border ${
                errors.category ? "border-red-500" : "border-gray-300"
              } bg-transparent placeholder:text-white rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500`}
              {...register("category_id", { required: true })}
              value={watch("category_id")}
            >
              <option value="">Select Category</option>
              {categoryDrop.map((item) => (
                <option key={item.category_id} value={item.category_id}>
                  {item.category_name}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm">
                Category is required.
              </span>
            )}
          </div>

          {/* Material Dropdown */}
          <div className="w-full">
            <label htmlFor="material_id">
              Material <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full border ${
                errors.material_id ? "border-red-500" : "border-gray-300"
              } bg-transparent placeholder:text-white rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500`}
              {...register("material_id", { required: true })}
              value={watch("material_id")}
            >
              <option value="">Select Material</option>
              {materialDrop.map((item) => (
                <option key={item.material_id} value={item.material_id}>
                  {item.material_name}
                </option>
              ))}
            </select>
            {errors.material_id && (
              <span className="text-red-500 text-sm">
                Material is required.
              </span>
            )}
          </div>

          {/* collection Dropdown */}
          <div className="w-full">
            <label htmlFor="collection_id">
              Collection <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full border ${
                errors.collection_id ? "border-red-500" : "border-gray-300"
              } bg-transparent placeholder:text-white rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500`}
              {...register("collection_id", { required: true })}
              value={watch("collection_id")}
            >
              <option value="">Select Material</option>
              {collectionDrop.map((item) => (
                <option key={item.collection_id} value={item.collection_id}>
                  {item.collection_name}
                </option>
              ))}
            </select>
            {errors.collection_id && (
              <span className="text-red-500 text-sm">
                collection is required.
              </span>
            )}
          </div>

          {/* finishing Dropdown */}
          <div className="w-full">
            <label htmlFor="finishing_id">
              Finishing <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full border ${
                errors.finishing_id ? "border-red-500" : "border-gray-300"
              } bg-transparent placeholder:text-white rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500`}
              {...register("finishing_id", { required: true })}
              value={watch("finishing_id")}
            >
              <option value="">Select Finishing</option>
              {finishingDrop.map((item) => (
                <option key={item.finishing_id} value={item.finishing_id}>
                  {item.finishing_name}
                </option>
              ))}
            </select>
            {errors.finishing_id && (
              <span className="text-red-500 text-sm">
                Finishing is required.
              </span>
            )}
          </div>

          {/* FramrType Dropdown */}
          <div className="w-full">
            <label htmlFor="frame_type_id">
              Frame Type <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full border ${
                errors.id ? "border-red-500" : "border-gray-300"
              } bg-transparent placeholder:text-white rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500`}
              {...register("frame_type_id", { required: true })}
              value={watch("frame_type_id")}
            >
              <option value="">Select Frame Type</option>
              {frameTypeDrop.map((item) => (
                <option key={item.frame_type_id} value={item.frame_type_id}>
                  {item.frame_type_name}
                </option>
              ))}
            </select>
            {errors.frame_type_id && (
              <span className="text-red-500 text-sm">
                Frame ID is required.
              </span>
            )}
          </div>

          {/* Shape Dropdown */}
          <div className="w-full">
            <label htmlFor="shape_id">
              Shape Type <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full border ${
                errors.id ? "border-red-500" : "border-gray-300"
              } bg-transparent placeholder:text-white rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500`}
              {...register("shape_id", { required: true })}
              value={watch("shape_id")}
            >
              <option value="">Select Shape Type</option>
              {shapeDrop.map((item) => (
                <option key={item.shape_id} value={item.shape_id}>
                  {item.shape_name}
                </option>
              ))}
            </select>
            {errors.shape_id && (
              <span className="text-red-500 text-sm">
                Shape ID is required.
              </span>
            )}
          </div>

          {/* Color Dropdown */}
          {ValuePr === undefined && (
            <div className="w-full">
              <label htmlFor="colors">
                Color <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full border ${
                  errors.color ? "border-red-500" : "border-gray-300"
                } bg-transparent placeholder:text-white rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500`}
                {...register("colors", { required: true })}
                onChange={handleColorChange}
              >
                <option value="">Select Color</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {errors.color && (
                <span className="text-red-500 text-sm">Color is required.</span>
              )}
            </div>
          )}

          {/*  my  value show in dropdown  */}
          {ValuePr?.colors && (
            <div className="w-full mt-4">
              {ValuePr.colors.map((color, colorIndex) => (
                <div key={color.color_id} className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <label
                      htmlFor={`color_${colorIndex}`}
                      className="text-lg font-bold"
                    >
                      Color:
                    </label>
                    <select
                      id={`color_${colorIndex}`}
                      className={`w-48 border ${
                        errors[`color_${colorIndex}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
                      value={updatedColors[colorIndex] || color.color_name}
                      onChange={(e) =>
                        handleColorNameChange(colorIndex, e.target.value)
                      }
                    >
                      <option value="">Select Color</option>
                      {colorsDrop.map((item) => (
                        <option key={item.color_id} value={item.color_name}>
                          {item.color_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    {color.images.map((image, imageIndex) => (
                      <div key={image.image_id} className="w-28">
                        <img
                          src={image.image_url}
                          alt={`Color ${color.color_name}`}
                          className="w-24 h-24 object-cover rounded-lg mb-2"
                        />
                        <label
                          htmlFor={`file_${colorIndex}_${imageIndex}`}
                          className="block text-sm font-medium"
                        >
                          Replace Image
                        </label>
                        <input
                          type="file"
                          id={`file_${colorIndex}_${imageIndex}`}
                          className="w-full border border-gray-300 rounded-lg py-1 px-2 text-sm"
                          {...register(
                            `colors.${colorIndex}.images.${imageIndex}.file`,
                            {
                              required: false,
                            }
                          )}
                          onChange={(e) =>
                            handleFileChange(e, colorIndex, imageIndex)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Dynamic Color Inputs */}
          {[...Array(colorCount)].map((_, index) => {
            const availableColors = getAvailableColors(index + 1);
            return (
              <div key={index} className="w-full">
                <label htmlFor={`colors_${index + 1}`}>
                  Color {index + 1} <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full border ${
                    errors[`color_${index + 1}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
                  {...register(`colors_${index + 1}`, { required: true })}
                >
                  <option value="">Select Color</option>
                  {availableColors.map((item) => (
                    <option key={item.color_id} value={item.color_name}>
                      {item.color_name}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}

          {/* Dynamic Image Inputs */}
          {[...Array(colorCount)].map((_, index) => (
            <div key={index} className="w-full">
              <label htmlFor={`images_${index + 1}`}>
                Image {index + 1} (2-3 files){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                multiple
                className={`w-full border ${
                  errors[`image_${index + 1}`]
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-transparent placeholder:text-white rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500`}
                {...register(`images_${index + 1}`, {
                  required: true,
                  validate: {
                    fileCount: (value) =>
                      (value.length >= 2 && value.length <= 3) ||
                      "You must upload between 2 and 3 files.",
                  },
                })}
              />
              {errors[`images_${index + 1}`] && (
                <span className="text-red-500 text-sm">
                  {errors[`images_${index + 1}`]?.message}
                </span>
              )}
            </div>
          ))}

          {loading ? (
            <Button disabled className="mt-5 w-full sm:w-fit ">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="my-5 w-full sm:w-fit ">Submit</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
