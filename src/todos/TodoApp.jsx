import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoApp = () => {
  return (
    <div className="max-w-md w-full mx-auto p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
        Todo App
      </h2>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default TodoApp;
