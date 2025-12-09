import React, { useEffect, useRef } from "react";
import FoodCard from "../components/FoodCard";
import VideoIntro from "../assets/Images/ShopCategory.jpg";
import Loading from "../components/Loading";

import { Swiper, SwiperSlide } from "swiper/react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../reduxToolkit/slices/GetAllProducts";

const HeroSection = () => {
  return (
    <div className="HeroSec relative w-full h-dvh flex flex-col justify-center align-middle items-center py-10 ">
      <div className="absolute inset-0 bg-[#000000b6]"></div>
      <div className="text-center text-white z-10 font-bold text-[90px] max-md:text-[50px] ">
        <h1>
          Crafting your Exceptional <br /> Dining Reservations
        </h1>
        <p className="!my-6 font-medium text-[20px] text-white font-poppins max-md:text-[18px]">
          Reservation is a step into a world of gastronomic wonder. Reserve your
          <br />
          table today and let us paint your culinary dreams into reality.
        </p>
        <button className="bg-red-600 cursor-pointer text-[28px] !px-7 !py-4 rounded-full text-white font-semibold hover:bg-red-700 transition max-md:!px-4 max-md:!py-3">
          Explore Products
        </button>
      </div>
    </div>
  );
};

const MostSelling = () => {
  // redux state for products
  const { productsData, IsLoading, Errors } = useSelector(
    (state) => state.Products
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllProducts());
  }, [dispatch]);
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleSlideChange = (swiper) => {
    const progress = (swiper.activeIndex + 1) / swiper.slides.length;
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      progressBar.style.width = progress * 100 + "%";
    }
  };
  const handleBeforeInit = (swiper) => {
    swiper.params.navigation = swiper.params.navigation || {};
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
  };

  const handleSwiperInit = (swiper) => {
    // ensure navigation is initialized/updated once refs are attached
    try {
      swiper.navigation.init();
      swiper.navigation.update();
    } catch (e) {
      // ignore if already initialized
    }
    handleSlideChange(swiper);
  };

  return (
    <div className="w-full min-h-[50vh] flex flex-col justify-center items-center !my-3">
      <div className="w-full text-center flex flex-col">
        <h4 className="text-[20px] font-medium mb-6 text-white">
          Most Selling Products
        </h4>
        <h2 className="text-[54px] font-bold font-sans my-2 text-white">
          Most Selling
        </h2>
      </div>
      {IsLoading ? (
        <div className="w-full flex justify-center items-center">
          <Loading message="Loading Products" />
        </div>
      ) : (
        <div className="w-full relative flex flex-row justify-center items-center gap-5 flex-wrap !mt-10">
          {/* Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute left-0 top-1/3 -translate-y-1/2 z-10 bg-gray-700 hover:bg-gray-800 text-white !p-3 rounded-full transition"
          >
            <MdNavigateBefore size={28} />
          </button>
          <button
            ref={nextRef}
            className="absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-red-600 hover:bg-red-700 text-white !p-3 rounded-full transition"
          >
            <MdNavigateNext size={28} />
          </button>
          <Swiper
            ref={swiperRef}
            breakpoints={{
              // <- use breakpoints instead of SlidePerView()
              1024: { slidesPerView: 3.5 },
              768: { slidesPerView: 2.5 },
              0: { slidesPerView: 1 },
            }}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper w-full z-auto !py-5"
            onSlideChange={handleSlideChange}
            onBeforeInit={handleBeforeInit}
            onSwiper={handleSwiperInit}
          >
            {productsData.map(
              (product) =>
                product?.is_most_selling && (
                  <SwiperSlide key={product.id}>
                    <FoodCard product={product} />
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full max-w-4xl h-1 bg-gray-600 rounded-full !mt-10 overflow-hidden ">
        <div
          className="progress-bar h-full bg-red-600 transition-all duration-300"
          style={{ width: "14.28%" }}
        ></div>
      </div>
    </div>
  );
};
const IntroductionVideo = () => {
  return (
    <div className="w-full h-[700px] relative bg-black flex flex-col justify-center items-center !my-10 max-md:h-auto">
      <div className="absolute inset-0 bg-[#000000a3] flex justify-center items-center">
        <h2 className="text-white text-[40px] font-bold text-center border-2 cursor-pointer !p-5 rounded-full">
          Play
        </h2>
      </div>
      <div className="w-full h-full">
        <img src={VideoIntro} className="w-full h-full" />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <HeroSection />
      <MostSelling />
      <IntroductionVideo />
    </div>
  );
};

export default Home;
