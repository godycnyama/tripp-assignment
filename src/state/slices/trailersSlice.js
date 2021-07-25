import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  trailers: [
    {
      trailerID : 0,
      registration: "ACD5691",
      make: "Isuzu",
      trailerType: "Tri Axle Dolly"
    },
    {
      trailerID : 1,
      registration: "ACD5692",
      make: "Isuzu",
      trailerType: "Tri Axle Dolly"
    },
    {
      trailerID : 2,
      registration: "ACD5693",
      make: "Isuzu",
      trailerType: "Tri Axle Dolly"
    }
  ],
  trailer: {},
};

const trailersSlice = createSlice({
  name: "trailers",
  initialState,
  reducers: {
    saveTrailer: (state, { payload }) => {
      state.trailers = [...state.trailers, payload];
    },
    updateTrailer: (state, { payload }) => {
      let trailers = state.trailers;
      for (let i = 0; i < trailers.length; i++){
        if(trailers[i].trailerID === payload.trailerID){
          trailers[i] = payload;
        }
      }
      state.trailers = trailers;
    },
    deleteTrailer: (state, { payload }) => {
      state.trailers = state.trailers.filter((trailer) => trailer.trailerID !== payload);
    },
    setTrailer: (state, { payload }) => {
      state.trailer = payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    resetLoading: (state) => {
      state.loading = false;
    },
  }
});

export const {
  saveTrailer,
  updateTrailer,
  deleteTrailer,
  setTrailer,
  setLoading,
  resetLoading
} = trailersSlice.actions;

export default trailersSlice.reducer;
