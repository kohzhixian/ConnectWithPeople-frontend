export const Textfield = ({ placeholder }: { placeholder: string }) => {
  return (
    <input
      type="search"
      className="search-textfield flex bg-backgroundDefaultActive text-start focus:outline-none focus:border-transparent w-full"
      placeholder={placeholder}
    />
  );
};
