import { UseFormRegister } from "react-hook-form";
import { CustomInputFieldInputType } from "../types/components/customInputField.type";
import { LoginInputs } from "../types/reducer/authentication.type";

export const CustomInputField = ({
  placeholder,
  inputType,
  required,
  name,
  register,
}: {
  placeholder: string;
  inputType: CustomInputFieldInputType;
  required: boolean;
  name: keyof LoginInputs;
  register: UseFormRegister<LoginInputs>;
}) => {
  return (
    <input
      type={inputType}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...register(name, { required: required })}
    />
  );
};
