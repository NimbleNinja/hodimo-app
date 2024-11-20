import { Button, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Todo } from "../types/types";

const ITEM_HEIGHT = 40;

type Props = {
  deleteHandler: (id: string) => void;
  editHandler: (todo: Todo) => void;
};

const TodoItem = memo(
  ({ editHandler, deleteHandler, ...props }: Todo & Props) => {
    return (
      <View style={styles.container}>
        <View>
          <Text>{props.title}</Text>
        </View>
        <View style={styles.actions}>
          <Button title="Edit" onPress={() => editHandler(props)} />
          <Button title="X" onPress={() => deleteHandler(props.id)} />
        </View>
      </View>
    );
  }
);

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
});
