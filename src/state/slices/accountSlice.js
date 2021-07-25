import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  account: {
    organisation_name: "",
    first_name: "",
    surname: "",
    gender: "Male",
    email_address: "",
    password: "",
    phone: "",
    isCargoBroker: false,
    isTransporter: false,
    isCargoOwner: false
  }
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    saveAccount: (state, { payload }) => {
      state.account = payload;
    },
    updateAccount: (state, { payload }) => {
      state.account = payload;
    },
    deleteAccount: (state) => {
      state.account = null;
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
  saveAccount,
  updateAccount,
  deleteAccount,
  setAccount,
  setLoading,
  resetLoading
} = accountSlice.actions;

export default accountSlice.reducer;
