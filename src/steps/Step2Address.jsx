import { Formik, Form, Field, ErrorMessage } from "formik";
import { addressSchema } from "../validation/schemas";
import { useContext } from "react";
import { FormContext } from "../context/FormContext";

const Step2Address = ({ next, back }) => {
  const { formData, setFormData } = useContext(FormContext);

  return (
    <Formik
      initialValues={formData.address}
      validationSchema={addressSchema}
      onSubmit={(values) => {
        setFormData({ ...formData, address: values });
        next();
      }}
    >
      <Form className="space-y-4">
        <Field name="city" placeholder="City" className="input  text-white" />
        <ErrorMessage name="city" component="p" className="text-red-500 text-sm"/>

        <Field name="pincode" placeholder="Pincode" className="input  text-white" />
        <ErrorMessage name="pincode" component="p" className="text-red-500 text-sm"/>

        <div className="flex gap-4">
          <button type="button" onClick={back} className="btn-secondary">
            Back
          </button>
          <button className="btn-primary">Next</button>
        </div>
      </Form>
    </Formik>
  );
};

export default Step2Address;
