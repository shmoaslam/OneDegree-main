import React, { useState } from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import { Loader2, MailIcon, PhoneCallIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TestingUrl } from "./Constant";
import toast from "react-hot-toast";

const Footer = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await axios.post(TestingUrl + "/api/newsletter", data);
      if (res.status === 200) {
        setLoading(false)
        reset()
        toast.success(res.data.message);
        window.scrollTo(0,0);
      }
    } catch (error) {
      setLoading(false)
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="bg-[#3A4831] text-white py-10 md:py-14 px-6 md:px-28">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

        <div className="flex flex-col items-center justify-center">
          <img src={logo} alt="One Degree Logo" className=" h-12 md:h-16 w-auto " />
        </div>


        <div className="flex flex-col items-center md:items-cemter">
          <h1 className="font-bold text-lg mb-4 font-libre uppercase">Explore</h1>
          <Link to="/about" className="block hover:text-gray-300 md:mr-3.5">About Us</Link>
          <Link to="/product" className="block hover:text-gray-300 md:mr-3.5"> Products</Link>
          <Link to="/warranty" className="block hover:text-gray-300 md:mr-3.5">Warranty</Link>
          <Link to="/store" className="block hover:text-gray-300 md:mr-4">Store</Link>
        </div>


        <form className="flex flex-col items-center md:items-center w-full" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-bold text-lg mb-4 font-libre uppercase">Newsletter</h1>
          <input
            type="email"
            className="bg-transparent border border-white rounded-lg px-4 py-2 mb-3 text-sm placeholder-white focus:ring-2 focus:ring-white outline-none w-full max-w-sm"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />


          {loading ? (
            <button
              disabled
              className="bg-white text-green-900 px-5 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition w-full max-w-sm disabled:opacity-50"
            >
              <Loader2 className="animate-spin w-5 h-5" />
              Please wait
            </button>
          ) : (
            <button className="bg-white text-green-900 px-5 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition w-full max-w-sm">
              Subscribe
            </button>
          )}


        </form>


        <div className="flex flex-col items-center md:items-center">
          <h1 className="font-bold text-lg mb-4 font-libre uppercase">Contact Us</h1>
          <div className="flex space-x-4 mb-3">
            <a href="mailto:info@optimedcorp.com" className="text-white text-2xl hover:text-gray-300 transition">
              <MailIcon size={24} />
            </a>
            <a href="tel:+912222851445" className="text-white text-2xl hover:text-gray-300 transition">
              <PhoneCallIcon size={24} />
            </a>
            <a
              href="https://www.instagram.com/onedegreeeyewear/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-gray-300 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61570433759663"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-gray-300 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>


      <hr className="mt-10 border-gray-500" />
      <p className="text-center text-sm font-light mt-5">
        Copyright © 2024 One Degree. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
