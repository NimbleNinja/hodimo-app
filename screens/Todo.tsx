import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreenProps } from "../types/navigation";
import { useAppSelector } from "../store/hooks";
import { todosSelectors } from "../store/todosSlice";
import TodoForm from "../components/TodoForm";
import { updateTodoInDB } from "../services/firebaseApi";

const Todo: React.FC<ScreenProps<"Todo">> = ({ route: { params } }) => {
  const todo = useAppSelector((state) =>
    todosSelectors.selectById(state, params.id)
  );

  const updateTodoHandler = async () => {
    try {
      const updateResult = await updateTodoInDB({});
    } catch (error) {
      console.log(error);
    }
  };

  return <TodoForm {...todo} onPressHandler={() => {}} />;
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
