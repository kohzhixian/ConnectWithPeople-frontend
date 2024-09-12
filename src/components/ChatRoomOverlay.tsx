import { Fragment } from "react/jsx-runtime";
import { useGetChatroomDetailsByIdQuery } from "../services/chatroom.api";
import { TopPanel } from "./TopPanel";
import { useEffect, useState } from "react";
import { formattedChatroomMessageType } from "../types/chatRoomType";

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

  return (
    <Fragment>
      {chatroomDetailsIsLoading ? (
        "LOADING..."
      ) : (
        <div className="flex-1 relative h-full overflow-hidden">
          <TopPanel>
            <Fragment>{Object.keys(chatroomDetailsData)[0]}</Fragment>
          </TopPanel>
          {chatroomDetailsData &&
            !chatroomDetailsIsLoading &&
            chatroomName &&
            chatroomDetailsData[Object.keys(chatroomDetailsData)[0]].map(
              (data: formattedChatroomMessageType) => (
                <p key={data.id}>{data.text}</p>
              )
            )}
        </div>
      )}
    </Fragment>
  );
};
