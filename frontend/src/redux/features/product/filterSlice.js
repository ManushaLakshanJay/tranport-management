import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.driverName.toLowerCase().includes(search.toLowerCase()) ||
          product.route.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredPoducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
