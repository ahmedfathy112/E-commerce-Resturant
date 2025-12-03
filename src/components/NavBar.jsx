import React, { useEffect, useState } from "react";
import logo from "../assets/Images/Logo.png";
import { MdFavorite, MdShoppingCart } from "react-icons/md";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClose = () => setMenuOpen(false);

  return (
    <div
      className={`w-full fixed !px-7 flex flex-row justify-between items-center align-middle z-50 ${
        isScrolled ? "bg-black py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="flex items-center gap-4">
        <img className="w-[70px] h-[71px]" src={logo} alt="logo" />
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex flex-row justify-center items-center gap-10 text-[#ffffffcc] font-medium text-[24px]">
        <Link to={"/"} className="NavLink">
          HOME
        </Link>
        <a href="#" className="NavLink">
          ABOUT
        </a>
        <Link to={"/shop"} className="NavLink">
          SHOP
        </Link>
        <Link to={"/contact"} className="NavLink">
          CONTACT
        </Link>
      </div>

      {/*  Cart menu button */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex flex-row gap-4">
          <Link to={"/wishlist"} className="relative">
            <p className="absolute -top-2 right-0 bg-red-500 text-white !p-1 text-[15px] rounded-4xl">
              5
            </p>
            <MdFavorite className="text-[50px] cursor-pointer text-white !p-2 rounded-full border-white" />
          </Link>
          <Link to={"/cart"} className="relative">
            <p className="absolute -top-2 right-0 bg-red-500 text-white !p-1 text-[15px] rounded-4xl">
              3
            </p>
            <MdShoppingCart className="text-[50px] cursor-pointer text-white !p-2 rounded-full border-white" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-white p-2"
          aria-label="Open menu"
        >
          <HiOutlineMenu size={28} />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#222] bg-opacity-95 flex flex-col items-center justify-center p-8 md:hidden"
          role="dialog"
          aria-modal="true"
          onClick={handleClose}
        >
          <div className="absolute top-6 right-6">
            <button
              onClick={handleClose}
              className="text-white p-2"
              aria-label="Close menu"
            >
              <HiX size={30} />
            </button>
          </div>

          <nav
            className="flex flex-col items-center gap-8 text-white text-[20px] w-full max-w-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <Link to={"/"} onClick={handleClose} className="NavLink">
              HOME
            </Link>
            <a href="#" onClick={handleClose} className="NavLink">
              ABOUT
            </a>
            <Link to={"/shop"} onClick={handleClose} className="NavLink">
              SHOP
            </Link>
            <Link to={"/contact"} onClick={handleClose} className="NavLink">
              CONTACT
            </Link>
            {/* cart and wishlist btns */}
            <div className="flex items-center gap-3">
              <div className="hidden max-md:flex flex-row gap-4">
                <Link
                  to={"/wishlist"}
                  className="relative"
                  onClick={handleClose}
                >
                  <p className="absolute -top-2 right-0 bg-red-500 text-white !p-1 text-[15px] rounded-4xl">
                    5
                  </p>
                  <MdFavorite className="text-[50px] cursor-pointer text-white !p-2 rounded-full border-white" />
                </Link>
                <Link to={"/cart"} className="relative" onClick={handleClose}>
                  <p className="absolute -top-2 right-0 bg-red-500 text-white !p-1 text-[15px] rounded-4xl">
                    3
                  </p>
                  <MdShoppingCart className="text-[50px] cursor-pointer text-white !p-2 rounded-full border-white" />
                </Link>
              </div>
            </div>

            <div className="w-full border-t border-white/20 mt-6 pt-6 flex flex-row justify-center gap-6">
              <button
                onClick={handleClose}
                className="text-white bg-transparent !px-4 !py-2 border border-white/20 rounded"
              >
                Login
              </button>
              <button
                onClick={handleClose}
                className="text-white bg-red-600 !px-4 !py-2 rounded"
              >
                Register
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NavBar;
