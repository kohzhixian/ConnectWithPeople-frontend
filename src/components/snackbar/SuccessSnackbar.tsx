import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setShowSuccessSnackbar } from "../../redux/reducers/misc.reducer";

interface SuccessSnackbarInterface {
  message: string;
}

export const SuccessSnackbar = ({ message }: SuccessSnackbarInterface) => {
  // constants
  const dispatch = useAppDispatch();
  const miscSelector = useAppSelector((state) => state.misc);
  const showSuccessSnackbar = miscSelector.showSuccessSnackbar;

  // functions
  const handleDismissButtonOnClick = () => {
    dispatch(setShowSuccessSnackbar(false));
  };

  // use effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showSuccessSnackbar) {
        dispatch(setShowSuccessSnackbar(false));
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="
      fixed top-4 left-1/2 transform -translate-x-1/2 z-50
      flex w-full max-w-md bg-gray-800 text-white
      rounded shadow-lg overflow-hidden
    "
    >
      {/* Purple accent bar */}
      <div className="w-2 bg-purple-500"></div>

      {/* Content */}
      <div className="flex-1 p-4">
        <h2 className="font-semibold text-lg">Success</h2>
        <p className="text-sm">{message}</p>
      </div>

      {/* Dismiss button */}
      <button
        className="px-4 text-sm hover:bg-gray-700 focus:outline-none"
        onClick={handleDismissButtonOnClick}
      >
        DISMISS
      </button>
    </div>
  );
};
