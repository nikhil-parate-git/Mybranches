import { useContext, useState } from "react";
import { FormContext } from "../context/FormContext";
import { ThemeContext } from "../context/ThemeContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Step4Review = ({ back }) => {
  const { formData } = useContext(FormContext);
  const { theme } = useContext(ThemeContext); // theme context
  const [showDoc, setShowDoc] = useState(false);

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("name", formData.personal.name);//append is use to add data into an formdata
    fd.append("email", formData.personal.email);
    fd.append("city", formData.address.city);
    fd.append("pincode", formData.address.pincode);
    fd.append("document", formData.document);

    for (let pair of fd.entries()) {
      console.log(pair[0], pair[1]);  //Console me check karne ke liye data sahi ja raha ya nahi
    }

    toast.success("Registration Submitted successfully!!!");
  };

  const textColor = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <div className="space-y-4">
      {/* PERSONAL DETAILS */}
      <div className={`bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border`}>
        <h3 className="font-semibold text-sm mb-2 text-indigo-600">
          Personal Details
        </h3>
        <p className={`${textColor}`}>
          <b>Name:</b> {formData.personal.name}
        </p>
        <p className={`${textColor}`}>
          <b>Email:</b> {formData.personal.email}
        </p>
      </div>

      {/* ADDRESS DETAILS */}
      <div className={`bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border`}>
        <h3 className="font-semibold text-sm mb-2 text-indigo-600">
          Address Details
        </h3>
        <p className={`${textColor}`}>
          <b>City:</b> {formData.address.city}
        </p>
        <p className={`${textColor}`}>
          <b>Pincode:</b> {formData.address.pincode}
        </p>
      </div>

      {/* DOCUMENT BLOCK */}
      {formData.document && (
        <div className={`bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border`}>
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm text-indigo-600">
              Uploaded Document
            </h3>

            <button
              onClick={() => setShowDoc(!showDoc)}
              className="text-indigo-600 hover:text-indigo-800 transition"
              title={showDoc ? "Hide Document" : "View Document"}
            >
              {showDoc ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {showDoc && (
            <div className="mt-3">
              <img
                src={URL.createObjectURL(formData.document)}
                alt="Uploaded"
                className="w-full h-40 object-contain border rounded"
              />
              <p className="text-xs text-gray-500 mt-1">
                File: {formData.document.name}
              </p>
            </div>
          )}
        </div>
      )}

      {/* BUTTONS */}
      <div className="flex gap-4 pt-2">
        <button className="btn-secondary text-black" onClick={back}>
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step4Review;
