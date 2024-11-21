import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../types/types";
import { RootState } from "./storage";

const todosAdapter = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
});

const todosSlice = createSlice({
  name: "todos",
  initialState: todosAdapter.getInitialState(),
  reducers: {
    addTodo: todosAdapter.addOne,
    addTodos: todosAdapter.addMany,
    setTodos: todosAdapter.setAll,
    updateTodo: todosAdapter.updateOne,
    deleteTodo: todosAdapter.removeOne,
  },
});

export const todosSelectors = todosAdapter.getSelectors<RootState>(
  (state) => state.todos
);

export const { addTodos, deleteTodo, addTodo, updateTodo, setTodos } =
  todosSlice.actions;
export default todosSlice.reducer;
