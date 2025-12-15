import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todos } = useContext(TodoContext);

  if (!todos.length) {
    return <p className="text-gray-500 dark:text-gray-300">No tasks yet.</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow divide-y dark:divide-gray-700">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
