import { configureStore } from "@reduxjs/toolkit";
import authorizationReducer from "./authorization";
import todosReducer from "./todosSlice";

const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    todos: todosReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
