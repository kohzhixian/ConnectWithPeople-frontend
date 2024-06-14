import mockImage1 from "../assets/images/mock-test-image.jpg";
import mockImage2 from "../assets/images/mock-test-image2.jpg";
import { chatRoomInterface } from "../types/chatRoomType";

export const chat_room_dummy_data: chatRoomInterface[] = [
  {
    key: "1",
    sender: "Alfred",
    receiver: "receiver1",
    chatRoomImage: `${mockImage1}`,
    chatRoomTitle: "DOTA AARCANA REROLL GANG",
    messageSent: "hello world",
    dateMessageWasSent: "yesterday",
  },
  {
    key: "2",
    sender: "Dex",
    receiver: "receiver2",
    chatRoomImage: `${mockImage2}`,
    chatRoomTitle: "DOTA AARCANA REROLL GANG",
    messageSent: "hello world 1234",
    dateMessageWasSent: "16/06/2024",
  },
];
