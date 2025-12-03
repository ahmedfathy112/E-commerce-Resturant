import React, { useState } from "react";
import ShopHeroSection from "../components/HeroForSections";
import { Link } from "react-router-dom";
import CategoryImage from "../assets/Images/ShopCategory.jpg";
import { MdAdd, MdRemove } from "react-icons/md";

const EmptyCartMessage = () => {
  return (
    <div className="flex flex-col justify-center items-center align-middle !mt-20">
      <h2 className="font-bold text-white text-[64px]">
        Your cart is currently empty.
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

const CartCard = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="w-full flex flex-row !mt-10 max-md:flex-col gap-6">
      {/* left section */}
      <div className="w-1/2 flex flex-col max-md:w-full">
        <h2 className="text-[36px] font-semibold text-white !mx-3 !my-2.5">
          3 Items In Cart
        </h2>
        {/* card cart */}
        <div className="w-full flex flex-row gap-4 !mt-6 bg-[#0000007e] !p-4 rounded-lg">
          {/* image section */}
          <img src={CategoryImage} className="w-40 h-[110px]" />
          <div className="flex flex-col w-full">
            <h2 className="text-white text-[20px] !my-2.5 font-medium">
              Pork Chop with Apple Chutney
            </h2>
            <span className="text-red-500 text-[18px] font-semibold !mb-2.5">
              150$
            </span>
            <div className="w-full flex flex-row justify-between">
              {/* additions */}
              <div className="flex flex-row">
                <span className="text-[15px] font-medium text-white !mr-3.5">
                  4 Pieces
                </span>
                <span className="text-[15px] font-medium text-white">
                  Spicy Sauce
                </span>
              </div>
              {/* Quantity Counter */}
              <div className="flex items-center gap-2 bg-transparent rounded-lg !p-2 !my-auto">
                {/* decrement btn */}
                <button
                  onClick={handleDecrement}
                  className="text-white border-2 p-1 rounded transition cursor-pointer"
                >
                  <MdRemove size={20} />
                </button>
                <span className="text-white font-semibold text-[18px] min-w-[30px] text-center">
                  {quantity}
                </span>
                {/* increment btn */}
                <button
                  onClick={handleIncrement}
                  className="text-white border-2 p-1 rounded transition cursor-pointer"
                >
                  <MdAdd size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* right section */}
      <div className="w-1/2 flex justify-end max-md:w-full max-md:justify-center max-md:!my-6">
        <div className="w-[400px] h-auto border-2 border-white !px-7 !py-6 bg-[#00000092] rounded-3xl">
          {/* cart invoices */}
          <div className="flex flex-col text-left border-b-2 border-white !pb-6">
            <div className="w-full flex justify-between">
              <h2 className="text-[20px] text-white font-medium">Total</h2>
              <span className="text-[20px] text-red-500 font-semibold">
                450$
              </span>
            </div>
            <div className="w-full flex justify-between !mt-2.5">
              <h2 className="text-[20px] text-white font-medium">Shippeng</h2>
              <span className="text-[20px] text-red-500 font-semibold">
                Free
              </span>
            </div>
          </div>
          <button className="!px-6 !py-5 text-white text-[20px] text-center font-medium bg-red-500 border border-white !mt-5 rounded-3xl w-full cursor-pointer hover:bg-red-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
const Cart = () => {
  return (
    <div className="w-full">
      <ShopHeroSection SecondLink={"cart"} />
      {/* <EmptyCartMessage /> */}
      <CartCard />
    </div>
  );
};

export default Cart;
