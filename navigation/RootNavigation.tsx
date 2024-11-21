import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TodosScreen from "../screens/TodosScreen";
import { RootStackParamList } from "../types/navigation";
import TodoFormScreen from "../screens/TodoFormScreen";
import CreateTodoButton from "../components/CreateTodoButton";
import TodoInfoScreen from "../screens/TodoInfoScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Todos"
        component={TodosScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <CreateTodoButton
              pressHandler={() =>
                navigation.navigate("Todo", { type: "create" })
              }
            />
          ),
        })}
      />
      <Stack.Screen name="Todo" component={TodoFormScreen} />
      <Stack.Screen name="TodoInfo" component={TodoInfoScreen} />
    </Stack.Navigator>
  );
};
