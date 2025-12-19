import { Formik, Form, Field, ErrorMessage } from "formik";
import { personalSchema } from "../validation/schemas";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentFormState } from "../recoil/atoms/FormAtom";
import { themeState } from "../recoil/atoms/ThemeAtom";

const Step1Personal = ({ next }) => {
  const [formData, setFormData] = useRecoilState(currentFormState);
  const theme = useRecoilValue(themeState);

  const textColor = theme === "dark" ? "text-stone-100" : "text-stone-800";
  const subTextColor = theme === "dark" ? "text-stone-400" : "text-stone-600";
  const borderColor =
    theme === "dark" ? "border-stone-200" : "border-stone-800";
  const inputTextColor = theme === "dark" ? "text-stone-50" : "text-stone-900";

  return (
    <Formik
      initialValues={formData.personal}
      enableReinitialize
      validationSchema={personalSchema}
      onSubmit={(values) => {
        setFormData({ ...formData, personal: values });
        next();
      }}
    >
      {() => (
        <Form className="max-w-md space-y-6">
          <div>
            <h2 className={`text-lg font-semibold ${textColor}`}>
              Personal Information
            </h2>
            <p className={`text-sm ${subTextColor}`}>
              Enter your basic personal details
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-sm font-medium ${textColor}`}>
              Full Name
            </label>
            <Field
              name="name"
              className={`w-full rounded-md border px-3 py-2 text-sm
                         ${inputTextColor}
                         ${borderColor}
                         bg-transparent
                         focus:outline-none focus:ring-2 focus:ring-emerald-600`}
            />
            <ErrorMessage
              name="name"
              component="p"
              className="text-xs text-red-600"
            />
          </div>

          <div className="space-y-1">
            <label className={`text-sm font-medium ${textColor}`}>
              Email Address
            </label>
            <Field
              name="email"
              className={`w-full rounded-md border px-3 py-2 text-sm
                         ${inputTextColor}
                         ${borderColor}
                         bg-transparent
                         focus:outline-none focus:ring-2 focus:ring-emerald-600`}
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-xs text-red-600"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full cursor-pointer active:scale-90 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white
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

export default Step1Personal;
