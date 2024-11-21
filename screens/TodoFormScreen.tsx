import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import { ScreenProps } from "../types/navigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addTodo, todosSelectors, updateTodo } from "../store/todosSlice";
import { createTodoInDB, updateTodoInDB } from "../services/firebaseApi";
import { Controller, useForm } from "react-hook-form";
import { Todo } from "../types/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TodoFormScreen: React.FC<ScreenProps<"Todo">> = ({
  route: {
    params: { id, type },
  },
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const todo =
    type === "update"
      ? useAppSelector((state) => todosSelectors.selectById(state, id))
      : {
          id: new Date().getTime().toString(),
          userId: Math.random().toString(),
          title: "",
          description: "",
          done: false,
        };

  const { handleSubmit, control } = useForm<Todo>({
    defaultValues: todo,
  });

  const updateTodoHandler = () => {
    handleSubmit(async ({ id, ...data }) => {
      try {
        const updateResult = await updateTodoInDB(id, data);
        console.log("updateResult: ", updateResult);
        dispatch(updateTodo({ changes: data, id }));
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const createTodoHandler = async () => {
    handleSubmit(async (data) => {
      try {
        const createResult = await createTodoInDB(data);
        console.log("createResult: ", createResult);
        dispatch(addTodo(data));
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    })();
  };

  useEffect(() => {
    navigation.setOptions({
      title: type === "update" ? "Edit todo" : "Create todo",
    });
  }, []);

  return (
    <View style={styles.container}>
      <Controller
        name="title"
        control={control}
        rules={{ required: { value: true, message: "Title required" } }}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <View style={styles.inputContainer}>
              <Text style={styles.required}>*</Text>
              <TextInput
                placeholder="Title"
                style={[
                  styles.input,
                  {
                    borderColor: error?.message ? "red" : "lightblue",
                  },
                ]}
                value={value}
                onChangeText={onChange}
              />
            </View>
          );
        }}
      />
      <Controller
        name="description"
        control={control}
        rules={{ required: { value: true, message: "Title required" } }}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <View style={styles.inputContainer}>
              <Text style={styles.required}>*</Text>
              <TextInput
                placeholder="Description"
                style={[
                  styles.input,
                  {
                    borderColor: error?.message ? "red" : "lightblue",
                  },
                ]}
                value={value}
                onChangeText={onChange}
              />
            </View>
          );
        }}
      />
      <Pressable
        style={styles.button}
        onPress={type === "update" ? updateTodoHandler : createTodoHandler}
      >
        <FontAwesome name="save" size={30} color="blue" />
      </Pressable>
    </View>
  );
};

export default TodoFormScreen;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    gap: 8,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 4,
  },
  input: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "lightblue",
    borderRadius: 8,
    fontWeight: "500",
    fontSize: 18,
  },
  required: {
    fontSize: 18,
    color: "red",
  },
  button: {
    alignSelf: "flex-end",
    marginRight: 16,
  },
});
