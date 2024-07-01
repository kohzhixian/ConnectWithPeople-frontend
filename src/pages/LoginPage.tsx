import { CustomButton } from "../components/CustomButton";
import { LoginPageInputField } from "../components/LoginPage/LoginPageInputField";

export const LoginPage = () => {
  return (
    <div className="absolute mt-[19px] mb-[19px] inset-0 flex items-center justify-center">
      <div className="bg-customWhite w-full max-w-[1680px] h-full max-h-screen">
        <div className="flex flex-col w-full h-full overflow-hidden bg-orange-100">
          <div className="h-[108px] bg-teal-500 p-4 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">
              Connect With People
            </h1>
          </div>
          <div className="flex flex-1 items-center justify-center bg-gray-50 h-full">
            <div className="flex flex-col items-center justify-center gap-2 ">
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
    </div>
  );
};
