import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { TokenDataType } from "../types/rtkQuery/authenticationApi.type";

interface WebSocketContextType {
  socket: Socket | null;
}

const WebSocketContext = createContext<WebSocketContextType>({ socket: null });
const tokenData = localStorage.getItem("token");

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:4000", {
      query: {
        token: tokenData,
      },
    });

    socketInstance.on("connect", () => {
      if (tokenData) {
        const decoded = jwtDecode<TokenDataType>(tokenData);
        if (decoded && decoded.phone_number) {
          socketInstance.emit("register-phone", decoded.phone_number);
        }
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWebSocket = () => useContext(WebSocketContext);
