export const CustomButton = ({
  buttonLabel,
  buttonColor,
  hoverColor,
  handleButtonClicked,
}: {
  buttonLabel: string;
  buttonColor: string;
  hoverColor: string;
  handleButtonClicked: () => void;
}) => {
  return (
    <input
      type="button"
      value={buttonLabel}
      className={`px-6 py-2 ${buttonColor} text-white font-bold rounded-md hover:${hoverColor} focus:outline-none hover:cursor-pointer`}
      onClick={handleButtonClicked}
    />
  );
};
