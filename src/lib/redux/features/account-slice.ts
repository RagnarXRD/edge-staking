import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  accountAddress: string,
  edgeBalance?: string,
  sEdgeBalance?: string,
};
const initialState: InitialState = {
  accountAddress: "",
  edgeBalance: "0",
  sEdgeBalance: "0",
};

const accountSlice = createSlice({
  name: "product-modal",
  initialState,
  reducers: {
    setAccountAddress(state, action: PayloadAction<InitialState>) {
      state.accountAddress = action.payload.accountAddress;
      state.edgeBalance = action.payload.edgeBalance;
      state.sEdgeBalance = action.payload.sEdgeBalance;
    },
  },
});

export const { setAccountAddress } = accountSlice.actions;
export default accountSlice.reducer;
