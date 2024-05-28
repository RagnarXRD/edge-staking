import { configureStore } from "@reduxjs/toolkit";

import accountAddressReducer from "./features/account-slice"
import setSedgSupplyReducer from "./features/sedg-slice"

export const store = configureStore({
  reducer: {
    accountAddressReducer,
    setSedgSupplyReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch