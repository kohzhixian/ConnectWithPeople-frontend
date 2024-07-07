import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("username is a required field"),
  password: yup.string().required("password is a required field"),
});
