import React, { useState, useEffect } from "react";
import axios from "axios";
import Vector from "../assets/Vector.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TestingUrl } from "@/shared/Constant";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

const WishList = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm();

  const [wishlist, setWishlist] = useState([]);
  const [activeIndices, setActiveIndices] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const getWishlist = () => {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(storedWishlist);
    };
    getWishlist();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndices((prevIndices) => {
        const updatedIndices = { ...prevIndices };
        wishlist.forEach((item, index) => {
          if (Array.isArray(item.images) && item.images.length > 0) {
            updatedIndices[index] =
              ((updatedIndices[index] || 0) + 1) % item.images.length;
          } else {
            updatedIndices[index] = 0;
          }
        });
        return updatedIndices;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [wishlist]);



  //  email api here 
  const onSubmit = async (data) => {
    setloading(true)
    try {
      const response = await axios.post(TestingUrl + "/api/email", {
        data,
        wishlist: wishlist.map((item) => ({
          product_name: item.product_name,
          selected_color: item.selected_color,
          image: item.images[0],
        })),
      });

      if (response.status === 200) {
        setloading(false)
        toast.success(response.data.message);
        localStorage.removeItem("wishlist");
        setWishlist([]);
        setIsModalOpen(false);
      }

    } catch (error) {
      setloading(false)
      console.error("Error sending email:", error);
      toast.error("Failed to send wishlist.");
    }
  };

  const removeProduct = (productId, colorId) => {
    const updatedWishlist = wishlist.filter(
      (product) =>
        product.product_id !== productId ||
        product.selected_color.color_id !== colorId
    );
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className={`bg-[#F1F1F2] ${wishlist.length > 0 ? "pb-20" : "pb-80"} pt-2`}>
      <div className="flex-wrap mx-5 md:mx-40 md:pb-5 gap-5 justify-center pt-10 md:pt-0">
        {wishlist.length > 0 ? (
          wishlist.map((item, index) => (
            <div key={index} className="flex gap-5">
              <div className="relative border-black border h-[100%] w-[100%] md:w-[9rem] mt-5">
                <Carousel className="overflow-hidden relative">
                  <CarouselContent
                    className="flex transition-transform duration-500"
                    style={{
                      transform: `translateX(-${(activeIndices[index] || 0) * 100}%)`,
                    }}
                  >
                    {item.images?.map((image, idx) => (
                      <CarouselItem key={idx}>
                        <img
                          src={image}
                          alt={item.product_name}
                          className="w-fit h-fit"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>

              <div className="w-full md:w-auto text-start mt-10">
                <h1 className="text-[18px] md:text-[19px]"> Product ID : {item.product_name}</h1>

                <p className="md:text-[18px]">Material: {item.material_name}</p>
                <p className="md:text-[18px]">
                  Colour: {item.selected_color.color_name}
                </p>
              </div>

              <div
                className="md:ml-auto cursor-pointer mt-7"
                onClick={() =>
                  removeProduct(item.product_id, item.selected_color.color_id)
                }
              >
                <img
                  src={Vector}
                  alt="Remove"
                  className="md:h-[20px] md:w-[20px]"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-xl">
            Your wishlist is empty.
          </p>
        )}
      </div>

      {wishlist.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3A4831] hover:bg-[#283321] text-white font-bold py-2 px-6 rounded-md"
          >
            Send Enquiry
          </button>
        </div>
      )}

      {isModalOpen && (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg w-96 shadow-lg">
              <h2 className="text-lg font-bold mb-4 text-center">Enter Your Details</h2>

              <input
                type="text"
                placeholder="Enter your name"

                {...register("to_name", { required: true })}
                className="w-full p-2 border rounded-md mb-5"
              />

              <input
                type="email"
                placeholder="Enter your email"

                required
                {...register("to_email", { required: true })}
                className="w-full p-2 border rounded-md"
              />

              <input
                type="number"
                placeholder="Enter your Phone Number"
                maxLength={10}
                minLength={10}
                required

                {...register("to_number", { required: true })}
                className="w-full p-2 border rounded-md mt-5"
              />

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>

                {
                  <button

                    className={`px-4 py-2 rounded-md flex items-center justify-center transition duration-300 ${loading ? 'bg-[#3A4831] cursor-not-allowed' : 'bg-[#3A4831] hover:bg-[#283321]'} text-white`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      'Send'
                    )}
                  </button>
                }

              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default WishList;
