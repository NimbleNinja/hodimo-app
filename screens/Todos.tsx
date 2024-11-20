import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScreenProps } from "../types/navigation";
import { Todo } from "../types/types";
import { getTodos } from "../services/firebaseApi";
import TodoItem from "../components/TodoItem";

const Todos: React.FC<ScreenProps<"Todos">> = ({ navigation }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos((prev) => [...prev, ...todos]);
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

  const deleteItemHandler = (id: string) => {
    //
  };

  const editItemHandler = (todo: Todo) => {
    //
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
