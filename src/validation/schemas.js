import * as Yup from "yup";

export const personalSchema = Yup.object({
  name: Yup.string().required("Name required"),
  email: Yup.string().email().required("Email required"),
});

export const addressSchema = Yup.object({
  city: Yup.string().required("City required"),
  pincode: Yup.string().required("Pincode required"),
  
});

export const documentSchema = Yup.object().shape({
  document: Yup.mixed().required("Document is required"),
});
