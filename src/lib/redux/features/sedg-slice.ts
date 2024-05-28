import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  sEdg_totalSupply: string,
};
const initialState: InitialState = {
  sEdg_totalSupply: "0",
};

const setSedgSupplySlice = createSlice({
  name: "sedg-slice",
  initialState,
  reducers: {
    setSedgSupply(state, action: PayloadAction<InitialState>) {
      state.sEdg_totalSupply = action.payload.sEdg_totalSupply;
    },
  },
});

export const { setSedgSupply } = setSedgSupplySlice.actions;
export default setSedgSupplySlice.reducer;
