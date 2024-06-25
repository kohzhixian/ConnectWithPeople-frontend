import { SearchIcon } from "./Icons/SearchIcon";
import { Textfield } from "./Textfield";

export const SearchTextfield = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="relative box-border flex justify-start items-center h-h_pane_subheader px-3 bg-white">
      <div className="relative flex flex-row overflow-hidden bg-backgroundDefaultActive rounded-lg w-full">
        <SearchIcon />
        <Textfield placeholder={placeholder} />
      </div>
    </div>
  );
};
