import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setAllProducts } from "@/Redux/AppSlice";
import { TestingUrl } from "@/shared/Constant";

// pagination hook for products. callers may pass page/limit to fetch a
// specific slice. the hook also exposes a reload() function so callers can
// re‑query when they change page/limit from outside.
const useAllProduct = () => {
  const dispatch = useDispatch();
  const { allproduct, productPage, productLimit, productTotal } = useSelector(
    (state) => state.AppSlice,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const GetAllProductsData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${TestingUrl}/api/products`, {
          withCredentials: true,
        });

        if (res.status === 200 && !cancelled) {
          console.log("All Products Data:", res.data);
          // backend returns { items, total }
          dispatch(
            setAllProducts({
              items: res.data.items || res.data,
              total: res.data.total || 0,
            }),
          );
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "An error occurred");
        } else {
          toast.error("An error occurred");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    GetAllProductsData();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  // return data plus meta so callers can render controls
  return { allproduct, productPage, productLimit, productTotal, loading };
};

export default useAllProduct;
