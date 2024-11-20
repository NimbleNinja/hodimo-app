import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Todo } from "./types/types";
import { createTodo, getTodos } from "./services/firebaseApi";
import { useEffect } from "react";
import firestore from '@react-native-firebase/firestore'

export default function App() {
  useEffect(() => {
    const fetchTodos = async () => {
      console.log(('start fetch'));
       const todos = await getTodos()
       console.log('Todos: ', todos);
    }

    fetchTodos()
  })

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
      const result = await createTodo(todo);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const clearCache = () => {
    firestore().disableNetwork()
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="add" onPress={addTodoHandler} />
      <Button title="cache" onPress={clearCache} />
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
