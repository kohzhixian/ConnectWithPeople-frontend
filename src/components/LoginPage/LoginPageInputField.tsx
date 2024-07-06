import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";
import { LoginInputs } from "../../types/reducer/authentication.type";
import { CustomInputField } from "../CustomInputField";
import { CustomInputFieldInputType } from "../../types/components/customInputField.type";

export const LoginPageInputField = ({
  label,
  placeholder,
  inputType,
  register,
  name,
  errors,
}: {
  label: string;
  placeholder: string;
  inputType: CustomInputFieldInputType;
  name: keyof LoginInputs;
  register: UseFormRegister<LoginInputs>;
  errors: FieldErrors<LoginInputs>;
}) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-1">
        <p className="w-[120px]">{label}</p>
        <CustomInputField
          placeholder={placeholder}
          name={name}
          register={register}
          inputType={inputType}
        />
      </div>
      {errors[name] && (
        <p className="text-xs text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
};
