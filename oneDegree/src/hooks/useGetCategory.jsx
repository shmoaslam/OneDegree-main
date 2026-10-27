import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setCategory } from "@/Redux/AppSlice";
import { TestingUrl } from "@/shared/Constant";

const useGetCategory = () => {
    const dispatch = useDispatch();

    const { category } = useSelector((state) => state.AppSlice);

    useEffect(() => {
        if (category.length > 0) return;

        const GetCategorys = async () => {
            try {
                const res = await axios.get(TestingUrl + "/api/categories", {
                    withCredentials: true,
                });
            
                if (res.status === 200) {
                    dispatch(setCategory(res.data));
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.message || "An error occurred");
                } else {
                    toast.error("An error occurred");
                }
            }
        };
        GetCategorys();
    }, [dispatch , category]);
};

export default useGetCategory