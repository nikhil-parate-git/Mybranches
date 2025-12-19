import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  currentFormState,
  usersState,
  selectedUserState,
} from "../recoil/atoms/FormAtom";
import { themeState } from "../recoil/atoms/ThemeAtom";

const Step4Review = ({ back, setStep }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(currentFormState);
  const [users, setUsers] = useRecoilState(usersState);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const theme = useRecoilValue(themeState);

  const textColor = theme === "dark" ? "text-stone-100" : "text-stone-800";
  const subTextColor = theme === "dark" ? "text-stone-400" : "text-stone-600";
  const borderColor =
    theme === "dark" ? "border-stone-600" : "border-stone-400";
  const bgColor = theme === "dark" ? "bg-stone-900" : "bg-stone-50";
  const btnBackText = theme === "dark" ? "text-stone-300" : "text-stone-700";
  const btnBackHover =
    theme === "dark" ? "hover:bg-stone-800" : "hover:bg-stone-200";

  const handleSubmit = () => {
    if (selectedUser !== null) {
      const updatedUsers = [...users];
      updatedUsers[selectedUser] = formData;
      setUsers(updatedUsers);
    } else {
      setUsers([...users, formData]);
    }

    setFormData({
      personal: { name: "", email: "" },
      address: { city: "", pincode: "" },
      document: null,
    });

    setSelectedUser(null);
    setStep(0);
    navigate("/users");
  };

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h2 className={`text-lg font-semibold ${textColor}`}>Review Details</h2>
        <p className={`text-sm ${subTextColor}`}>
          Please verify the information before submission
        </p>
      </div>

      <div
        className={`rounded-lg border ${borderColor} ${bgColor} p-4 space-y-1`}
      >
        <p className={`text-sm ${textColor}`}>
          <span className="font-medium">Name:</span> {formData.personal.name}
        </p>
        <p className={`text-sm ${textColor}`}>
          <span className="font-medium">Email:</span> {formData.personal.email}
        </p>
      </div>

      <div
        className={`rounded-lg border ${borderColor} ${bgColor} p-4 space-y-1`}
      >
        <p className={`text-sm ${textColor}`}>
          <span className="font-medium">City:</span> {formData.address.city}
        </p>
        <p className={`text-sm ${textColor}`}>
          <span className="font-medium">Pincode:</span>{" "}
          {formData.address.pincode}
        </p>
      </div>

      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={back}
          className={`w-full rounded-md cursor-pointer active:scale-90 border px-4 py-2 text-sm font-medium ${btnBackText} ${btnBackHover} transition-colors`}
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-md cursor-pointer active:scale-90 bg-emerald-600 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-emerald-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step4Review;
