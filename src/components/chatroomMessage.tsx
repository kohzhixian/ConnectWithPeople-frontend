import { Doubletick } from "./Icons/Doubletick";

export const ChatroomMessage = ({
  text,
  time,
  status,
  sender,
  currentLoggedInUser,
}: {
  text: string;
  time: string;
  status: "sent" | "read";
  sender: string;
  currentLoggedInUser: string;
}) => {
  const isMessageSentByCurrentUser =
    sender === currentLoggedInUser ? true : false;
  return (
    <div className="w-full h-[33px] mb-1 pl-[71px] pr-[57px]">
      <div
        className={`flex items-center w-[100%] ${
          isMessageSentByCurrentUser ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`flex items-center justify-end pl-[9px] pt-1.5 pr-2 pb-2 ${
            isMessageSentByCurrentUser ? "bg-outgoingBackground" : "bg-white"
          } text-[#121212] text-sm rounded-l-lg`}
        >
          {text}
        </div>
        <div
          className={`flex items-center pt-[13.5px] pb-1 ${
            isMessageSentByCurrentUser ? "bg-outgoingBackground" : "bg-white"
          } text-[#121212] text-[11px]  rounded-r-lg w-[70px] gap-[3px]`}
        >
          <span>{time}</span>
          <Doubletick />
        </div>
      </div>
    </div>
  );
};
