import { CustomInputField } from "../CustomInputField";

export const LoginPageInputField = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-1">
      <p className="w-[120px]">{label}</p>
      <CustomInputField placeholder={placeholder} />
    </div>
  );
};
