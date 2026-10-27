import { TestingUrl } from '@/shared/Constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAllProduct from '@/hooks/useAllProduct';
import { useSelector } from 'react-redux';
import { Heart } from "lucide-react";
import { RiseLoader } from "react-spinners";


const ExploreCollectionPage = () => {
  useAllProduct();
  const navi = useNavigate();
  const { allproduct } = useSelector((state) => state.AppSlice);
  const [loading, setLoading] = useState(true);
  const [collectionData, setCollectionData] = useState([]);
  const [collectionFilterData, setCollectionFilterData] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [wishlists, setWishlists] = useState({});
  const [hoveredImages, setHoveredImages] = useState({});

  const param = useParams();
  const ID = param.id;

  const getData = async () => {
    try {
      const res = await axios.get(`${TestingUrl}/api/collection/${ID}`);
      if (res.status === 200) {
        setCollectionData(res.data);
      }
    } catch (error) {
      toast.error(
        axios.isAxiosError(error) && error.response
          ? error.response.data.message
          : "An error occurred"
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const simulateLoading = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(simulateLoading);
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

  useEffect(() => {
    if (allproduct) {
      const filteredData = allproduct.filter(
        (data) => collectionData.collection_name === data.collection_name
      );
      setCollectionFilterData(filteredData);
    }
  }, [collectionData, allproduct]);

  const handleMouseEnter = (productId) => {
    const selectedColorData = selectedColors[productId] || {
      image_url1: collectionFilterData
        .find((p) => p.product_id === productId)
        ?.colors[0]?.images[1]?.image_url,
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
          item.selected_color.color_id !== selectedColorData.color_id
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
    const colorDetails = collectionFilterData
      .find((product) => product.product_id === productId)
      ?.colors.find((c) => c.color_name === color);

    if (colorDetails) {
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
    }
  };

  return (
    <div>
      {/* banner */}
      <div>
        {loading ? (
          <div className="flex justify-center items-center w-full bg-gray-100">
            <RiseLoader color="#3A4831" />
          </div>
        ) : (
          <img
            src={collectionData.collection_image || "https://res.cloudinary.com/dp3myexav/image/upload/v1741251022/warrantyBanner_opdmha.png"}
            alt="Collection Banner"
            className="w-full h-auto mt-[3.2rem] md:mt-0"
          />
        )}
      </div>

      {/* card des */}
      <div className="md:mx-28 md:my-10 pb-40">
        <h1 className="text-2xl font-bold mx-3 my-4">
          <span className='text-[#394731]'>Collection Name :</span> {collectionData.collection_name}
        </h1>
       
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <RiseLoader color="#3A4831" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6 items-start p-6 md:p-0">
            {collectionFilterData.length === 0 ? (
              <span className="text-center">No Data available</span>
            ) : (
              collectionFilterData.map((product) => {
                const selectedColorData = selectedColors[product.product_id] || {
                  color_name: product.colors[0]?.color_name,
                  image_url: product.colors[0]?.images[0]?.image_url,
                  image_url1: product.colors[0]?.images[1]?.image_url,
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
                        className={`${wishlists[key] ? "fill-current text-red-500" : "text-gray-400 cursor-pointer"}`}
                      />
                    </button>

                    {displayImage && (
                      <div
                        className="h-[12rem] w-full flex items-center justify-center px-12 pt-0"
                        onMouseEnter={() => handleMouseEnter(product.product_id)}
                        onMouseLeave={() => handleMouseLeave(product.product_id)}
                        onClick={() => navi(`/product/${product.product_id}`)}
                      >
                        <img
                          src={displayImage}
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
                              style={{ backgroundColor: color.color_code }}
                              onClick={() => handleColorChange(product.product_id, color.color_name)}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-around gap-4 text-sm py-5 px-5">
                        <div className="flex flex-col items-center text-gray-700">
                          <span className="font-semibold">Category</span>
                          <span className="text-gray-500">
                            {product.category_name}
                          </span>
                        </div>
                        <h2 className="font-bold text-xl text-gray-800 hover:text-indigo-600 transition-colors">
                          {product.product_name.slice(0, 6)}
                        </h2>
                        <div className="flex flex-col items-center text-gray-700">
                          <span className="font-semibold">Material</span>
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

export default ExploreCollectionPage;