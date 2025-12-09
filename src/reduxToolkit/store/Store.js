import { configureStore } from "@reduxjs/toolkit";
import { GetAllProductsReducer } from "../slices/GetAllProducts";
import cartSlice from "../slices/CartSlice";
import wishListSlice from "../slices/WishListSlice";
import authSlice from "../slices/IsAuth";

const store = configureStore({
  reducer: {
    Products: GetAllProductsReducer,
    Cart: cartSlice,
    WishList: wishListSlice,
    Auth: authSlice,
  },
});

export default store;
