import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { currentFormState } from "../recoil/atoms/FormAtom";
import { themeState } from "../recoil/atoms/ThemeAtom";

const Step3Document = ({ next, back }) => {
  const [formData, setFormData] = useRecoilState(currentFormState);
  const theme = useRecoilValue(themeState);
  const [error, setError] = useState("");

  const textColor = theme === "dark" ? "text-stone-100" : "text-stone-800";
  const subTextColor = theme === "dark" ? "text-stone-400" : "text-stone-600";
  const borderColor =
    theme === "dark" ? "border-stone-600" : "border-stone-400";
  const bgColor = theme === "dark" ? "bg-stone-900" : "bg-stone-50";
  const btnBackText = theme === "dark" ? "text-stone-300" : "text-stone-700";
  const btnBackHover =
    theme === "dark" ? "hover:bg-stone-800" : "hover:bg-stone-200";

  const handleNext = () => {
    if (!formData.document) {
      setError("Document is required");
      return;
    }
    setError("");
    next();
  };

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h2 className={`text-lg font-semibold ${textColor}`}>
          Document Upload
        </h2>
        <p className={`text-sm ${subTextColor}`}>
          Upload a valid identification document
        </p>
      </div>

      <div
        className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center ${bgColor}`}
      >
        <input
          type="file"
          id="doc"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {
            setFormData({ ...formData, document: e.target.files[0] });
            setError("");
          }}
        />

        <label
          htmlFor="doc"
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <p className="text-emerald-600 font-medium">
            Click to upload document
          </p>
          <p className={`text-xs ${subTextColor}`}>
            Supported formats: PDF, JPG, PNG
          </p>

          {formData.document && (
            <p className={`text-sm ${textColor} mt-2`}>
              Selected:{" "}
              <span className="font-medium">{formData.document.name}</span>
            </p>
          )}
        </label>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={back}
          className={`w-full rounded-md border px-4 py-2 text-sm font-medium ${btnBackText} ${btnBackHover} transition-colors`}
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-emerald-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3Document;
