import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { TestingUrl } from "./shared/Constant";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const ProductSinglePage = () => {
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlists, setWishlists] = useState({});
  const [loading, setLoading] = useState(true);
  const { id: product_id } = useParams();

  const getProductById = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${TestingUrl}/api/products/products/${product_id}`);
      if (res.status === 200) {
        setProduct(res.data);
        setSelectedColor(res.data.colors[0] || null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product_id) {
      getProductById();
    }
  }, [product_id]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const wishlistMap = storedWishlist.reduce((acc, item) => {
      const key = `${item.product_id}-${item.selected_color.color_id}`;
      acc[key] = true;
      return acc;
    }, {});
    setWishlists(wishlistMap);
  }, []);

  const toggleWishlist = () => {
    if (!product || !selectedColor) return;

    const key = `${product.product_id}-${selectedColor.product_color_id}`;
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const isAlreadyInWishlist = wishlist.some(
      (item) =>
        item.product_id === product.product_id &&
        item.selected_color.color_id === selectedColor.product_color_id
    );

    if (!isAlreadyInWishlist) {
      const wishlistItem = {
        product_id: product.product_id,
        product_name: product.product_name,
        category_name: product.category_name,
        material_name: product.material_name,
        selected_color: {
          color_name: selectedColor.color_name,
          color_id: selectedColor.product_color_id,
        },
        images: selectedColor.images.map((img) => img.image_url),
      };

      wishlist.push(wishlistItem);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlists((prev) => ({ ...prev, [key]: true }));
      toast.success("Product added to wishlist");
    } else {
      wishlist = wishlist.filter(
        (item) =>
          item.product_id !== product.product_id ||
          item.selected_color.color_id !== selectedColor.product_color_id
      );

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlists((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
      toast.error("Product removed from wishlist");
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedImage(0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <ScaleLoader />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="relative w-full h-[400px] overflow-hidden flex justify-center items-center bg-white md:h-[500px] md:mt-[-20px]">
        <div className="h-full w-[100%] md:w-[50%] pb-20 md:pb-0">
          {selectedColor?.images?.[selectedImage]?.image_url && (
            <img
              src={selectedColor.images[selectedImage].image_url}
              alt={`Color ${selectedColor.color_name}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out p-5"
            />
          )}
        </div>
        <div className="absolute bottom-[0.5rem] md:bottom-4 left-4 flex md:flex-row flex-col gap-[6px]">
          {selectedColor?.images?.map((image, index) => (
            <button
              key={image.image_id}
              className={`w-12 h-12 border-2 rounded-md overflow-hidden ${selectedImage === index ? "border-gray-900" : "border-gray-300"
                }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.image_url}
                alt={`Mini ${selectedColor.color_name}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
        <div className="absolute text-center mt-4 bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          <p className="text-lg font-medium">
            {product?.product_name} - {selectedColor?.color_name} 
          </p>
        </div>
        <Button
          variant="ghost"
          className="absolute bottom-4 right-4 flex items-center justify-center p-3 btn-1"
          onClick={toggleWishlist}
        >
          <Heart
            className={`w-12 h-12 ${wishlists[`${product?.product_id}-${selectedColor?.product_color_id}`]
                ? "fill-current text-red-500"
                : "text-gray-400"
              }`}
          />
        </Button>
      </div>
      <div className="flex space-x-2 pt-6 pb-6 text-center items-start justify-center bg-[#f2f3f5]">
        {product?.colors?.map((color) => (
          <Button
            key={color.product_color_id}
            className={`h-3 w-8 rounded-sm cursor-pointer py-1`}
            style={{
              background: color.color_code.includes("linear-gradient") ? color.color_code : color.color_code
            }}
            onClick={() => handleColorChange(color)}
          />
        ))}
      </div>
      {/* <div className="w-full bg-gray-100 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Description</h2>
          <p className="text-gray-600 mt-4">{product?.product_description}</p>
        </div>
      </div> */}
    </div>
  );
};

export default ProductSinglePage;
