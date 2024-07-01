import { CustomButton } from "../components/CustomButton";
import { LoginPageInputField } from "../components/LoginPage/LoginPageInputField";

export const LoginPage = () => {
  return (
    <div className="absolute mt-[19px] mb-[19px] inset-0 flex items-center justify-center">
      <div className="bg-customWhite w-full max-w-[1680px] h-full max-h-screen">
        <div className="flex w-full h-full overflow-hidden items-center justify-center bg-orange-100">
          <div className="flex flex-col p-4 items-center justify-center gap-2 bg-gray-50">
            <LoginPageInputField label="Username:" placeholder="username" />
            <LoginPageInputField label="Password:" placeholder="password" />
            <div className="flex justify-end w-full gap-3">
              <CustomButton
                buttonLabel="Login"
                buttonColor="bg-blue-500"
                hoverColor="bg-blue-600"
              />
              <CustomButton
                buttonLabel="Register"
                buttonColor="bg-teal-500"
                hoverColor="bg-teal-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
