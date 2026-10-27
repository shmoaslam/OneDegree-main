import React, { useState, useMemo } from "react";
import productBanner from "../assets/ProductPageBanner.png";
import { IoFilter } from "react-icons/io5";
import MultiRangeSlider from "multi-range-slider-react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import useAllProduct from "@/hooks/useAllProduct";
import useGetMaterials from "@/hooks/useGetMaterials";
import { useSelector } from "react-redux";
import useCollection from "@/hooks/useCollection";
import useGetCategory from "@/hooks/useGetCategory";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useGetFinishing from "@/hooks/useGetFinishing";
import useGetFrameType from "@/hooks/useGetFrameType";
import useGetShape from "@/hooks/useGetShape";
import { productFilterColor } from "@/shared/Product";
import ProductCard from "@/ProductCard";
import { set } from "react-hook-form";

import menu3 from "../assets/menu.png";
import menu4 from "../assets/menu-2.png";
import menu6 from "../assets/menu-3.png";

const Product = () => {

  const {
    allproduct,
    productTotal,
    material,
    collection,
    category,
    finishing,
    FrameType,
    shape,
  } = useSelector((state) => state.AppSlice);

  // custom hook fetches data whenever page or limit changes and also
  // exposes meta through the store via selectors above
  const { loading } = useAllProduct();
  useGetMaterials();
  useCollection();
  useGetCategory();
  useGetFinishing();
  useGetFrameType();
  useGetShape();

  const views = [
    { id: 3, src: menu3 },
    { id: 4, src: menu4 },
    { id: 6, src: menu6 },
  ];
  const [activeView, setActiveView] = useState(3);
  // State for filters
  const [filters, setFilters] = useState({
    Gender: "",
    Material_Name: [],
    Color: "",
    Collection_Name: [],
    Finishing_Name: [],
    Frame_Type: [],
    Shape_Name: [],
    Size: [],
  });

  // memorize the  our filted products
  const filteredProducts = useMemo(() => {
    let filtered = allproduct || [];
    console.log("All Products:", allproduct);

    if (filters.Gender) {
      filtered = filtered.filter(
        (item) => item.category_name === filters.Gender,
      );
    }

    if (filters.Material_Name.length > 0) {
      filtered = filtered.filter((item) =>
        filters.Material_Name.includes(item.material_name),
      );
    }

    if (filters.Color) {
      filtered = filtered.filter((item) =>
        item.colors.some((color) => color.color_name.includes(filters.Color)),
      );
    }

    if (filters.Collection_Name.length > 0) {
      filtered = filtered.filter((item) =>
        filters.Collection_Name.includes(item.collection_name),
      );
    }

    if (filters.Finishing_Name.length > 0) {
      filtered = filtered.filter((item) =>
        filters.Finishing_Name.includes(item.finishing_name),
      );
    }

    if (filters.Frame_Type.length > 0) {
      filtered = filtered.filter((item) =>
        filters.Frame_Type.includes(item.frame_type_name),
      );
    }

    if (filters.Shape_Name.length > 0) {
      filtered = filtered.filter((item) =>
        filters.Shape_Name.includes(item.shape_name),
      );
    }

    if (filters.Size.length === 2) {
      filtered = filtered.filter(
        (item) => item.size >= filters.Size[0] && item.size <= filters.Size[1],
      );
    }

    return filtered;
  }, [allproduct, filters]);

  const handleSizeChange = (e) => {
    const { minValue, maxValue } = e;
    if (minValue !== 40 || maxValue !== 60) {
      setFilters((prev) => ({
        ...prev,
        Size: [minValue, maxValue],
      }));
    }
  };

  const handleGenderChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      Gender: e.target.value,
    }));
  };

  const handleMaterialChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      Material_Name: prev.Material_Name.includes(value)
        ? prev.Material_Name.filter((material) => material !== value)
        : [...prev.Material_Name, value],
    }));
  };

  const handleCollectionChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      Collection_Name: prev.Collection_Name.includes(value)
        ? prev.Collection_Name.filter((coll) => coll !== value)
        : [...prev.Collection_Name, value],
    }));
  };

  const handleFinishingChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      Finishing_Name: prev.Finishing_Name.includes(value)
        ? prev.Finishing_Name.filter((finish) => finish !== value)
        : [...prev.Finishing_Name, value],
    }));
  };

  const handleFrameTypeChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      Frame_Type: prev.Frame_Type.includes(value)
        ? prev.Frame_Type.filter((frame) => frame !== value)
        : [...prev.Frame_Type, value],
    }));
  };

  const handleShapeChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      Shape_Name: prev.Shape_Name.includes(value)
        ? prev.Shape_Name.filter((shape) => shape !== value)
        : [...prev.Shape_Name, value],
    }));
  };

  const handleColorChange = (color) => {
    setFilters((prev) => ({
      ...prev,
      Color: color,
    }));
  };

  const handleClear = () => {
    setFilters({
      Gender: "",
      Material_Name: [],
      Color: "",
      Collection_Name: [],
      Finishing_Name: [],
      Frame_Type: [],
      Shape_Name: [],
      Size: [],
    });
  };

  const handleViewChange = (viewType) => {
    console.log("View changed to:", viewType);
    setActiveView(viewType);
    // Add your logic here
  };

  return (
    <div>
      {/* main banner */}
      <div>
        <img
          src={productBanner}
          alt="About Us Banner"
          className="w-full md:h-[780px] object-contain md:object-cover mt-[3.2rem] md:mt-0"
        />
      </div>

      <div className="mx-5 md:mx-28 mt-5">
        <div className="flex justify-between items-center">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="view-switcher">
              {views.map((v) => (
                <img
                  key={v.id}
                  src={v.src}
                  className={`view-icon ${activeView === v.id ? "active" : ""}`}
                  onClick={() => handleViewChange(v.id)}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger className="flex items-center gap-2">
                <IoFilter size={24} aria-label="Filter" />
                <p className="text-base font-medium">Filter</p>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="overflow-y-auto max-h-screen"
              >
                <SheetHeader>
                  <SheetTitle className="text-center">Filter</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>

                <Accordion type="single" collapsible className="w-full">
                  {/* gender filter */}
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <h1 className="text-lg font-semibold mb-2">Gender</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center gap-4">
                        {category?.map((cat) => (
                          <label
                            key={cat.category_id}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="radio"
                              name="gender"
                              value={cat.category_name}
                              checked={filters.Gender === cat.category_name}
                              onChange={handleGenderChange}
                            />
                            {cat.category_name}
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <hr />

                  {/* material filter */}
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <h1 className="text-lg font-semibold mb-2">Material</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        {material?.map((mat) => (
                          <label
                            key={mat.material_id}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              value={mat.material_name}
                              checked={filters.Material_Name.includes(
                                mat.material_name,
                              )}
                              onChange={handleMaterialChange}
                            />
                            {mat.material_name}
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <hr />

                  {/* collections filter */}
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <h1 className="text-lg font-semibold mb-2">Collection</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        {collection?.map((coll) => (
                          <label
                            key={coll.collection_id}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              value={coll.collection_name}
                              checked={filters.Collection_Name.includes(
                                coll.collection_name,
                              )}
                              onChange={handleCollectionChange}
                            />
                            {coll.collection_name}
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <hr />

                  {/* finis filter */}
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      <h1 className="text-lg font-semibold mb-2">Finishing</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        {finishing?.map((finish) => (
                          <label
                            key={finish.finishing_id}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              value={finish.finishing_name}
                              checked={filters.Finishing_Name.includes(
                                finish.finishing_name,
                              )}
                              onChange={handleFinishingChange}
                            />
                            {finish.finishing_name}
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <hr />

                  {/* fremtype Filter */}
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      <h1 className="text-lg font-semibold mb-2">Frame Type</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-3 gap-4">
                        {FrameType?.map((frame) => (
                          <label
                            key={frame.frame_type_id}
                            className={`border p-2 rounded-lg flex flex-col items-center cursor-pointer ${
                              filters.Frame_Type.includes(frame.frame_type_name)
                                ? "border-black"
                                : "border-gray-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              value={frame.frame_type_name}
                              checked={filters.Frame_Type.includes(
                                frame.frame_type_name,
                              )}
                              onChange={handleFrameTypeChange}
                              className="hidden"
                            />
                            <img
                              src={frame.frame_type_img}
                              alt={frame.frame_type_name}
                              className="w-auto h-auto"
                            />
                            <span className="text-sm mt-1">
                              {frame.frame_type_name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <hr />

                  {/* shape filter */}
                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      <h1 className="text-lg font-semibold mb-2">Shape</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-3 gap-4">
                        {shape?.map((shp) => (
                          <label
                            key={shp.shape_id}
                            className={`border p-2 rounded-lg flex flex-col items-center cursor-pointer ${
                              filters.Shape_Name.includes(shp.shape_name)
                                ? "border-black"
                                : "border-gray-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              value={shp.shape_name}
                              checked={filters.Shape_Name.includes(
                                shp.shape_name,
                              )}
                              onChange={handleShapeChange}
                              className="hidden"
                            />
                            <img
                              src={shp.shape_img}
                              alt={shp.shape_name}
                              className="w-auto h-auto"
                            />
                            <span className="text-sm mt-1">
                              {shp.shape_name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <hr />

                  {/* colr filter */}
                  <AccordionItem value="item-7">
                    <AccordionTrigger>
                      <h1 className="text-lg font-semibold mb-2">Color</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-4 gap-3">
                        {productFilterColor?.map((color) => (
                          <label
                            key={color.color_id}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="color"
                              value={color.color_name}
                              checked={filters.Color === color.color_name}
                              onChange={() =>
                                handleColorChange(color.color_name)
                              }
                              className="hidden"
                            />
                            <div
                              className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                                filters.Color === color.color_name
                                  ? "border-black"
                                  : "border-gray-400"
                              }`}
                            >
                              {filters.Color === color.color_name && (
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                              )}
                            </div>
                            <span className="text-sm">{color.color_name}</span>
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* size baar */}
                <div className="mb-6">
                  <h1 className="text-lg font-semibold mb-2">Size Range</h1>
                  <MultiRangeSlider
                    min={40}
                    max={60}
                    step={1}
                    minValue={filters.Size.length === 2 ? filters.Size[0] : 40}
                    maxValue={filters.Size.length === 2 ? filters.Size[1] : 60}
                    ruler={false}
                    label={true}
                    barInnerColor="#3A4831"
                    value={filters.Size.length === 2 ? filters.Size : []}
                    onInput={handleSizeChange}
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span>{filters.Size[0]}</span>
                    <span>{filters.Size[1]}</span>
                  </div>
                </div>

                {/*  buttons here */}
                <div className="flex gap-5 justify-center items-center">
                  <SheetClose asChild>
                    <button
                      className="outline rounded-sm p-1 md:p-2  text-[#193606]"
                      onClick={() => setFilters(filters)}
                    >
                      Apply Filter
                    </button>
                  </SheetClose>
                  <SheetClose asChild>
                    <button
                      className="outline rounded-sm p-1 md:p-2  text-[#193606]"
                      onClick={handleClear}
                    >
                      Clear Filter
                    </button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* card */}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-4 border-t-[#394731] rounded-full animate-spin" />
          </div>
        ) : (
          <ProductCard
            items={filteredProducts}
            filters={filters}
            activeView={activeView}
          />
        )}

      </div>
    </div>
  );
};

export default Product;
