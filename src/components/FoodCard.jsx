import React from "react";
import burger from "../assets/Images/Burger.jpg";
import { FaCheckCircle, FaStar } from "react-icons/fa";

const FoodCard = () => {
  return (
    <div className="w-[381px] h-[510px] flex flex-col rounded-2xl !p-3.5 bg-[#202020c4] max-md:w-auto max-md:h-auto">
      <div className="rounded-2xl">
        <img src={burger} className="rounded-2xl" />
      </div>
      {/* price dev */}
      <div className="w-full flex justify-between !my-3 shadow-lg">
        <h3 className="text-red-500 text-[24px]">150$</h3>

        <p className="text-2xl flex flex-row text-white">
          3.5 <FaStar className="text-yellow-400 !ml-1 !my-auto" />
        </p>
      </div>
      {/* title */}
      <div className="text-center">
        <h4 className="text-white text-[22px] font-semibold">
          Pork Chop with Apple Chutney
        </h4>
      </div>
      {/* additions */}
      <div className="flex flex-col items-start !mt-4 ">
        <div className="flex flex-row gap-3">
          <FaCheckCircle className="text-2xl text-red-500" />
          <p className="text-[18px] font-semibold text-white">4 Pieces</p>
        </div>
        <div className="flex flex-row gap-3 !mt-2">
          <FaCheckCircle className="text-2xl text-red-500" />
          <p className="text-[18px] font-semibold text-white">Spicy Sauce</p>
        </div>
      </div>
      {/* add to cart button  */}
      <button className="bg-transparent cursor-pointer border-2 text-[18px] !px-3 !py-2 rounded-full text-white font-semibold hover:bg-red-700 transition !my-6">
        Add to Cart
      </button>
    </div>
  );
};

export default FoodCard;
