import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHeart, FaSearch } from "react-icons/fa";
import { setSearchHome } from "@/Redux/AppSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const [header, setHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.length > 0) {
      dispatch(setSearchHome(searchQuery));
      navi(`/filter/${searchQuery}`);
    }
  };

  useEffect(() => {
    const scrollHeader = () => {
      if (window.innerWidth >= 768) {
        setHeader(window.scrollY >= 20);
      }
    };

    window.addEventListener("scroll", scrollHeader);
    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
  }, []);

  return (
    <div style={{ position: "relative", zIndex: 50 }}>
      <header
        className={`group fixed w-full z-50 transition-all duration-500 ease-in-out ${header || window.innerWidth < 768
            ? "bg-white text-[#3A4831] shadow-lg"
            : "bg-transparent text-white hover:bg-white hover:text-[#3A4831]"
          }`}
        style={{ top: 0, left: 0, right: 0 }}
        id="headerHome"
      >
        <div
          className={`flex justify-between items-center w-4/5 mx-auto h-[50px] md:h-auto transition-all duration-500 ease-in-out ${header ? "py-4" : "py-4"
            }`}
        >
          {/* Logo in Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">
              <img
                src={
                  window.innerWidth < 768 // Mobile version logo
                    ? "https://dev.thestarterlabs.com/one-degree-1/assets/images/demos/demo-6/Logo.png"
                    : header
                      ? "https://dev.thestarterlabs.com/one-degree-1/assets/images/demos/demo-6/Logo.png"
                      : "https://res.cloudinary.com/dp3myexav/image/upload/v1742554940/Logo2_ib9mhh.png"
                }
                alt="Logo"
                className={`h-36 transition-all duration-300 group-hover:opacity-0`}
              />
              {/* Hovered Logo */}
              <img
                src="https://dev.thestarterlabs.com/one-degree-1/assets/images/demos/demo-6/Logo.png"
                alt="Logo Hover"
                className={`h-36 transition-all duration-300 absolute top-0 left-0 opacity-0 group-hover:opacity-100`}
              />
            </Link>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex items-center space-x-8 uppercase">
            <Link
              to="/"
              className={`transition font-bold font-libre ${header ? "text-[#3A4831]" : "text-white group-hover:text-[#3A4831]"
                }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`transition font-bold font-libre ${header ? "text-[#3A4831]" : "text-white group-hover:text-[#3A4831]"
                }`}
            >
              About
            </Link>
            <Link
              to="/product"
              className={`transition font-bold font-libre ${header ? "text-[#3A4831]" : "text-white group-hover:text-[#3A4831]"
                }`}
            >
              Products
            </Link>

            <Link
              to="/store"
              className={`transition font-bold font-libre ${header ? "text-[#3A4831]" : "text-white group-hover:text-[#3A4831]"
                }`}
            >
              Store
            </Link>

            
          </div>

          {/* Search Field and Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <div
              className={`flex items-center ${header ? "text-[#3A4831]" : "text-white group-hover:text-[#3A4831]"
                }`}
            >

              <input
                type="text"
                placeholder="Search..."
                className={`outline-none bg-transparent text-sm border transition-all duration-300 
                  ${header
                    ? "text-[#3A4831] border-[#3A4831] hover:border-black hover:text-black"
                    : "text-white border-white group-hover:border-[#3A4831] group-hover:text-[#3A4831] hover:border-black hover:text-black"
                  } rounded-full px-3 py-1`}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <FaSearch
                className={`ml-2 ${header ? "text-[#3A4831]" : "text-white group-hover:text-[#3A4831]"
                  } transition cursor-pointer`}
                onClick={handleSearch}
              />
            </div>

            <div className="flex gap-5 justify-center items-center">
              <Link to="/wishlist">
                <FaHeart
                  className={`text-xl cursor-pointer ${header ? "text-red-700" : "text-red-700 font-semibold"
                    } hover:text-red-500 transition`}
                />
              </Link>

              <Link
                to="/warranty"
                className={`transition font-bold font-libre   uppercase${header ? "text-[#3A4831]" : "text-white group-hover:text-[#3A4831]"
                  }`}
              >
                WARRANTY
              </Link>
              {/* <Link to={"/login"}>
                <p
                  className={`uppercase font-semibold ${
                    header ? "text-[#3A4831]" : "text-white group-hover:text-[#3A4831]"
                  }`}
                >
                  Login
                </p>
              </Link> */}
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`md:hidden text-xl ${header ? "text-black" : "text-black"
              }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="bg-white fixed top-0 left-0 right-0 h-screen z-50 md:hidden p-6 w-[50%]">
            {/* Close Button */}
            <button
              className="text-2xl absolute top-4 right-6 text-black"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>

            <div className="flex items-center mt-16 space-x-6">
              <div className="flex items-center border rounded-full px-3 py-1 w-[95%]">
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none bg-transparent text-sm w-full"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch
                  className="ml-2 text-gray-500 cursor-pointer"
                  onClick={handleSearch}
                />
              </div>
            </div>

            <nav className="flex flex-col mt-8 space-y-6 text-lg uppercase">
              <Link
                to="/"
                className="text-[#3A4831] hover:text-gray-400 transition font-libre"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-[#3A4831] hover:text-gray-400 transition font-libre"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/product"
                className="text-[#3A4831] hover:text-gray-400 transition font-libre"
                onClick={() => setMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/warranty"
                className="text-[#3A4831] hover:text-gray-400 transition font-libre"
                onClick={() => setMenuOpen(false)}
              >
                Warranty
              </Link>
              <Link
                to="/store"
                className="text-[#3A4831] hover:text-gray-400 transition font-libre"
                onClick={() => setMenuOpen(false)}
              >
                Store
              </Link>
              <Link
                to="/wishlist"
                className="text-[#3A4831] hover:text-gray-400 transition font-libre"
                onClick={() => setMenuOpen(false)}
              >
                Wishlist
              </Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;