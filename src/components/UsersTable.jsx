import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  usersState,
  selectedUserState,
  currentFormState,
} from "../recoil/atoms/FormAtom";
import { themeState } from "../recoil/atoms/ThemeAtom";
import { Pencil, Trash2, FileText } from "lucide-react";

const UsersTable = ({ setStep }) => {
  const users = useRecoilValue(usersState);
  const theme = useRecoilValue(themeState);

  const setUsers = useSetRecoilState(usersState);
  const setSelectedUser = useSetRecoilState(selectedUserState);
  const setFormData = useSetRecoilState(currentFormState);

  const navigate = useNavigate();

  const handleEdit = (index) => {
    setSelectedUser(index);
    setFormData(users[index]);
    setStep(0);
    navigate("/wizard");
  };

  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  if (users.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        No users found
      </p>
    );
  }

  return (
    <div
      className={`p-6 rounded-xl border
        ${
          theme === "dark"
            ? "bg-slate-900 border-slate-700 text-slate-200"
            : "bg-slate-50 border-slate-300 text-slate-800"
        }`}
    >
      <h2 className="text-lg font-semibold mb-4">Users List</h2>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr
            className={`border-b
              ${
                theme === "dark"
                  ? "border-slate-700 text-slate-400"
                  : "border-slate-300 text-slate-600"
              }`}
          >
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">City</th>
            <th className="p-2 text-left">Pincode</th>
            <th className="p-2 text-left">Document</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => {
            const linkColor =
              theme === "dark" ? "text-slate-200" : "text-slate-600";
            return (
              <tr
                key={i}
                className={`border-b transition-colors
                  ${
                    theme === "dark"
                      ? "border-slate-700 hover:bg-slate-800"
                      : "border-slate-200 hover:bg-slate-100"
                  }`}
              >
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{u.personal.name}</td>
                <td className="p-2">{u.personal.email}</td>
                <td className="p-2">{u.address.city}</td>
                <td className="p-2">{u.address.pincode}</td>

                <td className="p-2">
                  {u.document ? (
                    <a
                      href={URL.createObjectURL(u.document)}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1 ${linkColor} hover:underline`}
                    >
                      <FileText size={15} />
                      View
                    </a>
                  ) : (
                    <span className="text-slate-400">No file</span>
                  )}
                </td>

                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(i)}
                    className="p-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    title="Edit User"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    onClick={() => handleDelete(i)}
                    className="p-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 transition"
                    title="Delete User"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
