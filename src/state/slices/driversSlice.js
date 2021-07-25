import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  drivers: [
    {
      driverID : 0,
      first_name: "Godknows",
      surname: "Nyamatendedza",
      age: 44
    },
    {
      driverID : 1,
      first_name: "Cheryl",
      surname: "Nyamatendedza",
      age: 10
    },
    {
      driverID : 2,
      first_name: "Shanique",
      surname: "Nyamatendedza",
      age: 2
    },
    {
      driverID : 3,
      first_name: "Kudakwashe",
      surname: "Nyamatendedza",
      age: 38
    }
  ],
  driver: {},
};

const driversSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {
    saveDriver: (state, { payload }) => {
      state.drivers = [...state.drivers, payload];
    },
    updateDriver: (state, { payload }) => {
      let drivers = state.drivers;
      for (let i = 0; i < drivers.length; i++){
        if(drivers[i].driverID === payload.driverID){
          drivers[i] = payload;
        }
      }
      state.drivers = drivers;
    },
    deleteDriver: (state, { payload }) => {
      state.drivers = state.drivers.filter((driver) => driver.driverID !== payload);
    },
    setDriver: (state, { payload }) => {
      state.driver = payload;
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
  saveDriver,
  updateDriver,
  deleteDriver,
  setDriver,
  setLoading,
  resetLoading
} = driversSlice.actions;

export default driversSlice.reducer;
