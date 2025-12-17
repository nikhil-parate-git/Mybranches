import { Formik, Form, Field, ErrorMessage } from "formik";
import { addressSchema } from "../validation/schemas";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentFormState } from "../recoil/atoms/FormAtom";
import { themeState } from "../recoil/atoms/ThemeAtom";

const Step2Address = ({ next, back }) => {
  const [formData, setFormData] = useRecoilState(currentFormState);
  const theme = useRecoilValue(themeState);

  const textColor = theme === "dark" ? "text-stone-100" : "text-stone-800";
  const subTextColor = theme === "dark" ? "text-stone-400" : "text-stone-600";
  const labelColor = theme === "dark" ? "text-stone-300" : "text-stone-700";
  const inputTextColor = theme === "dark" ? "text-stone-100" : "text-stone-800";
  const inputBgColor = theme === "dark" ? "bg-stone-900" : "bg-stone-50";
  const inputBorderColor =
    theme === "dark" ? "border-stone-600" : "border-stone-400";
  const backBtnText = theme === "dark" ? "text-stone-300" : "text-stone-700";
  const backBtnHover =
    theme === "dark" ? "hover:bg-stone-800" : "hover:bg-stone-200";

  return (
    <Formik
      initialValues={formData.address}
      enableReinitialize
      validationSchema={addressSchema}
      onSubmit={(values) => {
        setFormData({ ...formData, address: values });
        next();
      }}
    >
      {() => (
        <Form className="max-w-md space-y-6">
          <div>
            <h2 className={`text-lg font-semibold ${textColor}`}>
              Address Details
            </h2>
            <p className={`text-sm ${subTextColor}`}>
              Provide your current address information
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-sm font-medium ${labelColor}`}>City</label>
            <Field
              name="city"
              placeholder="Nagpur"
              className={`w-full rounded-md border px-3 py-2 text-sm
                         ${inputTextColor} ${inputBorderColor} ${inputBgColor}
                         focus:border-emerald-600 focus:outline-none`}
            />
            <ErrorMessage
              name="city"
              component="p"
              className="text-xs text-red-600"
            />
          </div>

          <div className="space-y-1">
            <label className={`text-sm font-medium ${labelColor}`}>
              Pincode
            </label>
            <Field
              name="pincode"
              placeholder="400001"
              className={`w-full rounded-md border px-3 py-2 text-sm
                         ${inputTextColor} ${inputBorderColor} ${inputBgColor}
                         focus:border-emerald-600 focus:outline-none`}
            />
            <ErrorMessage
              name="pincode"
              component="p"
              className="text-xs text-red-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={back}
              className={`w-full rounded-md border px-4 py-2 text-sm font-medium
                         ${backBtnText} ${backBtnHover} transition-colors`}
            >
              Back
            </button>

            <button
              type="submit"
              className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-stone-50
                         hover:bg-emerald-700 transition-colors"
            >
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Step2Address;
