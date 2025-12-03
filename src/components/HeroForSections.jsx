import { Link } from "react-router-dom";

const ShopHeroSection = ({ SecondLink }) => {
  return (
    <div className="ShopHeroSec relative w-full h-[50dvh] flex flex-col justify-center align-middle items-center py-10 ">
      <div className="absolute inset-0 bg-[#0000009f]"></div>
      <h1 className="text-white text-4xl font-bold z-10">{SecondLink}</h1>
      <div className="flex flex-row gap-2 text-white text-[18px] font-medium mt-4 z-20">
        <Link to={"/"}>Home</Link>
        <span>/</span>
        <Link to={`/${SecondLink}`}>{SecondLink}</Link>
      </div>
    </div>
  );
};
export default ShopHeroSection;
