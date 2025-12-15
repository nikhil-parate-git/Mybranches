import { Formik, Form, Field, ErrorMessage } from "formik";
import { personalSchema } from "../validation/schemas";
import { useContext } from "react";
import { FormContext } from "../context/FormContext";

const Step1Personal = ({ next }) => {
  const { formData, setFormData } = useContext(FormContext);

  return (
    <Formik
      initialValues={formData.personal}
      validationSchema={personalSchema}
      onSubmit={(values) => {
        setFormData({ ...formData, personal: values });
        next();
      }}
    >
      <Form className="space-y-4">
        <Field name="name" placeholder="Full Name" className="input text-white" />
        <ErrorMessage name="name" component="p" className="text-red-500 text-sm"/>

        <Field name="email" placeholder="Email Address" className="input text-white" />
        <ErrorMessage name="email" component="p" className="text-red-500 text-sm"/>

        <button className="btn-primary">Next</button>
      </Form>
    </Formik>
  );
};

export default Step1Personal;
