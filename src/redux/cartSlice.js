import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cart_v1";

function loadFromLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { items: {} };
  } catch (e) {
    return { items: {} };
  }
}

function saveToLocal(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore
  }
}

const initialState = loadFromLocal();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, product, quantity } = action.payload;
      if (!state.items[id]) state.items[id] = { product, qty: quantity };
      else state.items[id].qty += 1;
      saveToLocal(state);
    },
    increase(state, action) {
      const id = action.payload;
      if (state.items[id]) state.items[id].qty += 1;
      saveToLocal(state);
    },
    decrease(state, action) {
      const id = action.payload;
      if (!state.items[id]) return;
      state.items[id].qty -= 1;
      if (state.items[id].qty <= 0) delete state.items[id];
      saveToLocal(state);
    },
    removeItem(state, action) {
      const id = action.payload;
      if (state.items[id]) delete state.items[id];
      saveToLocal(state);
    },
    clearCart(state) {
      state.items = {};
      saveToLocal(state);
    },
  },
});

export const { addItem, increase, decrease, removeItem, clearCart } =
  cartSlice.actions;

export const selectCartCount = (state) =>
  Object.values(state.cart.items).reduce((sum, it) => sum + (it.qty || 0), 0);

export const selectCartTotal = (state) =>
  Object.values(state.cart.items).reduce(
    (sum, it) => sum + (it.qty || 0) * (it.product.price || 0),
    0
  );
export default cartSlice.reducer;
