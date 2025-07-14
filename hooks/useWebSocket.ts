// hooks/useWebSocket.ts
import { useEffect, useRef, useCallback } from "react";

type WebSocketCallback = (data: any) => void;

export const useWebSocket = (
  id: string,
  onMessage: WebSocketCallback
) => {
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {

    const ws = new WebSocket(
      `ws://128.100.10.108:8000/ws/v1/spreadsheet/spreadsheet/${id}/`
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
  }, [id, onMessage]);

  // sendData function to send a message through the socket
  const sendData = useCallback((data: any) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket not connected. Cannot send data.");
    }
  }, []);

  return sendData ;
};
