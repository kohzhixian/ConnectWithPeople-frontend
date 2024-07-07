import { CustomButton } from "../CustomButton";

export const ErrorModal = ({
  errorMsg,
  handleButtonClicked,
}: {
  errorMsg: string | undefined;
  handleButtonClicked: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center bg-white min-w-[300px] max-w-[400px] min-h-[150px] rounded-lg h-auto p-6 shadow-lg">
        <div className="flex flex-row mb-4">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
        </div>
        <div className="mb-4 w-full h-auto items-center justify-center flex">
          <p className="break-words">{errorMsg}</p>
        </div>
        <div className="mb-4">
          <CustomButton
            buttonColor="bg-red-600"
            buttonLabel="Close"
            buttonType="button"
            hoverColor="bg-red-700"
            handleButtonClicked={handleButtonClicked}
          />
        </div>
      </div>
    </div>
  );
};
