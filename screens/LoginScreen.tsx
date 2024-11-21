import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreenProps } from "../types/navigation";
import { Controller, useForm } from "react-hook-form";
import StyledTextInput from "../components/StyledTextInput";
import { useAppDispatch } from "../store/hooks";
import { setAuthorization } from "../store/authorization";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type LoginFields = {
  login: string;
  password: string;
};

const LoginScreen: React.FC<ScreenProps<"Login">> = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<LoginFields>();

  const loginHandler = () => {
    handleSubmit((creadentials) => {
      //
      console.log(creadentials);
      dispatch(setAuthorization(true));
    })();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login: </Text>
      <Controller
        name="login"
        control={control}
        rules={{ required: { value: true, message: "Field Required" } }}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <StyledTextInput
              placeholder="admin@admin.com"
              required
              value={value}
              onChangeText={onChange}
              errMessage={error?.message}
            />
          );
        }}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: { value: true, message: "Field Required" } }}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <StyledTextInput
              placeholder="********"
              required
              secureTextEntry
              value={value}
              onChangeText={onChange}
              errMessage={error?.message}
            />
          );
        }}
      />
      <Pressable style={styles.button} onPress={loginHandler}>
        <FontAwesome name="user-secret" size={40} color="blue" />
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  title: {
    marginBottom: 30,
    fontSize: 36,
    fontWeight: "500",
  },
  button: {
    padding: 8,
  },
});
