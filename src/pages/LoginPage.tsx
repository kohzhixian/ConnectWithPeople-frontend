import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components/CustomButton";
import { InputField } from "../components/LoginPage/InputField";
import { ErrorModal } from "../components/modals/ErrorModal";
import { LoginPageConstants } from "../constants/LoginPage.constants";
import { useAppDispatch } from "../redux/hooks";
import { loginSuccess } from "../redux/reducers/authentication.reducer";
import { loginSchema } from "../schemas/loginSchema";
import { useLoginMutation } from "../services/authentication.api";
import { LoginInputs } from "../types/reducer/authentication.type";

export const LoginPage = () => {
  // constants
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  interface loginErrorMessage {
    status: number;
    data: { ErrorMessage: string };
  }
  // use states
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<loginErrorMessage | undefined>(
    undefined
  );

  // rtk query
  const [loginData, { isLoading: isPosting }] = useLoginMutation();

  // react hook form
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

  const loginFormOnSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const result = await loginData({
        username: data.username,
        password: data.password,
      }).unwrap();
      if (result) {
        localStorage.setItem("token", result.tokenData.token);
        dispatch(loginSuccess());
        navigate("/", { replace: true });
      } else {
        console.error("Login Failed");
      }
    } catch (err) {
      if (err) {
        setErrorMsg(err as loginErrorMessage);
        setShowErrorModal(true);
      }
    }
  };

  // functions
  const handleRegisterButtonClicked = (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    navigate("/register", { replace: false });
  };

  const handleErrorModalButtonClicked = () => {
    setShowErrorModal(false);
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
            autoComplete="off"
          >
            <div className="flex flex-col items-center justify-center gap-2 ">
              <InputField
                label="Username:"
                placeholder="username"
                register={register}
                name="username"
                inputType="text"
                errors={errors}
                onChange={() => clearErrors("username")}
              />
              <InputField
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
      {showErrorModal && (
        <ErrorModal
          errorMsg={
            LoginPageConstants.LOGIN_FAILED_MSG + errorMsg?.data?.ErrorMessage
              ? errorMsg?.data.ErrorMessage
              : ""
          }
          handleButtonClicked={handleErrorModalButtonClicked}
        />
      )}
    </div>
  );
};
