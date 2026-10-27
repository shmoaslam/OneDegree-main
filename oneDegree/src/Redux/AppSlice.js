import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchHome: "",
  // product list plus pagination metadata
  allproduct: [],
  productPage: 1,
  productLimit: 9,
  productTotal: 0, // total number of products in DB
  allstore: [],
  category: [],
  material: [],
  colors: [],
  collection: [],
  finishing: [],
  FrameType: [],
  shape: [],
  Store: [],
};

export const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setSearchHome: (state, action) => {
      state.searchHome = action.payload;
    },
    setAllProducts: (state, action) => {
      // action.payload may be either an array (old behaviour) or an object
      // containing { items, page, limit, total }.
      if (Array.isArray(action.payload)) {
        state.allproduct = action.payload;
      } else {
        state.allproduct = action.payload.items || [];
        if (action.payload.page) state.productPage = action.payload.page;
        if (action.payload.limit) state.productLimit = action.payload.limit;
        if (action.payload.total !== undefined) state.productTotal = action.payload.total;
      }
    },
    setAllStore: (state, action) => {
      state.allproduct = action.payload;
    },
    setProductPage: (state, action) => {
      state.productPage = action.payload;
    },
    setProductLimit: (state, action) => {
      state.productLimit = action.payload;
    },
    setProductTotal: (state, action) => {
      state.productTotal = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setMaterial: (state, action) => {
      state.material = action.payload;
    },
    setcColors: (state, action) => {
      state.colors = action.payload;
    },
    setCollection: (state, action) => {
      state.collection = action.payload;
    },
    setFinishing: (state, action) => {
      state.finishing = action.payload;
    },
    setFrameType: (state, action) => {
      state.FrameType = action.payload;
    },
    setShape: (state, action) => {
      state.shape = action.payload;
    },
    setStore: (state, action) => {
      state.Store = action.payload;
    },
  },
});

export const {
  setSearchHome,
  setHomeCategory,
  setAllProducts,
  setAllStore,
  setCategory,
  setMaterial,
  setcColors,
  setCollection,
  setFinishing,
  setFrameType,
  setShape,
  setStore,
  setProductPage,
  setProductLimit,
  setProductTotal,
} = AppSlice.actions;

export default AppSlice.reducer;
