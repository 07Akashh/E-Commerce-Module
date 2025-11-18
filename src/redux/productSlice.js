import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE = "https://fakestoreapi.com";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetch(`${BASE}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
    loaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.products = action.payload;
        state.productCount = action.payload.length;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
