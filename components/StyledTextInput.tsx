import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";

type Props = {
  required?: boolean;
  errMessage?: string;
};

const StyledTextInput: React.FC<Props & TextInputProps> = ({
  required,
  errMessage,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      {required && <Text style={styles.required}>*</Text>}
      <TextInput
        {...props}
        style={[
          styles.input,
          {
            borderColor: errMessage ? "red" : "lightblue",
          },
        ]}
      />
    </View>
  );
};

export default StyledTextInput;

const styles = StyleSheet.create({
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
});
