import { CustomInputFieldInputType } from "../types/components/customInputField.type";

export const CustomButton = ({
  buttonLabel,
  buttonColor,
  hoverColor,
  handleButtonClicked,
  buttonType,
}: {
  buttonLabel: string;
  buttonColor: string;
  hoverColor: string;
  handleButtonClicked?: (e: React.MouseEvent<HTMLInputElement>) => void;
  buttonType: CustomInputFieldInputType;
}) => {
  return (
    <input
      type={buttonType}
      value={buttonLabel}
      className={`px-6 py-2 ${buttonColor} text-white font-bold rounded-md hover:${hoverColor} focus:outline-none hover:cursor-pointer`}
      onClick={handleButtonClicked}
    />
  );
};
