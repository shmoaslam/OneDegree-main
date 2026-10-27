import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchHome: "",
  allproduct: [],
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
      state.allproduct = action.payload;
    },
    setAllStore: (state, action) => {
      state.allproduct = action.payload;
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
} = AppSlice.actions;

export default AppSlice.reducer;
