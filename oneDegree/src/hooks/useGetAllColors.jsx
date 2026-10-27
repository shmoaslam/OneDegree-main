import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setcColors } from "@/Redux/AppSlice";
import { TestingUrl } from "@/shared/Constant";

const useGetAllColors = () => {
    const dispatch = useDispatch();
    const { colors } = useSelector((state) => state.AppSlice);

    useEffect(() => {
        if (colors.length > 0) return;
        const GetColors = async () => {
            try {
                const res = await axios.get(TestingUrl + "/api/colors", {
                    withCredentials: true,
                });

                if (res.status === 200) {
                    dispatch(setcColors(res.data));
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.message || "An error occurred");
                } else {
                    toast.error("An error occurred");
                }
            }
        };
        GetColors();
    }, [dispatch , colors]);
};

export default useGetAllColors