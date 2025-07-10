// hooks/useWebSocket.ts
import { useEffect, useRef } from "react";

type WebSocketCallback = (data: any) => void;

export const useWebSocket = (sheetid: string, onMessage: WebSocketCallback) => {
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!sheetid) return;

    const ws = new WebSocket(`ws://128.100.10.108:8000/ws/v1.0/notification/?sheet_id=${sheetid}`);

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
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, [sheetid, onMessage]);
};
