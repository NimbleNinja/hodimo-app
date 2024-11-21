import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TodosScreen from "../screens/TodosScreen";
import { RootStackParamList } from "../types/navigation";
import TodoFormScreen from "../screens/TodoFormScreen";
import CreateTodoButton from "../components/CreateTodoButton";
import TodoInfoScreen from "../screens/TodoInfoScreen";
import { useAppSelector } from "../store/hooks";
import { isAuthSelector } from "../store/authorization";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  const isAuth = useAppSelector(isAuthSelector);
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      {!isAuth ? (
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
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
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
