import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cartItems_v1";

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], totalQuantity: 0, totalPrice: 0 };
    const items = JSON.parse(raw);
    const totals = items.reduce(
      (acc, it) => {
        const qty = it.quantity || 1;
        const price = Number(it.product?.price ?? it.price ?? 0);
        acc.totalQuantity += qty;
        acc.totalPrice += price * qty;
        return acc;
      },
      { totalQuantity: 0, totalPrice: 0 }
    );
    return {
      items,
      totalQuantity: totals.totalQuantity,
      totalPrice: totals.totalPrice,
    };
  } catch {
    return { items: [], totalQuantity: 0, totalPrice: 0 };
  }
};

const saveToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
};

const initialState = loadFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // payload can be a product object OR { product, quantity }
    addItemToCart: (state, action) => {
      const payload = action.payload;
      const product = payload.product ?? payload;
      const addQty = payload.quantity ?? 1;

      const existing = state.items.find(
        (item) => String(item.product?.id) === String(product.id)
      );

      if (existing) {
        existing.quantity = (existing.quantity || 1) + addQty;
      } else {
        state.items.push({ product, quantity: addQty });
      }

      // recalc totals
      state.totalQuantity = state.items.reduce(
        (s, it) => s + (it.quantity || 1),
        0
      );
      state.totalPrice = state.items.reduce(
        (s, it) => s + Number(it.product?.price ?? 0) * (it.quantity || 1),
        0
      );

      saveToStorage(state.items);
    },

    removeItemFromCart: (state, action) => {
      const productId =
        action.payload.product?.id ?? action.payload.id ?? action.payload;
      const idx = state.items.findIndex(
        (item) => String(item.product?.id) === String(productId)
      );
      if (idx !== -1) {
        state.items.splice(idx, 1);
      }

      state.totalQuantity = state.items.reduce(
        (s, it) => s + (it.quantity || 1),
        0
      );
      state.totalPrice = state.items.reduce(
        (s, it) => s + Number(it.product?.price ?? 0) * (it.quantity || 1),
        0
      );

      saveToStorage(state.items);
    },

    incrementItem: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(
        (it) => String(it.product?.id) === String(productId)
      );
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
      }
      state.totalQuantity = state.items.reduce(
        (s, it) => s + (it.quantity || 1),
        0
      );
      state.totalPrice = state.items.reduce(
        (s, it) => s + Number(it.product?.price ?? 0) * (it.quantity || 1),
        0
      );
      saveToStorage(state.items);
    },

    decrementItem: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(
        (it) => String(it.product?.id) === String(productId)
      );
      if (item) {
        if ((item.quantity || 1) > 1) item.quantity -= 1;
        else
          state.items = state.items.filter(
            (it) => String(it.product?.id) !== String(productId)
          );
      }
      state.totalQuantity = state.items.reduce(
        (s, it) => s + (it.quantity || 1),
        0
      );
      state.totalPrice = state.items.reduce(
        (s, it) => s + Number(it.product?.price ?? 0) * (it.quantity || 1),
        0
      );
      saveToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    },

    // optional: replace entire cart (useful for restoring)
    setCart: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
      state.totalQuantity = state.items.reduce(
        (s, it) => s + (it.quantity || 1),
        0
      );
      state.totalPrice = state.items.reduce(
        (s, it) => s + Number(it.product?.price ?? 0) * (it.quantity || 1),
        0
      );
      saveToStorage(state.items);
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  incrementItem,
  decrementItem,
  setCart,
} = cartSlice.actions;
export default cartSlice.reducer;
