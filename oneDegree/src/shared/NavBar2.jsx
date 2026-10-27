import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHeart,
  FaSearch,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchHome } from "@/Redux/AppSlice";

const NavBar2 = () => {
  const navi = useNavigate()
  const dispatch = useDispatch();
  const [header, setHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.length === 0) {
      navi("/product")
    } else {
      dispatch(setSearchHome(searchQuery));
      navi(`/filter/${searchQuery}`);
      // navi("/filterss")
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
        className={`${header || window.innerWidth < 768
          ? "fixed w-full bg-white text-black shadow-lg z-50 "
          : "bg-white text-[#3A4831] shadow-lg"
          } transition-all duration-500 ease-in-out font-libre`}
        style={{ top: 0, left: 0, right: 0 }}
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
                    : header // Desktop scroll behavior logo
                      ? "https://dev.thestarterlabs.com/one-degree-1/assets/images/demos/demo-6/Logo.png"
                      : "https://dev.thestarterlabs.com/one-degree-1/assets/images/demos/demo-6/Logo.png"
                }
                alt="Logo"
                className={`${window.innerWidth < 768
                  ? "h-36" // Apply logo size for mobile
                  : header
                    ? "h-36" // on Scroll logo size on desktop
                    : "h-36" // default logo size on desktop
                  } transition-transform duration-500`}
              />
            </Link>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex items-center space-x-8 uppercase">
            <Link
              to="/"
              className={`${header ? "text-[#3A4831]" : "text-[#3A4831] "
                } hover:text-gray-400 transition  font-bold font-libre`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${header ? "text-[#3A4831]" : "text-[#3A4831] "
                } hover:text-gray-400 transition  font-bold font-libre`}
            >
              About
            </Link>
            <Link
              to="/product"
              className={`${header ? "text-[#3A4831]" : "text-[#3A4831] "
                } hover:text-gray-400 transition  font-bold font-libre`}
            >
              Products
            </Link>

            <Link
              to="/store"
              className={`${header ? "text-[#3A4831]" : "text-[#3A4831] "
                } hover:text-gray-400 transition font-bold font-libre`}
            >
              Store
            </Link>
          </div>

          {/* Search Field and Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className={`flex items-center ${header ? "border-black" : "border-black"}`}>
              <input
                type="search"
                placeholder="Search..."
                autoCorrect="off"
                autoCapitalize="none"
                className={`outline-none bg-transparent text-sm border ${header ? "text-black border-black" : "text-[#3A4831] font-semibold border-black"} rounded-full px-3 py-1 w-full`}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <FaSearch
                className={`ml-2 ${header ? "text-black" : "text-[#3A4831] font-semibold"} text-xl transition cursor-pointer`}
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
                className={`${header ? "text-[#3A4831]" : "text-[#3A4831] "
                  } hover:text-gray-400 transition  font-bold font-libre `}
              >
                WARRANTY
              </Link>
              {/* <Link to={"/login"}>
                {" "}
                <p className="uppercase font-semibold text-[#3A4831]">Login</p>
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
                <FaSearch className="ml-2 text-gray-500 cursor-pointer" onClick={handleSearch} />
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

export default NavBar2;