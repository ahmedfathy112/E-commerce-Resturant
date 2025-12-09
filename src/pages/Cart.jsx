import React, { useState } from "react";
import ShopHeroSection from "../components/HeroForSections";
import { Link } from "react-router-dom";
import CategoryImage from "../assets/Images/ShopCategory.jpg";
import { MdAdd, MdCancel, MdRemove } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementItem,
  decrementItem,
  removeItemFromCart,
} from "../reduxToolkit/slices/CartSlice";
import { FcCancel } from "react-icons/fc";

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
  const dispatch = useDispatch();

  // get cart from redux (support either 'cart' or 'Cart' reducer key)
  const cartState = useSelector((state) => state.cart || state.Cart || {});
  // items shape in slice = [{ product, quantity }] ; support older/localStorage fallback keys
  const reduxItems = cartState.items || cartState.cartItems || [];
  const localItems =
    JSON.parse(
      localStorage.getItem("cartItems_v1") ||
        localStorage.getItem("cartItems") ||
        "[]"
    ) || [];
  const CartItemsParsed = reduxItems.length ? reduxItems : localItems;

  // compute totals
  const totalPrice =
    cartState.totalPrice ??
    CartItemsParsed.reduce((s, it) => {
      const prod = it.product ?? it;
      const qty = it.quantity ?? 1;
      return s + Number(prod.price ?? 0) * qty;
    }, 0);

  if (!CartItemsParsed || CartItemsParsed.length === 0) {
    return <EmptyCartMessage />;
  }

  return (
    <div className="w-full flex flex-row !my-10 max-md:flex-col gap-6">
      {/* left section */}
      <div className="w-1/2 flex flex-col max-md:w-full">
        {/* Quantity of cart */}
        <h2 className="text-[36px] font-semibold text-white !mx-3 !my-2.5">
          {CartItemsParsed.length} Items In Cart
        </h2>
        {/* card cart */}
        {CartItemsParsed.map((item) => {
          const product = item.product ?? item;
          const qty = item.quantity ?? 1;
          const productId = product.id ?? product.product?.id;

          return (
            <div
              key={productId}
              className="w-full relative flex flex-row gap-4 !mt-6 bg-[#0000007e] !p-4 rounded-lg"
            >
              {/* image section */}
              <img
                src={product.image || CategoryImage}
                className="w-40 h-[110px]"
              />
              <div className=" flex flex-col w-full">
                <h2 className="text-white text-[20px] !my-2.5 font-medium">
                  {product.name}
                </h2>
                <span className="text-red-500 text-[18px] font-semibold !mb-2.5">
                  {product.price}$
                </span>
                <div className="w-full flex flex-row justify-between items-center">
                  {/* additions */}
                  <div className="flex flex-row">
                    <span className="text-[15px] font-medium text-white !mr-3.5">
                      {product.pieces} Pieces
                    </span>
                    <span className="text-[15px] font-medium text-white">
                      {product.type}
                    </span>
                  </div>
                  {/* Quantity Counter */}
                  <div className="flex items-center gap-2 bg-transparent rounded-lg !p-2 !my-auto">
                    {/* decrement btn */}
                    <button
                      onClick={() => dispatch(decrementItem(productId))}
                      className="text-white border-2 p-1 rounded transition cursor-pointer"
                    >
                      <MdRemove size={20} />
                    </button>

                    <span className="text-white font-semibold text-[18px] min-w-[30px] text-center">
                      {qty}
                    </span>

                    {/* increment btn */}
                    <button
                      onClick={() => dispatch(incrementItem(productId))}
                      className="text-white border-2 p-1 rounded transition cursor-pointer"
                    >
                      <MdAdd size={20} />
                    </button>
                  </div>
                  {/* optional remove */}
                </div>
              </div>
              <h2
                className="absolute right-4 top-0 "
                onClick={() => dispatch(removeItemFromCart(productId))}
                className="text-red-500 ml-3 text-sm"
              >
                <MdCancel size={32} className="cursor-pointer z-10" />
              </h2>
            </div>
          );
        })}
      </div>
      {/* right section */}
      <div className="w-1/2 h-[300px] flex justify-end max-md:w-full max-md:justify-center max-md:!my-6">
        <div className="w-[400px] h-auto border-2 border-white !px-7 !py-6 bg-[#00000092] rounded-3xl">
          {/* cart invoices */}
          <div className="flex flex-col text-left border-b-2 border-white !pb-6">
            <div className="w-full flex justify-between">
              <h2 className="text-[20px] text-white font-medium">Total</h2>
              <span className="text-[20px] text-red-500 font-semibold">
                {totalPrice}$
              </span>
            </div>
            <div className="w-full flex justify-between !mt-2.5">
              <h2 className="text-[20px] text-white font-medium">Shipping</h2>
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
