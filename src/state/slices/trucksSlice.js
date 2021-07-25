import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  trucks: [
    {
      truckID : 0,
      registration: "ACD5678",
      make: "Isuzu",
      model: "KH34"
    },
    {
      truckID : 1,
      registration: "ACD5679",
      make: "Nissan",
      model: "60X1"
    },
    {
      truckID : 2,
      registration: "ACD5680",
      make: "Iveco",
      model: "X78"
    }
  ],
  truck: {},
};

const trucksSlice = createSlice({
  name: "trucks",
  initialState,
  reducers: {
    saveTruck: (state, { payload }) => {
      state.trucks = [...state.trucks, payload];
    },
    updateTruck: (state, { payload }) => {
      let trucks = state.trucks;
      for (let i = 0; i < trucks.length; i++){
        if(trucks[i].truckID === payload.truckID){
          trucks[i] = payload;
        }
      }
      state.trucks = trucks;
    },
    deleteTruck: (state, { payload }) => {
      state.trucks = state.trucks.filter((truck) => truck.truckID !== payload);
    },
    setTruck: (state, { payload }) => {
      state.truck = payload;
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
  saveTruck,
  updateTruck,
  deleteTruck,
  setTruck,
  setLoading,
  resetLoading
} = trucksSlice.actions;

export default trucksSlice.reducer;
