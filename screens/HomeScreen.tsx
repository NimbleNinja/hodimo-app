import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreenProps } from "../types/navigation";

const HomeScreen: React.FC<ScreenProps<"Home">> = ({ navigation }) => {
  const navigationHandler = () => {
    navigation.navigate("Todos");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to TODO APP</Text>
      <Button title="go to todos" onPress={navigationHandler} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 32,
    fontSize: 24,
  },
});
