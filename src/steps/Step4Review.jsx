import { useRecoilState } from "recoil";
import {
  currentFormState,
  usersState,
  selectedUserState,
} from "../recoil/atoms/FormAtom";

const Step4Review = ({ back, setStep }) => {
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

    setFormData({
      personal: { name: "", email: "" },
      address: { city: "", pincode: "" },
      document: null,
    });
    setSelectedUser(null);
    setStep(0);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-indigo-600 font-semibold text-lg">Review Details</h3>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
        <h4 className="font-semibold text-sm mb-2 text-indigo-600">Personal</h4>
        <p>Name: {formData.personal.name}</p>
        <p>Email: {formData.personal.email}</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
        <h4 className="font-semibold text-sm mb-2 text-indigo-600">Address</h4>
        <p>City: {formData.address.city}</p>
        <p>Pincode: {formData.address.pincode}</p>
      </div>

      {formData.document && typeof formData.document === "object" && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
          <h4 className="font-semibold text-sm mb-2 text-indigo-600">
            Document
          </h4>
          <img
            src={URL.createObjectURL(formData.document)}
            alt="Uploaded"
            className="w-full h-40 object-contain"
          />
        </div>
      )}

      <div className="flex gap-4 pt-2">
        <button onClick={back} className="btn-secondary text-black">
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
