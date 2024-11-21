import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./storage";

type InitialState = {
  isAuth: boolean;
};

const initialState: InitialState = {
  isAuth: false,
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setAuthorization: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const isAuthSelector = (state: RootState) => state.authorization.isAuth;

export const { setAuthorization } = authorizationSlice.actions;
export default authorizationSlice.reducer;
