import React from "react";
import CategoryImage from "../assets/Images/ShopCategory.jpg";
import FoodCard from "../components/FoodCard";
import ShopHeroSection from "../components/HeroForSections";

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
              className="w-[180px] h-[180px] rounded-full max-md:w-[150px] max-md:h-[150px]"
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
              className="w-[180px] h-[180px] rounded-full max-md:w-[150px] max-md:h-[150px]"
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
              className="w-[180px] h-[180px] rounded-full max-md:w-[150px] max-md:h-[150px]"
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
              className="w-[180px] h-[180px] rounded-full max-md:w-[150px] max-md:h-[150px]"
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
      <ShopHeroSection SecondLink={"shop"} />
      <ShopCategory />
      <ShopCards />
      Shop
    </div>
  );
};

export default Shop;
