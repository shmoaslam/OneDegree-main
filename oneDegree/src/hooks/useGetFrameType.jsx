import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setFrameType } from "@/Redux/AppSlice";
import { TestingUrl } from "@/shared/Constant";

const useGetFrameType = () => {
    const dispatch = useDispatch();
    const { FrameType } = useSelector((state) => state.AppSlice);
    useEffect(() => {
        if (FrameType.length > 0) return;

        const GetFrameType = async () => {
            try {
                const res = await axios.get(TestingUrl + "/api/frametype", {
                    withCredentials: true,
                });

                if (res.status === 200) {
                    dispatch(setFrameType(res.data));
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.message || "An error occurred");
                } else {
                    toast.error("An error occurred");
                }
            }
        };
        GetFrameType();
    }, [dispatch , FrameType]);
};

export default useGetFrameType