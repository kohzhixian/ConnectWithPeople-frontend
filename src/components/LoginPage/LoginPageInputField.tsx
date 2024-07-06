import { FieldErrors, UseFormRegister } from "react-hook-form";
import { LoginInputs } from "../../types/reducer/authentication.type";
import { CustomInputField } from "../CustomInputField";
import { CustomInputFieldInputType } from "../../types/components/customInputField.type";

export const LoginPageInputField = ({
  label,
  placeholder,
  inputType,
  required,
  register,
  name,
  errors,
}: {
  label: string;
  placeholder: string;
  inputType: CustomInputFieldInputType;
  required: boolean;
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
          required={required}
          name={name}
          register={register}
          inputType={inputType}
        />
      </div>
      {errors[name] && (
        <span className="text-xs text-red-500">This field is required</span>
      )}
    </div>
  );
};
