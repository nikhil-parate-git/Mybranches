import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const Sidebar = ({ currentView, setCurrentView, children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      
      {/* Sidebar Links */}
      <div className="w-64 p-6 border-r border-gray-300 dark:border-gray-700 flex flex-col">
        <h1 className="text-xl font-bold mb-6">My App</h1>

        <button
          onClick={() => setCurrentView("wizard")}
          className={`mb-2 px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition ${
            currentView === "wizard" ? "bg-indigo-600 text-white" : ""
          }`}
        >
          Registration Wizard
        </button>

        <button
          onClick={() => setCurrentView("todo")}
          className={`mb-2 px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition ${
            currentView === "todo" ? "bg-indigo-600 text-white" : ""
          }`}
        >
          Todo App
        </button>

        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Render the actual children passed from App.jsx */}
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
