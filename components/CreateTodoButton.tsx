import { Pressable } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = {
  pressHandler: () => void;
};

const CreateTodoButton: React.FC<Props> = ({ pressHandler }) => {
  return (
    <Pressable onPress={pressHandler}>
      <FontAwesome name="plus-circle" size={30} color="blue" />
    </Pressable>
  );
};

export default CreateTodoButton;
