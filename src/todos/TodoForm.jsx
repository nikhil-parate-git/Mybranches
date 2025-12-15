import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoForm = ({ editTodo = null, onCompleteEdit }) => {
  const { dispatch } = useContext(TodoContext);
  const [text, setText] = useState("");

  useEffect(() => {
    if (editTodo) setText(editTodo.text);
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editTodo) {
      dispatch({ type: "EDIT", payload: { id: editTodo.id, text } });
      onCompleteEdit(); // callback to close edit mode
    } else {
      dispatch({
        type: "ADD",
        payload: { id: Date.now(), text, completed: false },
      });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        className="flex-1 p-2 border rounded-lg dark:bg-gray-800 dark:text-white border-white"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        {editTodo ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;
