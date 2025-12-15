import { useContext } from "react";
import { FormContext } from "../context/FormContext";

const Step3Document = ({ next, back }) => {
  const { formData, setFormData } = useContext(FormContext);

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-indigo-400 rounded-lg p-6 text-center">
        <input
          type="file"
          className="hidden"
          id="doc"
          onChange={(e) =>
            setFormData({ ...formData, document: e.target.files[0] })
          }
        />
        <label htmlFor="doc" className="cursor-pointer">
          <p className="text-indigo-600 font-semibold">Upload Document</p>
          <p className="text-sm text-gray-500">PDF / JPG / PNG</p>
        </label>
      </div>

      <div className="flex gap-4">
        <button onClick={back} className="btn-secondary">Back</button>
        <button onClick={next} className="btn-primary">Next</button>
      </div>
    </div>
  );
};

export default Step3Document;
