import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Todo } from "../types/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ITEM_HEIGHT = 50;

type Props = {
  deleteHandler: (id: string) => void;
  editHandler: (id: string) => void;
  doneHandler: (id: string, done: boolean) => void;
};

const TodoItem = memo(
  ({ editHandler, deleteHandler, doneHandler, ...props }: Todo & Props) => {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: props.done ? "lightgreen" : "lightblue" },
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {props.title}
          </Text>
        </View>
        <View style={styles.actions}>
          <Pressable onPress={() => doneHandler(props.id, !props.done)}>
            <FontAwesome
              name={props.done ? "check-circle-o" : "circle-o"}
              size={20}
              color={props.done ? "green" : "red"}
            />
          </Pressable>

          <Pressable onPress={() => editHandler(props.id)}>
            <FontAwesome name="pencil" size={20} color="blue" />
          </Pressable>

          <Pressable onPress={() => deleteHandler(props.id)}>
            <FontAwesome name="trash-o" size={20} color="red" />
          </Pressable>
        </View>
      </View>
    );
  }
);

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    padding: 8,
    flexDirection: "row",
    gap: 8,
    borderRadius: 5,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textTransform: "capitalize",
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
