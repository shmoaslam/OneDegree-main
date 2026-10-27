import signupImg from "../assets/signup.png";
import Logo from "../assets/Logo.png";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TestingUrl } from "./Constant";
import toast from "react-hot-toast";

const Signup = () => {
  const navi = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(TestingUrl + "/api/auth/register", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        reset();
        navi("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
    reset();
  };
  return (
    <div className="bg-[#394731] text-white overflow-hidden">
      <div className="flex justify-center items-center h-screen">
        {/* Left Section: 30% */}
        <div className="w-[40%] hidden lg:block">
          <img
            src={signupImg}
            alt="Placeholder Image"
            className="object-cover h-screen w-full"
          />
        </div>

        {/* Right Section: 60% */}
        <div className="lg:p-48 md:p-52 sm:20 w-full p-5  md:w-[60%] text-center">
          <Link to={"/"}>
            {" "}
            <p className="text-[#ffffffde] text-end hover:underline">skip</p>
          </Link>

          <div className="flex justify-center mb-10">
            <img src={Logo} alt="" className="w-[180px]" />
          </div>
          <h1 className="text-2xl font-semibold mb-4">Signup</h1>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full border border-gray-300  bg-transparent  placeholder:text-white rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                {...register("username", { required: true })}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="E-mail"
                className="w-full border border-gray-300  bg-transparent placeholder:text-white rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                {...register("email", { required: true })}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 bg-transparent placeholder:text-white rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                {...register("password", { required: true })}
              />
            </div>

            {/* <div className="mb-6 text-blue-500">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div> */}
            <button
              type="submit"
              className=" bg-transparent  font-semibold  border rounded-md py-1 px-4 w-24 focus:outline-none focus:border-blue-500"
            >
              Signup
            </button>
          </form>

          <div className="flex justify-between mt-5">
            <div>
              <h2 className="mb-5">Signup with</h2>
              <div className="flex gap-5 md:gap-10 ">
                <FaGoogle size={22} />
                <FaFacebookF size={22} />
                <FaApple size={22} />
              </div>
            </div>

            <div>
              <h2 className="mb-2">Already a member?</h2>
              <Link to={"/login"}>
                <button
                  type="submit"
                  className=" bg-transparent  font-semibold  border rounded-md py-1 px-2 w-24 focus:outline-none focus:border-blue-500"
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
