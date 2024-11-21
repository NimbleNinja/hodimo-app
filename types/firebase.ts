import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Todo } from "./types";

export type GetTodosQueryOptions = {
  filter: string;
  startAfter?: FirebaseFirestoreTypes.DocumentSnapshot<Todo>;
};

export type GetTodosResponse = Promise<{
  todos: Todo[];
  lastDocumentDB: FirebaseFirestoreTypes.DocumentSnapshot<Todo>;
}>;
