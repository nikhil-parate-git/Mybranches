import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoForm from "./TodoForm";

const TodoItem = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center justify-between p-2 border-b dark:border-gray-700">
      {isEditing ? (
        <TodoForm
          editTodo={todo}
          onCompleteEdit={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: "TOGGLE", payload: todo.id })}
              className="w-4 h-4"
            />
            <span
              className={`${
                todo.completed ? "line-through text-gray-400" : ""
              } dark:text-white`}
            >
              {todo.text}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch({ type: "DELETE", payload: todo.id })}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
