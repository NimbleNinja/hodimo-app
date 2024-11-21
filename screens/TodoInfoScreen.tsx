import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreenProps } from "../types/navigation";
import { useAppSelector } from "../store/hooks";
import { todosSelectors } from "../store/todosSlice";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TodoInfoScreen: React.FC<ScreenProps<"TodoInfo">> = ({
  route: { params },
}) => {
  const { id } = params;
  const { title, description, done } = useAppSelector((state) =>
    todosSelectors.selectById(state, id)
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <FontAwesome
          name={done ? "check-circle-o" : "circle-o"}
          size={40}
          color={done ? "green" : "red"}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default TodoInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 36,
  },
  description: {
    fontSize: 24,
  },
});
