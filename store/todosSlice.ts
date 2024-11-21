import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { Todo } from "../types/types"
import { RootState } from "./storage"

  
  const todosAdapter = createEntityAdapter<Todo>({
    selectId: (todo: Todo) => todo.id,
  })
  
  const todosSlice = createSlice({
    name: 'todos',
    initialState: todosAdapter.getInitialState(),
    reducers: {
      addTodo: todosAdapter.addOne,
      addTodos: todosAdapter.addMany,
      updateTodo: todosAdapter.updateOne,
      deleteTodo: todosAdapter.removeOne
    },
  })

  export const todosSelectors = todosAdapter.getSelectors<RootState>(
    (state) => state.todos
  )

  export const { addTodos, deleteTodo } = todosSlice.actions
  export default todosSlice.reducer

