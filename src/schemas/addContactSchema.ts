import * as yup from "yup";

export const addContactSchema = yup.object().shape({
  phone_num: yup.number().required("phone number is a required field"),
});
