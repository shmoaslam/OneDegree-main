import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./AppSlice"; 

// Configure the Redux store
const store = configureStore({
  reducer: {
    AppSlice, 
  },
});

export default store;
