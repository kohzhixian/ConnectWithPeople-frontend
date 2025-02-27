import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export const DropDownMenuOptions = ({
  setShowDropDownMenuOptions,
}: {
  setShowDropDownMenuOptions: Dispatch<SetStateAction<boolean>>;
}) => {
  const dropDownMenuOptionRef = useRef<HTMLDivElement>(null);

  // close dropdown when clicking anywhere outside the component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If the click is outside the dropdownRef, close the dropdown
      if (
        dropDownMenuOptionRef.current &&
        !dropDownMenuOptionRef.current.contains(event.target as Node)
      ) {
        setShowDropDownMenuOptions(false);
      }
    }

    // Listen for clicks on the entire document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-10"
      ref={dropDownMenuOptionRef}
    >
      <ul className="py-2">
        <li>
          <button
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => {
              setShowDropDownMenuOptions(false);
            }}
          >
            Add Contacts
          </button>
        </li>
      </ul>
    </div>
  );
};
