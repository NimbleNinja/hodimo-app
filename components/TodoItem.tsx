import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Todo } from "../types/types";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const ITEM_HEIGHT = 50;

type Props = {
  deleteHandler: (id: string) => void;
  editHandler: (id: string) => void;
};

const TodoItem = memo(
  ({ editHandler, deleteHandler, ...props }: Todo & Props) => {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1}>{props.title}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable onPress={() => editHandler(props.id)}>
            {/* <Icon size={25} color="blue" name="edit" /> */}
            <Text>E</Text>
          </Pressable>
          <Pressable onPress={() => deleteHandler(props.id)}>
            {/* <Icon size={25} color="red" name="delete" /> */}
            <Text>D</Text>
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
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
