import firestore from "@react-native-firebase/firestore";
import { Todo } from "../types/types";
import { GetTodosQueryOptions, GetTodosResponse } from "../types/firebase";

export const TODOS_COLLECTION = "todos";
export const todosCollectionRef =
  firestore().collection<Todo>(TODOS_COLLECTION);

export const getTodosFromDB = async (
  options?: GetTodosQueryOptions
): GetTodosResponse => {
  let query = todosCollectionRef.limit(20);

  if (options?.filter) {
    query = query.where("title", ">=", options.filter);
  }

  if (options?.startAfter) {
    query = query.startAfter(options.startAfter);
  }

  const snapshot = await query.get();
  const count = await query.countFromServer().get();
  return {
    todos: snapshot.docs.map((snapshot) => snapshot.data()),
    lastDocumentDB: snapshot.docs[snapshot.docs.length - 1],
  };
};

export const createTodoInDB = async (todo: Todo) => {
  return await todosCollectionRef.doc(todo.id).set(todo);
};

export const updateTodoInDB = async (id: string, todo: Partial<Todo>) => {
  return await todosCollectionRef.doc(id).update(todo);
};

export const deleteTodoFromDB = async (id: string) => {
  return await todosCollectionRef.doc(id).delete();
};
