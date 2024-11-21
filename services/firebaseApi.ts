import firestore from "@react-native-firebase/firestore";
import { Todo } from "../types/types";

export const TODOS_COLLECTION = "todos";
export const todosCollectionRef =
  firestore().collection<Todo>(TODOS_COLLECTION);

export const getTodosFromDB = async () => {
  const snapshot = await todosCollectionRef.get({ source: "server" });
  return snapshot.docs.map((snapshot) => snapshot.data());
};

export const createTodoInDB = async (todo: Todo) => {
  return await todosCollectionRef.doc(todo.id).set(todo);
};

export const updateTodoInDB = async (todo: Todo) => {
  return await todosCollectionRef.doc(todo.id).update(todo);
};

export const deleteTodoFromDB = async (id: string) => {
  return await todosCollectionRef.doc(id).delete();
};
