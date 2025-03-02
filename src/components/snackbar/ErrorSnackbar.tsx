import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setShowErrorSnackbar } from "../../redux/reducers/misc.reducer";

interface ErrorSnackbarInterface {
  message: string;
}

export const ErrorSnackbar = ({ message }: ErrorSnackbarInterface) => {
  // constants
  const dispatch = useAppDispatch();

  // functions
  const handleDismissButtonOnClick = () => {
    dispatch(setShowErrorSnackbar(false));
  };

  // use effect
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setShowErrorSnackbar(false));
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
      {/* Icon on the left */}
      <div className="flex items-center justify-center w-12 bg-red-600">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        <h2 className="font-semibold text-lg">Error</h2>
        <p className="text-sm">{message}</p>
      </div>

      {/* Dismiss button on the right */}
      <button
        className="px-4 text-sm hover:bg-gray-700 focus:outline-none"
        onClick={handleDismissButtonOnClick}
      >
        DISMISS
      </button>
    </div>
  );
};
