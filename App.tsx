import { NavigationContainer } from "@react-navigation/native";
import { RootNavigation } from "./navigation/RootNavigation";
import { Provider } from "react-redux";
import store from "./store/storage";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
}
