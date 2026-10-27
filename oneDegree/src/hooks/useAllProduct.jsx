import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setAllProducts } from "@/Redux/AppSlice";
import { TestingUrl } from "@/shared/Constant";

const useAllProduct = () => {
  // debugger
  const dispatch = useDispatch();
  const { allproduct } = useSelector((state) => state.AppSlice);

  useEffect(() => {
    if (allproduct.length > 0) return;

    const GetAllProductsData = async () => {
      try {
        const res = await axios.get(`${TestingUrl}/api/products`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          console.log("All Products Data:", res.data);
          dispatch(setAllProducts(res.data));
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "An error occurred");
        } else {
          toast.error("An error occurred");
        }
      }
    };

    GetAllProductsData();
  }, [dispatch, allproduct]);
};

export default useAllProduct;
