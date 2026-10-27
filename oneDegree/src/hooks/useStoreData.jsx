import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../constant";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setAllStore } from "@/Redux/AppSlice";

const useStoreData = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const GetAllStore = async () => {
            try {
                const res = await axios.get(BASE_URL + "/api/produscts", {
                    withCredentials: true,
                });
                if (res.status === 200) {
                    dispatch(setAllStore(res.data));
                }

            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.message || "An error occurred");
                } else {
                    toast.error("An error occurred");
                }
            }
        };
        GetAllStore();
    }, []);
};

export default useStoreData;