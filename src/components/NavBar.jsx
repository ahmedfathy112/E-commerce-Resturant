import React, { useEffect, useState } from "react";
import logo from "../assets/Images/Logo.png";
import { MdFavorite, MdShoppingCart } from "react-icons/md";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, forceLogout } from "../reduxToolkit/slices/IsAuth";
import { ImProfile } from "react-icons/im";
import { RiProfileLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";

const NavBar = () => {
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // wishlist from localStorage (keeps existing behavior)
  const WishListItems = localStorage.getItem("wishListItems");
  const parsedWishListItems = WishListItems ? JSON.parse(WishListItems) : [];

  const token = localStorage.getItem("access_token");
  var isAuth = false;
  if (token) {
    isAuth = true;
  }
  console.log(isAuth);

  // cart state (supports reducer key variations)
  const CartItemsState = useSelector((state) => state.cart || state.Cart || {});
  const cartQuantity =
    CartItemsState?.totalQuantity ?? CartItemsState?.totalQty ?? 0;

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

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(forceLogout());
    setProfileOpen(false);
  };

  return (
    <div
      className={`w-full fixed !px-7 flex flex-row justify-between items-center align-middle z-50 ${
        isScrolled ? "bg-black !py-3 shadow-lg" : "bg-transparent !py-5"
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
        <Link to={"/about"} className="NavLink">
          ABOUT
        </Link>
        <Link to={"/shop"} className="NavLink">
          SHOP
        </Link>
        <Link to={"/contact"} className="NavLink">
          CONTACT
        </Link>
      </div>

      {/*  Cart menu button */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex flex-row gap-4 items-center">
          {isAuth ? (
            <>
              <Link to={"/wishlist"} className="relative" aria-label="Wishlist">
                <p className="absolute -top-2 right-0 bg-red-500 text-white !p-1 text-[15px] rounded-4xl">
                  {parsedWishListItems.length}
                </p>
                <MdFavorite className="text-[50px] cursor-pointer text-white !p-2 rounded-full border-white" />
              </Link>

              <Link to={"/cart"} className="relative" aria-label="Cart">
                <p className="absolute -top-2 right-0 bg-red-500 text-white !p-1 text-[15px] rounded-4xl">
                  {cartQuantity}
                </p>
                <MdShoppingCart className="text-[50px] cursor-pointer text-white !p-2 rounded-full border-white" />
              </Link>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center gap-2 bg-white/5 text-white !px-3 !py-2 rounded-full"
                  aria-haspopup="true"
                >
                  <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold">
                    <IoMdPerson />
                  </span>
                  <span className="hidden lg:block">
                    {/* {user?.user_metadata?.full_name ?? user?.email} */}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 !mt-2 w-44 bg-[#111] border border-white/10 rounded-md !p-2 z-40">
                    <Link
                      to="/profile"
                      className="block !px-3 !py-2 text-white hover:bg-white/5 rounded"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left !px-3 !py-2 text-red-400 hover:bg-white/5 rounded"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white bg-transparent border border-white/20 !px-4 !py-2 rounded hover:bg-white/5"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white bg-red-600 !px-4 !py-2 rounded hover:bg-red-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-white !p-2"
          aria-label="Open menu"
        >
          <HiOutlineMenu size={28} />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#222] bg-opacity-95 flex flex-col items-center justify-center !p-8 md:hidden"
          role="dialog"
          aria-modal="true"
          onClick={handleClose}
        >
          <div className="absolute top-6 right-6">
            <button
              onClick={handleClose}
              className="text-white !p-2"
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
            <Link to="/about" onClick={handleClose} className="NavLink">
              ABOUT
            </Link>
            <Link to={"/shop"} onClick={handleClose} className="NavLink">
              SHOP
            </Link>
            <Link to={"/contact"} onClick={handleClose} className="NavLink">
              CONTACT
            </Link>

            {isAuth ? (
              <>
                {/* cart and wishlist btns */}
                <div className="flex flex-row justify-between">
                  <Link
                    to={"/wishlist"}
                    onClick={handleClose}
                    className=" text-center relative"
                  >
                    <MdFavorite className="text-[50px] cursor-pointer text-white  rounded-full border-white" />
                    <span className="absolute -top-3 right-0 bg-red-500 text-white !p-1 text-[15px] rounded-4xl">
                      {parsedWishListItems.length}
                    </span>
                  </Link>
                  <Link
                    to={"/cart"}
                    onClick={handleClose}
                    className=" text-center relative !ml-8"
                  >
                    <MdShoppingCart className="text-[50px] cursor-pointer text-white rounded-full border-white !mr-4.5" />
                    <span className="absolute -top-3 right-0 bg-red-500 text-white !p-1 text-[15px] rounded-4xl">
                      {cartQuantity}
                    </span>
                  </Link>
                </div>
                {/* profile and logout btns */}
                <div className="flex flex-row justify-between">
                  <Link
                    to={"/profile"}
                    onClick={() => handleClose()}
                    className="cursor-pointer border-2 border-white text-white rounded-4xl !p-3.5"
                    title="profile"
                  >
                    <IoMdPerson />
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      handleClose();
                    }}
                    className="w-full text-center text-red-400 border-2 cursor-pointer !ml-4 border-red-400 !px-4 !py-2 rounded-4xl rounded hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleClose}
                  className="w-full text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={handleClose}
                  className="w-full text-center"
                >
                  Register
                </Link>
              </>
            )}

            <div className="w-full border-t border-white/20 !mt-6 !pt-6 flex flex-row justify-center gap-6">
              {/* extra actions */}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NavBar;
