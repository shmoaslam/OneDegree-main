import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setCollection } from "@/Redux/AppSlice";
import { TestingUrl } from "@/shared/Constant";

const useCollection = () => {
    const dispatch = useDispatch();
    const { collection } = useSelector((state) => state.AppSlice);

    useEffect(() => {
        if (collection.length > 0) return;
        const getCollection = async () => {
            try {
                const res = await axios.get(TestingUrl + "/api/collection", {
                    withCredentials: true,
                });

                if (res.status === 200) {

                    dispatch(setCollection(res.data));
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.message || "An error occurred");
                } else {
                    toast.error("An error occurred");
                }
            }
        };
        getCollection();
    }, [dispatch , collection]);
};

export default useCollection