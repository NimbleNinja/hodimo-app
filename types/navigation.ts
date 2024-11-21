import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Todo } from "./types";

export type RootStackParamList = {
  Home: undefined;
  Todos: undefined;
  Todo:
    | {
        type: "create";
        id?: string;
      }
    | {
        type: "update";
        id: string;
      };
  TodoInfo: {
    id: string;
  };
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
