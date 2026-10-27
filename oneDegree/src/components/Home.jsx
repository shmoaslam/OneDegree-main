import React, { useState, useEffect } from "react";
import { GoldiSlides, GoldiSlidesMobile, slides, slidesm, categories } from "../shared/Product";
import { Link, useNavigate } from "react-router-dom";
import InstagramPost from "./InstagramPost";
import Firstimage from "../assets/homeBanner/Firstimage.png";
import Secondimage from "../assets/homeBanner/Secondimage.png";
import ThirdDek from "../assets/catalogueDek.jpg"
import ThirdDekMob from "../assets/catalogueMob.jpg"
import Navbar from "@/shared/Navbar";
import Storelocator from "../assets/homeBanner/Storelocator.png";
import { useDispatch } from "react-redux";
import { setSearchHome } from "@/Redux/AppSlice";
import Footer from "@/shared/Footer";
import ExploreCollection from "./ExploreCollection";
import useAllProduct from "@/hooks/useAllProduct";


function Home() {
  useAllProduct()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newSliderIndex, setNewSliderIndex] = useState(0);


  const isDesktop = window.innerWidth >= 768;
  const activeSlides = isDesktop ? slides : slidesm;
  const activeGoldiSlides = isDesktop ? GoldiSlides : GoldiSlidesMobile;

  // category handle button
  const handleCategoryClick = (categoryTitle) => {
    dispatch(setSearchHome(categoryTitle));
    navigate(`/filter/${categoryTitle}`);
  };

  //  main banner
  useEffect(() => {
    if (activeSlides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activeSlides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [activeSlides.length]);

  // goldi banner
  useEffect(() => {
    if (activeGoldiSlides.length === 0) return;

    const interval = setInterval(() => {
      setNewSliderIndex((prevIndex) => (prevIndex + 1) % activeGoldiSlides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [activeGoldiSlides.length]);

  return (
    <div>
      <Navbar />

      {/* main banner */}
      <div className="max-w-[100%] h-[900px] w-full m-auto md:pb-5 relative group mt-[-65px] ">
        {activeSlides.length > 0 ? (
          <>
            <div
              className="w-full h-full hidden md:block bg-center bg-cover duration-500"
              style={{ backgroundImage: `url(${activeSlides[currentIndex]?.url || ""})` }}
            ></div>

            <div
              className="w-full h-full block md:hidden bg-center bg-cover duration-500"
              style={{ backgroundImage: `url(${activeSlides[currentIndex]?.url || ""})` }}
            ></div>
          </>
        ) : (
          <p className="text-center text-gray-500">No slides available</p>
        )}
      </div>

      {/*collection sec*/}
      <ExploreCollection />

      {/*  category */}
      <div className="flex justify-center items-center gap-8 md:gap-5 pt-10 md:pt-2  md:flex-row flex-col mb-5 mt-0 md:mt-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative group h-[650px] mx-5 md:mx-0  overflow-hidden rounded-lg shadow-lg cursor-pointer respo-category"
            onClick={() => handleCategoryClick(category.title)}
          >
            <img
              src={category.img}
              alt={category.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 "
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300"></div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 w-[7rem] text-start py-0 rounded-md shadow-md">
              <a>
                <p className="text-[#3A4831] text-md md:text-lg font-libre ml-1">
                  {category.title}
                </p>
              </a>
              <div className="absolute right-1  top-1/2 transform -translate-y-1/2 bg-black/40 w-10 h-4 rounded-md shadow"></div>
            </div>
          </div>
        ))}
      </div>

      {/* goldi slides */}
      <div className="max-w-[100%] h-[650px] md:h-[700px] w-full mb-5 mt-10 relative group  ">
        {activeGoldiSlides.length > 0 ? (
          <>
            <div
              className="w-full h-full hidden md:block bg-center bg-cover duration-500"
              style={{ backgroundImage: `url(${activeGoldiSlides[newSliderIndex]?.url || ""})` }}
            ></div>
            <div
              className="w-full h-full block md:hidden bg-center bg-cover duration-500"
              style={{ backgroundImage: `url(${activeGoldiSlides[newSliderIndex]?.url || ""})` }}
            ></div>
          </>
        ) : (
          <p className="text-center text-gray-500">No Goldi slides available</p>
        )}
      </div>



      {/* brand sec */}
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-5 pb-8 mt-10">
        {/* First Box */}
        <div
          className="relative h-96 md:h-[700px] rounded-lg shadow-md bg-center bg-cover group responsive-box"
          style={{
            backgroundImage: `url('${Firstimage}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-300">
            {/* <h3 className="text-white text-xl font-bold mb-4 font-libre">Explore The Look</h3> */}
            <Link to={"/product"}>
              <div className="absolute  left-1/2 transform -translate-x-1/2 bg-white/80 w-[8rem] text-start py-0 px-1 rounded-md  shadow-md">
                <a>
                  <p className="text-[#3A4831] text-md md:text-lg  font-libre">
                    Products
                  </p>
                </a>
                <div className="absolute right-1  top-1/2 transform -translate-y-1/2 bg-black/40 w-10 h-4 rounded-md shadow"></div>
              </div>
            </Link>
          </div>
        </div>

        {/* Second and Third Boxes */}
        <div className="flex flex-col items-center gap-4">
          {/* Second Box */}
          <div
            className="relative h-64 md:h-[300px] rounded-lg shadow-md bg-center bg-cover group responsive-box"
            style={{
              backgroundImage: `url('${Secondimage}')`,
            }}
          >
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-300">
              <Link to={"/warranty"}>
                <div className="absolute  left-1/2 transform -translate-x-1/2 bg-white/80 w-[8rem] text-start py-0  px-1 rounded-md shadow-md">
                  <a>
                    <p className="text-[#3A4831] text-md md:text-lg font-libre">
                      Warranty
                    </p>
                  </a>
                  <div className="absolute right-1  top-1/2 transform -translate-y-1/2 bg-black/40 w-10 h-4 rounded-md shadow"></div>

                </div>
              </Link>
            </div>
          </div>

          {/* Third Box */}
          <div
            className="relative h-64 md:h-[380px] rounded-lg shadow-md bg-center bg-cover group responsive-box hidden md:flex"
            style={{
              backgroundImage: `url('${ThirdDek}')`,
            }}
          >

            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-300">
              {/* <h3 className="text-white text-xl font-bold mb-4 font-libre">Click To Know More</h3> */}
              <Link to={`/collections/19`}>
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-white/80 w-[13rem] text-start py-1 px-1 rounded-md shadow-md">
                  <p className="text-[#3A4831] text-lg font-libre leading-5">
                    Download Catalogue
                  </p>
                  <div className="absolute right-1  top-1/2 transform -translate-y-1/2 bg-black/40 w-10 h-4 rounded-md shadow"></div>

                </div>
              </Link>

            </div>
          </div>



          {/*  mobile device */}
          <div
            className="relative h-64 md:h-[380px] rounded-lg shadow-md bg-center bg-cover group responsive-box flex  md:hidden "
            style={{
              backgroundImage: `url('${ThirdDekMob}')`,
            }}
          >

            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-white text-xl font-bold mb-4 font-libre">Click To Know More</h3>
              <Link to={`/collections/19`}>
                 <div className="absolute left-1/2 transform -translate-x-1/2 bg-white/80 w-[13rem] text-start py-1 px-1 rounded-md shadow-md">
                  <p className="text-[#3A4831] text-md font-libre leading-5">
                    Download Catalogue
                  </p>
                  <div className="absolute right-1  top-1/2 transform -translate-y-1/2 bg-black/40 w-10 h-4 rounded-md shadow"></div>

                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>



      {/* insta api */}
      <InstagramPost />

      {/* store loc */}
      <div
        className="relative w-full mb-5 h-[617px] md:h-[700px] rounded-lg shadow-md bg-center bg-cover group mt-2 md:mt-6"
        style={{ backgroundImage: `url('${Storelocator}')` }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end items-center pb-28 opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-300">
          <Link to={"/store"}>
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-white/80 w-[10rem] text-start py-0 px-1 rounded-md shadow-md">
              <p className="text-[#3A4831] text-md md:text-lg font-libre ">
                Store Locator
              </p>
              <div className="absolute right-1  top-1/2 transform -translate-y-1/2 bg-black/40 w-10 h-4 rounded-md shadow"></div>

            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </div >
  );
}

export default Home;
