import { Formik, Form, Field, ErrorMessage } from "formik";
import { personalSchema } from "../validation/schemas";
import { useRecoilState } from "recoil";
import { currentFormState } from "../recoil/atoms/FormAtom";

const Step1Personal = ({ next }) => {
  const [formData, setFormData] = useRecoilState(currentFormState);

  return (
    <Formik
      initialValues={formData.personal}
      enableReinitialize={true}
      validationSchema={personalSchema}
      onSubmit={(values) => {
        setFormData({ ...formData, personal: values });
        next();
      }}
    >
      <Form className="space-y-4">
        <Field
          name="name"
          placeholder="Full Name"
          className="input text-white"
        />
        <ErrorMessage
          name="name"
          component="p"
          className="text-red-500 text-sm"
        />

        <Field
          name="email"
          placeholder="Email Address"
          className="input text-white"
        />
        <ErrorMessage
          name="email"
          component="p"
          className="text-red-500 text-sm"
        />

        <button className="btn-primary">Next</button>
      </Form>
    </Formik>
  );
};

export default Step1Personal;
