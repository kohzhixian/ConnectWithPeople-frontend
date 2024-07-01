export const CustomInputField = ({ placeholder }: { placeholder: string }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
};
