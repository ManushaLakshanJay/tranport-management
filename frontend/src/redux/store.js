import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productRuducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer, 
    product:productRuducer,
    filter: filterReducer,
   
  },
});
