import { useRecoilValue } from "recoil";
import { usersState } from "../recoil/atoms/FormAtom";
import { themeState } from "../recoil/atoms/ThemeAtom";
import ThemeToggle from "./ThemeToggle";

const Sidebar = ({ setCurrentView, setStep }) => {
  const users = useRecoilValue(usersState);
  const theme = useRecoilValue(themeState);

  const handleWizardClick = () => {
    setCurrentView("wizard");
    setStep(0);
  };

  const handleUsersClick = () => {
    setCurrentView("users");
  };

  return (
    <div
      className={`w-64 p-6 border-r flex flex-col min-h-screen justify-between
        ${
          theme === "dark"
            ? "bg-gray-900 border-gray-700 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
    >
      {/* TOP */}
      <div>
        <h1 className="text-xl font-bold mb-6">My App</h1>

        {/* Registration Wizard */}
        <button
          onClick={handleWizardClick}
          className={`mb-2 w-full px-4 py-2 rounded transition
            ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-indigo-600"
                : "bg-gray-200 hover:bg-indigo-600 hover:text-white"
            }`}
        >
          Registration Wizard
        </button>

        {/* Users */}
        <button
          onClick={handleUsersClick}
          className={`mb-2 w-full px-4 py-2 rounded transition
            ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-indigo-600"
                : "bg-gray-200 hover:bg-indigo-600 hover:text-white"
            }`}
        >
          Users ({users.length})
        </button>

        {/* Product Management */}
        <button
          onClick={() => setCurrentView("products")}
          className={`w-full px-4 py-2 rounded transition
            ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-indigo-600"
                : "bg-gray-200 hover:bg-indigo-600 hover:text-white"
            }`}
        >
          Product Management
        </button>
      </div>

      {/* BOTTOM */}
      <ThemeToggle />
    </div>
  );
};

export default Sidebar;
