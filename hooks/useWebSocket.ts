// hooks/useWebSocket.ts
import { useEffect, useRef, useCallback } from "react";

type WebSocketCallback = (data: any) => void;

const BASE_WS_URL = process.env.NEXT_PUBLIC_WS_BASE_URL;

export const useWebSocket = (onMessage: WebSocketCallback) => {
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${BASE_WS_URL}/spreadsheet/spreadsheet/822d02cf-e5eb-4ac8-81c1-13e36406c1e6/`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (e) => {
      console.log("WebSocket closed:", e.code, e.reason);
    };

    socket.current = ws;

    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
  }, [onMessage]);

  // sendData function to send a message through the socket
  const sendData = useCallback((data: any) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket not connected. Cannot send data.");
    }
  }, []);

  return { sendData };
};
