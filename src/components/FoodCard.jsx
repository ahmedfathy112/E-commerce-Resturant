import React from "react";
import burger from "../assets/Images/Burger.jpg";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../reduxToolkit/slices/CartSlice";
import { HiHeart } from "react-icons/hi";
import {
  addItemToWishList,
  removeItemFromWishList,
} from "../reduxToolkit/slices/WishListSlice";

const FoodCard = ({ product }) => {
  const dispatch = useDispatch();

  const wishlistItems =
    useSelector(
      (state) =>
        state.wishlist?.items || state.WishList?.items || state.wishlistItems
    ) || [];

  const isFavorited = Boolean(
    wishlistItems.find(
      (it) => String(it.product?.id ?? it.id) === String(product?.id)
    )
  );

  const handleHeartClick = (e) => {
    e.preventDefault();
    if (isFavorited) {
      dispatch(removeItemFromWishList(product.id ?? product));
      return;
    }

    try {
      dispatch(addItemToWishList({ product }));
    } catch {
      try {
        dispatch(addItemToWishList(product));
      } catch {
        // last fallback: dispatch nothing (slice likely missing from store)
      }
    }
  };

  return (
    <div className="foodCard w-[381px] relative h-[510px] flex flex-col rounded-2xl !p-3.5 bg-[#202020c4] max-md:w-auto max-md:h-auto">
      {product?.is_featured && (
        <div className="absolute w-24 h-[42px] rounded-[7px] -top-4 right-0 bg-red-600 font-semibold text-white text-center !py-2 !px-3">
          New
        </div>
      )}
      <h2
        onClick={handleHeartClick}
        aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        className={`absolute top-0 left-0 z-40 cursor-pointer rounded-full !p-3 transition-shadow focus:outline-none ${
          isFavorited ? "bg-red-500 text-white" : "bg-white text-black"
        }`}
      >
        <HiHeart size={28} />
      </h2>

      <Link to={`/shop/${product.id}`} className="flex flex-col">
        <div className="rounded-2xl">
          <img src={burger} className="rounded-2xl card-Image" />
        </div>
        {/* price div */}
        <div className="w-full flex justify-between !my-3 shadow-lg">
          <h3 className="text-red-500 text-[24px]">{product.price}$</h3>

          <p className="text-2xl flex flex-row text-white">
            3.5 <FaStar className="text-yellow-400 !ml-1 !my-auto" />
          </p>
        </div>
        {/* title */}
        <div className="text-center">
          <h4 className="text-white text-[22px] font-semibold">
            {product.name}
          </h4>
        </div>
        {/* additions */}
        <div className="flex flex-col !mt-4">
          <div className="flex flex-row gap-3">
            <FaCheckCircle className="text-2xl text-red-500" />
            <p className="text-[18px] font-semibold text-white">
              {product.pieces} Pieces
            </p>
          </div>
          <div className="flex flex-row gap-3 !mt-2">
            <FaCheckCircle className="text-2xl text-red-500" />
            <p className="text-[18px] font-semibold text-white">
              {product.type}
            </p>
          </div>
        </div>
      </Link>
      {/* add to cart button  */}
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(addItemToCart({ product }));
        }}
        className="bg-transparent w-full cursor-pointer border-2 text-[18px] !px-3 !py-2 rounded-full text-white font-semibold hover:bg-red-700 transition !my-6"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default FoodCard;
