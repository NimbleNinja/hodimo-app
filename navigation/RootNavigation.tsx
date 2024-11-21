import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Todos from "../screens/Todos";
import { RootStackParamList } from "../types/navigation";
import Todo from "../screens/Todo";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Todos" component={Todos} />
      <Stack.Screen name="Todo" component={Todo} />
    </Stack.Navigator>
  );
};
