import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("username is a required field")
    .min(8, "password must be at least 8 characters"),
  password: yup.string().required("password is a required field"),
});
