import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { products } from "../shared/Product";

const SpecsSliderHome = () => {
  const handleSearch = (item) => {
    // console.log("Search triggered for:", item.name);
  };

  return (
    <div>
      <Carousel className="w-full max-w-6xl mx-auto my-4 mb-0 md:mb-10 px-4 ">
        <CarouselContent className="flex space-x-4">
          {products.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-full sm:basis-1/2 md:basis-1/3 flex justify-center items-center"
            >
              <Button
                variant="ghost"
                className="min-w-full h-auto sm:w-auto hover:text-black hover:bg-white flex flex-col items-center space-y-2"
                onClick={() => handleSearch(item)}
              >
                <img
                  src={
                    "https://res.cloudinary.com/dp3myexav/image/upload/v1737049534/frame_dd3ysn.png"
                  }
                  alt={item.name}
                  className="h-[190px] md:h-[200px] max-w-full"
                />
                <p className="text-center text-sm md:text-base font-medium">
                  {item.name}
                </p>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-5 md:left-[-60px] top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="absolute right-5 md:right-[-60px] top-1/2 transform -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default SpecsSliderHome;
