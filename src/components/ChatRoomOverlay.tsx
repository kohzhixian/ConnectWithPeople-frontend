import { Fragment } from "react/jsx-runtime";
import { useGetChatroomDetailsByIdQuery } from "../services/chatroom.api";
import { TopPanel } from "./TopPanel";
import { useEffect, useState } from "react";
import { formattedChatroomMessageType } from "../types/chatRoomType";
import { TopPanelProfile } from "./TopPanelProfile";
import dayjs from "dayjs";
import { Doubletick } from "./Icons/Doubletick";
import { ChatroomMessage } from "./chatroomMessage";

export const ChatRoomOverlay = ({ chatroomId }: { chatroomId: string }) => {
  // rtk query
  const {
    data: chatroomDetailsData,
    error: chatroomDetailsError,
    isLoading: chatroomDetailsIsLoading,
  } = useGetChatroomDetailsByIdQuery(chatroomId, {
    skip: !chatroomId || chatroomId === "",
  });

  const chatroomName = chatroomDetailsData
    ? Object.keys(chatroomDetailsData)[0]
    : null;

  const convertISOstringToTime = (ISOstring: string) => {
    const date = new Date(ISOstring);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Fragment>
      {chatroomDetailsIsLoading ? (
        "LOADING..."
      ) : (
        <div className="flex-1 relative h-full overflow-hidden">
          <TopPanel>
            <div className="flex flex-row items-center gap-4">
              <TopPanelProfile />
              <div className="flex flex-col">
                <span className="text-base text-primaryStrong">
                  {Object.keys(chatroomDetailsData)[0]}
                </span>
                <span className="text-xs text-secondary">
                  Click here for group Info
                </span>
              </div>
            </div>
          </TopPanel>
          <div className="bg-chatroomBackground h-full">
            {chatroomDetailsData &&
              !chatroomDetailsIsLoading &&
              chatroomName &&
              chatroomDetailsData[Object.keys(chatroomDetailsData)[0]].map(
                (data: formattedChatroomMessageType) => (
                  <ChatroomMessage
                    key={data.id}
                    text={data.text}
                    time={convertISOstringToTime(data.updated_at)}
                    status="sent"
                  />
                )
              )}
          </div>
        </div>
      )}
    </Fragment>
  );
};
