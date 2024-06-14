export const ChatRoomIcon = ({ imageIcon }: { imageIcon: string }) => {
  console.log("image icon: ", imageIcon);
  return (
    <img
      src={imageIcon}
      alt="chat room icon"
      className="h-[49px] w-[49px] rounded-full"
    />
  );
};
