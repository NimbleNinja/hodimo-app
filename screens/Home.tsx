import { Button, StyleSheet, View } from "react-native";
import React from "react";
import { ScreenProps } from "../types/navigation";

const Home: React.FC<ScreenProps<"Home">> = ({ navigation }) => {
  const navigationHandler = () => {
    navigation.navigate("Todos");
  };

  return (
    <View style={styles.container}>
      <Button title="go to todos" onPress={navigationHandler} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
