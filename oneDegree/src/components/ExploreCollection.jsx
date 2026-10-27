import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useCollection from "@/hooks/useCollection";
import { collectionImageMobile, collectionImagesDekstop } from "@/shared/Product";

const ExploreCollection = () => {
    useCollection();
    const navigate = useNavigate();
    const [collectionData, setCollectionData] = useState([]);
    const { collection } = useSelector((state) => state.AppSlice);

    useEffect(() => {
        if (collection) {
            setCollectionData(collection);
        }
    }, [collection]);

    const handleNavigate = (e) => {
        navigate(`/collections/${e.collection_id}`);
    };

    return (
        <div className="px-4">
            <h1 className="text-center mt-5 md:mt-0 text-[24px] md:text-[30px] text-[#3A4831] font-libre">
                Explore our Collections
            </h1>

            <div className="w-full mx-auto mt-5 md:my-5 relative">
                <Carousel className="relative">
                    <CarouselContent>
                        {collectionData.map((collc, index) => {
                            const desktopImage = collectionImagesDekstop[index]?.url || "";
                            const mobileImage = collectionImageMobile[index]?.url || "";

                            return (
                                <CarouselItem key={collc.collection_id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                                    <Card
                                        className="relative shadow-lg rounded-lg overflow-hidden cursor-pointer group w-fit"
                                        onClick={() => handleNavigate(collc)}
                                    >
                                        <img
                                            src={mobileImage}
                                            alt={collc.collection_name}
                                            className="block md:hidden w-auto h-auto max-w-full max-h-full object-cover brightness-50 md:brightness-100 transition-all duration-300"
                                        />
                                        <div className="relative group">
                                            <img
                                                src={desktopImage}
                                                alt={collc.collection_name}
                                                className="hidden md:block w-auto h-auto max-w-full max-h-full object-cover transition-all duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-[0.8] transition-opacity duration-300"></div>
                                        </div>


                                        <CardContent className="absolute inset-0 flex flex-col justify-start items-center text-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white p-4 md:p-6 pt-6 md:pt-24">

                                            <h2 className="text-lg md:text-xl font-semibold mb-2 ">
                                                <span className="text-[24px] md:text-[30px] font-libre">
                                                    {collc.collection_name}
                                                </span>
                                            </h2>
                                            <p className="text-[16px] md:text-[22px] mb-4 mt-2 md:mt-5 font-light leading-snug">
                                                {collc.collection_desc}
                                            </p>
                                            {/* <button className="text-[16px] md:text-[18px] mt-2 w-[10rem] text-center leading-5 py-1 rounded-md bg-white/90 text-[#3A4831]  hover:bg-gray-200 transition-all font-libre">
                                                Explore Collection
                                            </button> */}



                                            {/*  div button */}
                                            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-white/80 w-[12rem] text-start py-0 rounded-md shadow-md">
                                                <a>
                                                    <p className="text-[#3A4831] text-md md:text-lg font-libre ml-1">
                                                        Explore Collection
                                                    </p>
                                                </a>
                                                <div className="absolute right-1  top-1/2 transform -translate-y-1/2 bg-black/40 w-10 h-4 rounded-md shadow"></div>
                                            </div>


                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-6 md:left-10 top-1/2 transform -translate-y-1/2 -translate-x-full w-8 md:w-12 h-8 md:h-12 text-lg md:text-2xl" />
                    <CarouselNext className="absolute right-6 md:right-10 top-1/2 transform -translate-y-1/2 translate-x-full w-8 md:w-12 h-8 md:h-12 text-lg md:text-2xl" />
                </Carousel>
            </div>
        </div>
    );
};

export default ExploreCollection;