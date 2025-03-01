import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { CustomInputFieldInputType } from "../types/components/customInputField.type";

interface CustomInputFieldProps<T extends FieldValues> {
  placeholder: string;
  inputType: CustomInputFieldInputType;
  name: Path<T>;
  register: UseFormRegister<T>;
  onChange: () => void;
}

export const CustomInputField = <T extends FieldValues>({
  placeholder,
  inputType,
  name,
  register,
  onChange,
}: CustomInputFieldProps<T>) => {
  return (
    <input
      type={inputType}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...register(name)}
      onChange={onChange}
      autoComplete="false"
    />
  );
};
