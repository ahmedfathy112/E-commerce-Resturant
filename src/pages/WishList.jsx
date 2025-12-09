import React from "react";
import ShopHeroSection from "../components/HeroForSections";
import { Link } from "react-router-dom";

import FoodCard from "../components/FoodCard";

const EmptyWishMessage = () => {
  return (
    <div className="flex flex-col justify-center items-center align-middle !mt-20">
      <h2 className="font-bold text-white text-[64px]">
        Your Wishlist is currently empty.
      </h2>
      <Link
        to={"/shop"}
        className=" !mt-8 !px-6 !py-3 bg-red-600 rounded-4xl text-white text-[24px] font-medium hover:bg-red-700 transition"
      >
        Return To Shop
      </Link>
    </div>
  );
};

const WishListCard = () => {
  const wishListItems = localStorage.getItem("wishListItems");
  const parsedItems = wishListItems ? JSON.parse(wishListItems) : [];

  console.log(parsedItems);
  if (parsedItems.length === 0) {
    <EmptyWishMessage />;
  }
  return (
    <div className="w-full flex justify-center flex-row flex-wrap max-md:flex-col gap-6 !mt-10 !pb-10">
      {parsedItems.map((item) => (
        <FoodCard key={item.id} product={item} />
      ))}
    </div>
  );
};

const WishList = () => {
  return (
    <div className="w-full">
      <ShopHeroSection SecondLink={"wishlist"} />
      {/* <EmptyWishMessage /> */}
      <WishListCard />
    </div>
  );
};

export default WishList;
