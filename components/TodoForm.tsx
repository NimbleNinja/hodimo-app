import { Button, StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Todo } from "../types/types";

type Props = {
  onPressHandler: () => void;
};

const TodoForm: React.FC<Todo & Props> = ({ onPressHandler, ...todo }) => {
  const defaultValues = todo ? todo : {};
  const { handleSubmit, control } = useForm<Todo>({
    defaultValues,
  });

  return (
    <View style={styles.container}>
      <Controller
        name="title"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          );
        }}
      />
      <Controller
        name="description"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          );
        }}
      />
      <Button title="Save" onPress={onPressHandler} />
    </View>
  );
};

export default TodoForm;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    gap: 8,
  },
  input: {
    padding: 8,
    borderWidth: 2,
    borderColor: "lightblue",
  },
});
