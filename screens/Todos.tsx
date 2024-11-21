import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { ScreenProps } from "../types/navigation";
import { Todo } from "../types/types";
import { deleteTodoFromDB, getTodosFromDB } from "../services/firebaseApi";
import TodoItem from "../components/TodoItem";
import { addTodos, deleteTodo, todosSelectors } from "../store/todosSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Todos: React.FC<ScreenProps<"Todos">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(todosSelectors.selectAll);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodosFromDB();
      console.log(todos);

      dispatch(addTodos(todos));
    };

    fetchTodos();
  }, []);

  //   const addTodoHandler = async () => {
  //     const todo: Todo = {
  //       id: Math.random().toString(),
  //       userId: Math.random().toString(),
  //       title: "New todo",
  //       description: "Description todo",
  //       done: false,
  //     };

  //     try {
  //       console.log("clicked");
  //       const result = await createTodo(todo);
  //       console.log(result);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const createItemHandler = () => {
    navigation.navigate("Home");
  };

  const deleteItemHandler = async (id: string) => {
    try {
      const removeResult = await deleteTodoFromDB(id);
      console.log(removeResult);

      dispatch(deleteTodo(id));
    } catch (error) {
      console.log(error);
    }
  };

  const editItemHandler = (id: string) => {
    navigation.navigate("Todo", { type: "update", id });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            {...item}
            deleteHandler={deleteItemHandler}
            editHandler={editItemHandler}
          />
        )}
        ListEmptyComponent={<Text>No items...</Text>}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  separator: {
    height: 8,
  },
});
