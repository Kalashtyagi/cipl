import { createSlice } from "@reduxjs/toolkit";

const offerletterSlice = createSlice({
  name: "offerletter",
  initialState: {
    offerletter: [],
    joining_date: "",
    leads: [],
  },
  reducers: {
    Addofferletter(state, actions) {
      state.offerletter = actions.payload;
      console.log("fired", actions.payload);
    },
    AddofferletterDate(state, actions) {
      state.joining_date = actions.payload;
    },
    Addleads(state, actions) {
      state.leads = actions.payload;
    },
  },
});

export const offerletterActions = offerletterSlice.actions;

export default offerletterSlice.reducer;
