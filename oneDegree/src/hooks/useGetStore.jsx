import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {  setStore } from "@/Redux/AppSlice";
import { TestingUrl } from "@/shared/Constant";

const useGetStore = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const GetStoreData = async () => {
            try {
                const res = await axios.get(TestingUrl + "/api/store", {
                    withCredentials: true,
                });

                if (res.status === 200) {
                    dispatch(setStore(res.data));
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.message || "An error occurred");
                } else {
                    toast.error("An error occurred");
                }
            }
        };
        GetStoreData();
    }, []);
};

export default useGetStore;