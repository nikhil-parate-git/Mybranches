import { useRecoilValue } from "recoil";
import { NavLink, useNavigate } from "react-router-dom";

import { usersState } from "../recoil/atoms/FormAtom";
import { themeState } from "../recoil/atoms/ThemeAtom";
import ThemeToggle from "./ThemeToggle";

const Sidebar = () => {
  const users = useRecoilValue(usersState);
  const theme = useRecoilValue(themeState);
  const navigate = useNavigate();

  const goToWizard = () => {
    navigate("/wizard");
  };

  const baseClass =
    "block w-full px-4 py-2 mb-2 rounded text-center font-medium transition";

  const darkBg = "bg-gray-700 text-white hover:bg-emerald-600";
  const lightBg =
    "bg-white text-gray-800 hover:bg-emerald-500 hover:text-white shadow-sm";
  const activeDark = "bg-emerald-600 text-white";
  const activeLight = "bg-emerald-500 text-white";

  return (
    <div
      className={`w-64 p-6 border-r flex flex-col min-h-screen justify-between
        ${
          theme === "dark"
            ? "bg-gray-900 border-gray-700 text-white"
            : "bg-gray-50 border-gray-200 text-gray-800"
        }`}
    >
      <div>
        <h1 className="text-2xl font-bold mb-6">My Task</h1>

        {/* Registration Wizard */}
        <button
          onClick={goToWizard}
          className={`${baseClass} ${theme === "dark" ? darkBg : lightBg}`}
        >
          Registration Wizard
        </button>

        {/* Users */}
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive
                ? theme === "dark"
                  ? activeDark
                  : activeLight
                : theme === "dark"
                ? darkBg
                : lightBg
            }`
          }
        >
          Users ({users.length})
        </NavLink>

        {/* Product Management */}
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive
                ? theme === "dark"
                  ? activeDark
                  : activeLight
                : theme === "dark"
                ? darkBg
                : lightBg
            }`
          }
        >
          Product Management
        </NavLink>
      </div>

      <ThemeToggle />
    </div>
  );
};

export default Sidebar;
