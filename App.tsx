import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Todo } from "./types/types";

export default function App() {
  const todosRef = useRef(firestore().collection<Todo>("todos")).current;
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      const todos = [];
      firestore()
        .collection("todos")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            todos.push({
              id: documentSnapshot.id,
              ...documentSnapshot.data(),
            });
          });
        });
    };

    getTodos();
  }, []);

  const addTodoHandler = async () => {
    const todo: Todo = {
      id: Math.random().toString(),
      userId: Math.random().toString(),
      title: "New todo",
      description: "Description todo",
      done: false,
    };

    try {
      console.log("clicked");

      const result = await firestore().collection<Todo>("todos").add(todo);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="add" onPress={addTodoHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
