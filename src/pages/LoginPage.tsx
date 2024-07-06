import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components/CustomButton";
import { LoginPageInputField } from "../components/LoginPage/LoginPageInputField";
import { loginSchema } from "../schemas/loginSchema";
import { LoginInputs } from "../types/reducer/authentication.type";

export const LoginPage = ({
  setIsValidUser,
}: {
  setIsValidUser: Dispatch<SetStateAction<boolean>>;
}) => {
  // constants
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange", //revalidate input fields during onChange
  });

  const loginFormOnSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
    setIsValidUser(true);
    navigate("/", { replace: true });
  };

  // functions
  const handleRegisterButtonClicked = (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    navigate("/register", { replace: false });
  };
  return (
    <div className="absolute mt-[19px] mb-[19px] inset-0 flex items-center justify-center">
      <div className="bg-customWhite w-full max-w-[1680px] h-full max-h-screen">
        <div className="flex flex-col w-full h-full overflow-hidden bg-orange-100">
          <div className="h-[108px] bg-teal-500 p-4 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">
              Connect With People
            </h1>
          </div>
          <form
            className="flex flex-1 items-center justify-center bg-gray-50 h-full"
            onSubmit={handleSubmit(loginFormOnSubmit)}
          >
            <div className="flex flex-col items-center justify-center gap-2 ">
              <LoginPageInputField
                label="Username:"
                placeholder="username"
                register={register}
                name="username"
                inputType="text"
                errors={errors}
                onChange={() => clearErrors("username")}
              />
              <LoginPageInputField
                label="Password:"
                placeholder="password"
                register={register}
                name="password"
                inputType="password"
                errors={errors}
                onChange={() => clearErrors("password")}
              />
              <div className="flex justify-end w-full gap-3">
                <CustomButton
                  buttonLabel="Login"
                  buttonColor="bg-blue-500"
                  hoverColor="bg-blue-600"
                  buttonType="submit"
                />
                <CustomButton
                  buttonLabel="Register"
                  buttonColor="bg-teal-500"
                  hoverColor="bg-teal-600"
                  handleButtonClicked={handleRegisterButtonClicked}
                  buttonType="button"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
