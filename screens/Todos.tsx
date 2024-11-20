import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreenProps } from "../types/navigation";

const Todos: React.FC<ScreenProps<"Todos">> = () => {
  // useEffect(() => {
  //     const fetchTodos = async () => {
  //       console.log(('start fetch'));
  //        const todos = await getTodos()
  //        console.log('Todos: ', todos);
  //     }

  //     fetchTodos()
  //   })

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

  return (
    <View style={styles.container}>
      <Text>Todos</Text>
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
