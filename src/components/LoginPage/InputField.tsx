import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { CustomInputFieldInputType } from "../../types/components/customInputField.type";
import { CustomInputField } from "../CustomInputField";

export const InputField = <T extends Record<string, unknown>>({
  label,
  placeholder,
  inputType,
  register,
  name,
  errors,
  onChange,
}: {
  label: string;
  placeholder: string;
  inputType: CustomInputFieldInputType;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  onChange: () => void;
}) => {
  const error = errors[name];
  const errorText = typeof error?.message === "string" ? error.message : "";
  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-1">
        <p className="w-[120px]">{label}</p>
        <CustomInputField
          placeholder={placeholder}
          name={name}
          register={register}
          inputType={inputType}
          onChange={onChange}
        />
      </div>
      {errorText && <p className="text-xs text-red-500">{errorText}</p>}
    </div>
  );
};
