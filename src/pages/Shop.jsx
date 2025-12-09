import React, { use, useEffect, useRef, useState } from "react";
import CategoryImage from "../assets/Images/ShopCategory.jpg";
import FoodCard from "../components/FoodCard";
import ShopHeroSection from "../components/HeroForSections";
import { BiCheckCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import {
  GetAllProducts,
  GetProductsByCategory,
} from "../reduxToolkit/slices/GetAllProducts";
import { GetAllCategroies } from "../reduxToolkit/slices/GetAllProducts";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { GiCheckMark } from "react-icons/gi";

const ShopCategory = ({ activeCategory, setActiveCategory }) => {
  const { allCategorys } = useSelector((state) => state.Products || {});
  const dispatch = useDispatch();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    dispatch(GetAllCategroies());
  }, [dispatch]);

  // attach nav refs before swiper init
  const onBeforeInit = (swiper) => {
    swiper.params.navigation = swiper.params.navigation || {};
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
  };

  return (
    <div className="w-full flex flex-col justify-center items-center !my-10">
      {allCategorys && allCategorys.length > 0 && (
        <>
          <div className="w-full flex items-center justify-between max-w-6xl px-4">
            <h2 className="text-3xl font-bold !mb-6 text-white">
              Shop by Category
            </h2>

            {/* navigation buttons */}
            <div className=" flex gap-3">
              <button
                ref={prevRef}
                aria-label="Prev categories"
                className="bg-gray-800 text-white !p-2 rounded-full shadow-md hover:bg-gray-700"
              >
                <MdNavigateBefore size={22} />
              </button>
              <button
                ref={nextRef}
                aria-label="Next categories"
                className="bg-red-600 text-white !p-2 rounded-full shadow-md hover:bg-red-500"
              >
                <MdNavigateNext size={22} />
              </button>
            </div>
          </div>

          <div className="w-full max-w-6xl !px-4">
            <Swiper
              onBeforeInit={onBeforeInit}
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={3.25}
              breakpoints={{
                1280: { slidesPerView: 3.25, spaceBetween: 24 },
                1024: { slidesPerView: 2.25, spaceBetween: 20 },
                768: { slidesPerView: 2.2, spaceBetween: 16 },
                0: { slidesPerView: 1, spaceBetween: 12 },
              }}
              className="!py-6"
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            >
              {allCategorys.map((category) => (
                <SwiperSlide key={category.id} className="flex justify-center">
                  <div
                    onClick={() => setActiveCategory(category.id)}
                    className="flex relative flex-col items-center cursor-pointer select-none"
                  >
                    <div
                      className={`rounded-full border-4 transition-transform duration-200 overflow-hidden ${
                        activeCategory === category.id
                          ? "scale-105 border-red-500"
                          : "border-white"
                      }`}
                    >
                      <img
                        src={CategoryImage}
                        alt={category?.title}
                        className="w-[160px] h-[160px] object-cover rounded-full"
                      />
                    </div>

                    <h3 className="text-white text-center !mt-4 text-[18px] font-medium">
                      {category?.title}
                    </h3>

                    {activeCategory === category.id && (
                      <div className="!mt-2 !p-3 text-white bg-red-600 rounded-full absolute -top-4 right-13">
                        <GiCheckMark size={22} />
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

const ShopCards = ({ activeCategory }) => {
  const { productsData, IsLoading, Errors, filteredProducts } = useSelector(
    (state) => state.Products || {}
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllProducts());
    dispatch(GetProductsByCategory(activeCategory));
  }, [dispatch, activeCategory]);

  return (
    <div className="w-full flex justify-center flex-row flex-wrap gap-5">
      {filteredProducts && filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <FoodCard key={product.id} product={product} />
        ))
      ) : (
        <div className="text-white text-2xl font-semibold text-center !my-10">
          No Products Found
        </div>
      )}
    </div>
  );
};
const Shop = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div>
      <ShopHeroSection SecondLink={"shop"} />
      <ShopCategory
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ShopCards activeCategory={activeCategory} />
    </div>
  );
};

export default Shop;
