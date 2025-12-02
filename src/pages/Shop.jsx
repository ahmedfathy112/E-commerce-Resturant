import React from "react";
import { Link } from "react-router-dom";
import CategoryImage from "../assets/Images/ShopCategory.jpg";
import FoodCard from "../components/FoodCard";

const ShopHeroSection = () => {
  return (
    <div className="ShopHeroSec relative w-full h-[50dvh] flex flex-col justify-center align-middle items-center py-10 ">
      <div className="absolute inset-0 bg-[#0000009f]"></div>
      <h1 className="text-white text-4xl font-bold z-10">Shop</h1>
      <div className="flex flex-row gap-2 text-white text-[18px] font-medium mt-4 z-20">
        <Link to={"/"}>Home</Link>
        <span>/</span>
        <Link to={"/shop"}>Shop</Link>
      </div>
    </div>
  );
};

const ShopCategory = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center !my-10">
      <h2 className="text-3xl font-bold !mb-6 text-white">Shop by Category</h2>
      <div className="w-full flex flex-row justify-evenly gap-5 max-md:flex-wrap">
        {/* category card */}
        <div className="flex flex-col justify-center">
          {/* category image */}
          <div className="rounded-full border-4 border-white">
            <img
              src={CategoryImage}
              className="w-[180px] h-[180px] rounded-full"
            />
          </div>
          {/* category title */}
          <h2 className="text-white text-center !mt-4 text-[24px] font-medium">
            Vegitrian
          </h2>
        </div>
        <div className="flex flex-col justify-center">
          {/* category image */}
          <div className="rounded-full border-4 border-white">
            <img
              src={CategoryImage}
              className="w-[180px] h-[180px] rounded-full"
            />
          </div>
          {/* category title */}
          <h2 className="text-white text-center !mt-4 text-[24px] font-medium">
            Meal
          </h2>
        </div>
        <div className="flex flex-col justify-center">
          {/* category image */}
          <div className="rounded-full border-4 border-white">
            <img
              src={CategoryImage}
              className="w-[180px] h-[180px] rounded-full"
            />
          </div>
          {/* category title */}
          <h2 className="text-white text-center !mt-4 text-[24px] font-medium">
            Cheicken
          </h2>
        </div>
        <div className="flex flex-col justify-center">
          {/* category image */}
          <div className="rounded-full border-4 border-white">
            <img
              src={CategoryImage}
              className="w-[180px] h-[180px] rounded-full"
            />
          </div>
          {/* category title */}
          <h2 className="text-white text-center !mt-4 text-[24px] font-medium">
            Dubble
          </h2>
        </div>
      </div>
    </div>
  );
};

const ShopCards = () => {
  return (
    <div className="w-full flex justify-center flex-row flex-wrap gap-5">
      <FoodCard />
      <FoodCard />
      <FoodCard />
      <FoodCard />
      <FoodCard />
      <FoodCard />
      <FoodCard />
      <FoodCard />
    </div>
  );
};
const Shop = () => {
  return (
    <div>
      <ShopHeroSection />
      <ShopCategory />
      <ShopCards />
      Shop
    </div>
  );
};

export default Shop;
