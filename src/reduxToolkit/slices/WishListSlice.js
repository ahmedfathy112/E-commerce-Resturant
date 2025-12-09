import { createSlice } from "@reduxjs/toolkit";

const WISH_KEY = "wishListItems";

const saveToStorage = (items) => {
  try {
    localStorage.setItem(WISH_KEY, JSON.stringify(items || []));
  } catch {}
};
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(WISH_KEY);
    const items = raw ? JSON.parse(raw) : [];
    return { items };
  } catch {
    return { items: [] };
  }
};

const initialState = loadFromStorage();

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addItemToWishList: (state, action) => {
      // support payload shapes: product OR { product }
      const payload = action.payload;
      const product = payload?.product ?? payload;

      if (!product || !product.id) return;

      const existing = state.items.find(
        (item) => String(item.id) === String(product.id)
      );
      if (!existing) {
        state.items.push(product);
        saveToStorage(state.items);
      }
    },
    removeItemFromWishList: (state, action) => {
      // support payload shapes: id OR product OR { product }
      const payload = action.payload;
      const id = payload?.product?.id ?? payload?.id ?? payload;
      if (!id) return;

      state.items = state.items.filter(
        (item) => String(item.id) !== String(id)
      );
      saveToStorage(state.items);
    },
    clearWishList: (state) => {
      state.items = [];
      saveToStorage(state.items);
    },
    // optional: replace entire wishlist
    setWishList: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
      saveToStorage(state.items);
    },
  },
});

export const {
  addItemToWishList,
  removeItemFromWishList,
  clearWishList,
  setWishList,
} = wishListSlice.actions;
export default wishListSlice.reducer;
