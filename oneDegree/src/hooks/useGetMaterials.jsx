import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setMaterial } from "@/Redux/AppSlice";
import { TestingUrl } from "@/shared/Constant";

const useGetMaterials = () => {
    const dispatch = useDispatch();
    const { material } = useSelector((state) => state.AppSlice);

    useEffect(() => {
        if (material.length > 0) return;
        const GetMaterials = async () => {
            try {
                const res = await axios.get(TestingUrl + "/api/materials", {
                    withCredentials: true,
                });

                if (res.status === 200) {
                    dispatch(setMaterial(res.data.materials));
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.message || "An error occurred");
                } else {
                    toast.error("An error occurred");
                }
            }
        };
        GetMaterials();
    }, [dispatch , material]);
};

export default useGetMaterials;