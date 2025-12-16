import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  usersState,
  selectedUserState,
  currentFormState,
} from "../recoil/atoms/FormAtom";
import { themeState } from "../recoil/atoms/ThemeAtom";
import { Pencil, Trash2, FileText } from "lucide-react";

const UsersTable = ({ setCurrentView, setStep }) => {
  const users = useRecoilValue(usersState);
  const theme = useRecoilValue(themeState);

  const setUsers = useSetRecoilState(usersState);
  const setSelectedUser = useSetRecoilState(selectedUserState);
  const setFormData = useSetRecoilState(currentFormState);

  // EDIT USER
  const handleEdit = (index) => {
    setSelectedUser(index);
    setFormData(users[index]);
    setCurrentView("wizard");
    setStep(0);
  };

  // DELETE USER
  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  if (users.length === 0) {
    return (
      <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
        No users found
      </p>
    );
  }

  return (
    <div
      className={`p-6 rounded-xl shadow
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
    >
      <h2 className="text-xl font-bold mb-4">Users List</h2>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr
            className={`border-b
              ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
          >
            <th className="text-left p-2">#</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">City</th>
            <th className="text-left p-2">Pincode</th>
            <th className="text-left p-2">Document</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr
              key={i}
              className={`border-b transition
                ${theme === "dark"
                  ? "border-gray-700 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-50"}`}
            >
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{u.personal.name}</td>
              <td className="p-2">{u.personal.email}</td>
              <td className="p-2">{u.address.city}</td>
              <td className="p-2">{u.address.pincode}</td>

              {/* DOCUMENT */}
              <td className="p-2">
                {u.document ? (
                  <a
                    href={URL.createObjectURL(u.document)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-500 hover:underline"
                  >
                    <FileText size={16} />
                    View
                  </a>
                ) : (
                  <span className="text-gray-400">No file</span>
                )}
              </td>

              {/* ACTIONS */}
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(i)}
                  className="p-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  title="Edit User"
                >
                  <Pencil size={14} />
                </button>

                <button
                  onClick={() => handleDelete(i)}
                  className="p-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                  title="Delete User"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
