import { useRecoilState } from "recoil";
import {
  currentFormState,
  usersState,
  selectedUserState,
} from "../recoil/atoms/FormAtom";

const Step4Review = ({ back, setStep, setCurrentView }) => {
  const [formData, setFormData] = useRecoilState(currentFormState);
  const [users, setUsers] = useRecoilState(usersState);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);

  const handleSubmit = () => {
    if (selectedUser !== null) {
      const updatedUsers = [...users];
      updatedUsers[selectedUser] = formData;
      setUsers(updatedUsers);
    } else {
      setUsers([...users, formData]);
    }

    // RESET FORM
    setFormData({
      personal: { name: "", email: "" },
      address: { city: "", pincode: "" },
      document: null,
    });

    setSelectedUser(null);
    setStep(0);

    // 🔥🔥 MOST IMPORTANT LINE 🔥🔥
    setCurrentView("users");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-indigo-600 font-semibold text-lg">Review Details</h3>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
        <p>Name: {formData.personal.name}</p>
        <p>Email: {formData.personal.email}</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
        <p>City: {formData.address.city}</p>
        <p>Pincode: {formData.address.pincode}</p>
      </div>

      <div className="flex gap-4 pt-2">
        <button onClick={back} className="btn-secondary">
          Back
        </button>
        <button onClick={handleSubmit} className="btn-primary w-full">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step4Review;
