export const SidebarItemDiv = ({
  id,
  isClicked,
  handleClick,
  handleContactsOnClick,
  contactName,
  phoneNum,
  children,
}: {
  id?: string;
  isClicked?: boolean;
  handleClick?: (id: string) => void;
  handleContactsOnClick?: (contactName: string, phoneNum: number) => void;
  contactName?: string;
  phoneNum?: number;
  children?: React.ReactElement;
}) => {
  return (
    <div
      className={`flex flex-row relative h-cellHeight w-[493px] ${
        isClicked ? "bg-backgroundDefaultActive" : "bg-white"
      }  hover:bg-backgroundDefaultActive hover:cursor-pointer`}
      onClick={() =>
        handleClick
          ? handleClick && handleClick(String(id))
          : handleContactsOnClick &&
            handleContactsOnClick(contactName!, phoneNum!)
      }
    >
      {children}
    </div>
  );
};
