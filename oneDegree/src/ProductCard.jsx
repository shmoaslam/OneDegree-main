import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { RiseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ items, filters, activeView }) => {
  const navi = useNavigate();
  const [wishlists, setWishlists] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredImages, setHoveredImages] = useState({});

  useEffect(() => {
    if (items.length > 0) {
      setLoading(false);
    }
  }, [items]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const wishlistMap = storedWishlist.reduce((acc, item) => {
      const key = `${item.product_id}-${item.selected_color.color_name}`;
      acc[key] = true;
      return acc;
    }, {});
    setWishlists(wishlistMap);
  }, []);

  const toggleWishlist = (product) => {
    const selectedColorData = selectedColors[product.product_id] || {
      color_name: product.colors[0]?.color_name,
      color_id: product.colors[0]?.product_color_id,
      image_url: product.colors[0]?.images[0]?.image_url,
      image_url1: product.colors[0]?.images[1]?.image_url,
      image_url2: product.colors[0]?.images[2]?.image_url,
    };

    const key = `${product.product_id}-${selectedColorData.color_name}`;
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlists[key]) {
      const wishlistItem = {
        product_id: product.product_id,
        product_name: product.product_name,
        category_name: product.category_name,
        material_name: product.material_name,
        selected_color: {
          color_name: selectedColorData.color_name,
          color_id: selectedColorData.color_id,
        },
        images: [
          selectedColorData.image_url,
          selectedColorData.image_url1,
          selectedColorData.image_url2,
        ],
      };

      wishlist.push(wishlistItem);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlists((prev) => ({ ...prev, [key]: true }));
      toast.success("Product added to wishlist");
    } else {
      wishlist = wishlist.filter(
        (item) =>
          item.product_id !== product.product_id ||
          item.selected_color.color_id !== selectedColorData.color_id,
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

  const handleColorChange = (productId, color) => {
    const colorDetails = items
      .find((product) => product.product_id === productId)
      .colors.find((c) => c.color_name === color);

    setSelectedColors((prev) => ({
      ...prev,
      [productId]: {
        color_name: colorDetails.color_name,
        color_id: colorDetails.product_color_id,
        image_url: colorDetails.images[0]?.image_url || null,
        image_url1: colorDetails.images[1]?.image_url || null,
        image_url2: colorDetails.images[2]?.image_url || null,
      },
    }));
  };

  const handleMouseEnter = (productId) => {
    const selectedColorData = selectedColors[productId] || {
      image_url1: items.find((p) => p.product_id === productId)?.colors[0]
        ?.images[1]?.image_url,
    };
    setHoveredImages((prev) => ({
      ...prev,
      [productId]: selectedColorData.image_url1,
    }));
  };

  const handleMouseLeave = (productId) => {
    setHoveredImages((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  return (
    <div>
      {/* filter name show */}
      {Object.values(filters).some((value) =>
        Array.isArray(value) ? value.length > 0 : value,
      ) && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Selected Filters:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(filters)
              .filter(([key, value]) =>
                Array.isArray(value) ? value.length > 0 : value,
              )
              .map(([key, value]) => (
                <span
                  key={key}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm"
                >
                  {key.replace(/_/g, " ")}:{" "}
                  {Array.isArray(value) ? value.join(", ") : value}
                </span>
              ))}
          </div>
        </div>
      )}

      <div id="productGrid" className={`mt-5 mb-10 product-grid`}>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <RiseLoader color="#3A4831" />
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-6 items-start
    ${activeView === 3 ? "md:grid-cols-3 lg:grid-cols-3 view-3" : ""}
    ${activeView === 4 ? "md:grid-cols-4 lg:grid-cols-4 view-4" : ""}
    ${activeView === 6 ? "md:grid-cols-6 lg:grid-cols-6 view-6" : ""}
  `}
          >
            {items.length === 0 ? (
              <span className="flex text-center justify-center items-center">
                No Data Available
              </span>
            ) : (
              items.map((product) => {
                const selectedColorData = selectedColors[
                  product.product_id
                ] || {
                  color_name: product.colors[0]?.color_name,
                  image_url: product.colors[0]?.images[0]?.image_url,
                  image_url1: product.colors[0]?.images[1]?.image_url,
                  image_url2: product.colors[0]?.images[2]?.image_url,
                };
                const key = `${product.product_id}-${selectedColorData.color_name}`;
                const isHovered = hoveredImages[product.product_id];
                const displayImage = isHovered
                  ? hoveredImages[product.product_id]
                  : selectedColorData.image_url;

                return (
                  <div
                    key={product.product_id}
                    className="bg-gradient-to-b from-white to-white border-2 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
                  >
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="flex justify-end w-full p-2"
                    >
                      <Heart
                        size={24}
                        className={`${
                          wishlists[key]
                            ? "fill-current text-red-700"
                            : "text-gray-400 cursor-pointer"
                        }`}
                      />
                    </button>

                    {displayImage && (
                      <div
                        className="h-[12rem] w-full flex items-center justify-center px-12 pt-0"
                        onMouseEnter={() =>
                          handleMouseEnter(product.product_id)
                        }
                        onMouseLeave={() =>
                          handleMouseLeave(product.product_id)
                        }
                        onClick={() => navi(`/product/${product.product_id}`)}
                      >
                        <img
                          src={displayImage}
                          loading="lazy"
                          alt={product.product_name}
                          className="h-full w-full object-cover transition-opacity hover:opacity-90 cursor-pointer"
                        />
                      </div>
                    )}

                    <div className="flex flex-col gap-3 text-center">
                      <div className="flex flex-col items-center text-gray-700">
                        <div className="flex gap-2">
                          {product.colors.map((color) => (
                            <div
                              key={color.color_id}
                              className={`h-3 w-8 rounded-sm cursor-pointer`}
                              style={{
                                background: color.color_code.includes(
                                  "linear-gradient",
                                )
                                  ? color.color_code
                                  : color.color_code,
                              }}
                              onClick={() =>
                                handleColorChange(
                                  product.product_id,
                                  color.color_name,
                                )
                              }
                            ></div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-around gap-4 text-sm py-5 px-5">
                        <div className="flex flex-col items-center text-gray-700">
                          <span className="font-semibold font-libre">
                            Category
                          </span>
                          <span className="text-gray-500">
                            {product.category_name}
                          </span>
                        </div>
                        <h2 className="font-bold text-xl text-gray-800 hover:text-indigo-600 transition-colors font-libre">
                          {product.product_name.slice(0, 6)}
                        </h2>
                        <div className="flex flex-col items-center text-gray-700">
                          <span className="font-semibold font-libre">
                            Material
                          </span>
                          <span className="text-gray-500">
                            {product.material_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
