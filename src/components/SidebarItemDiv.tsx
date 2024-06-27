export const SidebarItemDiv = ({
  id,
  isClicked,
  handleClick,
  children,
}: {
  id?: string;
  isClicked?: boolean;
  handleClick?: (id: string) => void;
  children?: React.ReactElement;
}) => {
  return (
    <div
      className={`flex flex-row relative h-cellHeight w-[493px] ${
        isClicked ? "bg-backgroundDefaultActive" : "bg-white"
      }  hover:bg-backgroundDefaultActive hover:cursor-pointer`}
      onClick={() => handleClick && handleClick(String(id))}
    >
      {children}
    </div>
  );
};
