import React, { createContext, useReducer, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter(todo => todo.id !== action.payload);
    case "TOGGLE":
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case "EDIT":
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [storedTodos, setStoredTodos] = useLocalStorage("todos", []);
  const [todos, dispatch] = useReducer(todoReducer, storedTodos);

  useEffect(() => {
    setStoredTodos(todos);
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
