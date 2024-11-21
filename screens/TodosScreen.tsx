import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ScreenProps } from "../types/navigation";
import {
  deleteTodoFromDB,
  getTodosFromDB,
  updateTodoInDB,
} from "../services/firebaseApi";
import TodoItem from "../components/TodoItem";
import {
  addTodos,
  deleteTodo,
  setTodos,
  todosSelectors,
  updateTodo,
} from "../store/todosSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Todo } from "../types/types";

const ITEM_HEIGHT = 50;
const SEPARATOR_HEIGHT = 8;

const TodosScreen: React.FC<ScreenProps<"Todos">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(todosSelectors.selectAll);
  const [filter, setFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [lastDocument, setLastDocument] =
    useState<FirebaseFirestoreTypes.DocumentSnapshot<Todo>>();

  const fetchTodos = async () => {
    try {
      const { todos, lastDocumentDB } = await getTodosFromDB({
        filter,
        startAfter: lastDocument,
      });
      setLastDocument(lastDocumentDB);
      dispatch(addTodos(todos));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItemHandler = useCallback(async (id: string) => {
    try {
      const removeResult = await deleteTodoFromDB(id);
      console.log(removeResult);

      dispatch(deleteTodo(id));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const editItemHandler = useCallback((id: string) => {
    navigation.navigate("Todo", { type: "update", id });
  }, []);

  const todoStatusHandler = useCallback(async (id: string, done: boolean) => {
    try {
      const updateStatusResult = await updateTodoInDB(id, { done });
      console.log("updateStatusResult: ", updateStatusResult);
      dispatch(updateTodo({ changes: { done }, id }));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const searchHandler = async () => {
    console.log(filterValue);

    if (!filterValue) return;

    setFilter(filterValue);

    try {
      const { todos, lastDocumentDB } = await getTodosFromDB({
        filter: filterValue,
      });
      console.log("TODOS: ", todos);

      setLastDocument(lastDocumentDB);
      dispatch(setTodos(todos));
    } catch (error) {
      console.log(error);
    }
  };

  const resetFilterHandler = async () => {
    console.log("resetFilterHandler");

    if (!filter) {
      setFilterValue("");
      return;
    }

    setFilter("");
    setFilterValue("");

    const { todos, lastDocumentDB } = await getTodosFromDB();
    setLastDocument(lastDocumentDB);
    dispatch(setTodos(todos));
  };

  const onEndReachedHandler = ({
    distanceFromEnd,
  }: {
    distanceFromEnd: number;
  }) => {
    if (distanceFromEnd === 0) return;
    fetchTodos();
  };

  const todoInfohandler = (id: string) => {
    navigation.navigate("TodoInfo", { id });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          value={filterValue}
          onChangeText={setFilterValue}
          numberOfLines={1}
        />
        {(filter || filterValue) && (
          <Pressable onPress={resetFilterHandler}>
            <FontAwesome name="close" size={25} color="red" />
          </Pressable>
        )}
        <Pressable onPress={searchHandler}>
          <FontAwesome name="search" size={25} color="blue" />
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <Pressable onPress={() => todoInfohandler(item.id)}>
            <TodoItem
              {...item}
              deleteHandler={deleteItemHandler}
              editHandler={editItemHandler}
              doneHandler={todoStatusHandler}
            />
          </Pressable>
        )}
        ListEmptyComponent={<Text>No items...</Text>}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        getItemLayout={(data, index) => {
          return {
            index,
            length: ITEM_HEIGHT + SEPARATOR_HEIGHT,
            offset: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * index,
          };
        }}
        initialNumToRender={20}
        onEndReached={onEndReachedHandler}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  separator: {
    height: SEPARATOR_HEIGHT,
  },
  search: {
    padding: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 2,
    borderColor: "lightblue",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  searchInput: {
    flex: 1,
  },
});
