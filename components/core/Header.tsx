"use client";
import { User } from "@/lib/api/types";
import { cacheUtils } from "@/lib/api/utils";
import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaMicrophone } from "react-icons/fa";
export default function Header({ toggleSidebar }: any) {
  const [isRecording, setIsRecording] = useState(false);
  const [micLoading, setMicLoading] = useState(false);
  const [sidebarLoading, setSidebarLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const [user, setUser] = useState<User | null>(null);

  const { getUser, setUser: cacheSetUser } = cacheUtils.auth;

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser!);
  }, []);

  const updateUser = (userData: User | null) => {
    cacheSetUser(userData!); // Update cache
    setUser(userData); // Update local React state
  };

  const handleSidebarToggle = async () => {
    if (sidebarLoading) return;

    setSidebarLoading(true);

    try {
      toggleSidebar();
      // Small delay to show loading effect
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error("Sidebar toggle failed:", error);
    } finally {
      setSidebarLoading(false);
    }
  };

  // const handleMicClick = async () => {
  //   if (!isRecording) {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         audio: true,
  //       });
  //       const mediaRecorder = new MediaRecorder(stream);
  //       recordedChunksRef.current = [];

  //       mediaRecorder.ondataavailable = (event) => {
  //         if (event.data.size > 0) {
  //           recordedChunksRef.current.push(event.data);
  //         }
  //       };

  //       mediaRecorder.onstop = () => {
  //         const audioBlob = new Blob(recordedChunksRef.current, {
  //           type: "audio/webm",
  //         });
  //         const audioUrl = URL.createObjectURL(audioBlob);
  //         const audio = new Audio(audioUrl);
  //         audio.play();
  //         console.log("Audio URL:", audioBlob);
  //       };

  //       mediaRecorder.start();
  //       mediaRecorderRef.current = mediaRecorder;
  //       setIsRecording(true);
  //       console.log("Started voice recording");
  //     } catch (err) {
  //       console.error("Microphone access error:", err);
  //     }
  //   } else {
  //     mediaRecorderRef.current?.stop();
  //     setIsRecording(false);
  //     console.log("Stopped voice recording");
  //   }
  // };

  const handleMicClick = async () => {
    if (micLoading) return;

    if (!isRecording) {
      setMicLoading(true);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const mediaRecorder = new MediaRecorder(stream);
        recordedChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(recordedChunksRef.current, {
            type: "audio/webm",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();
          console.log("Audio URL:", audioBlob);
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
        console.log("Started voice recording");
      } catch (err) {
        console.error("Microphone access error:", err);
      } finally {
        setMicLoading(false);
      }
    } else {
      setMicLoading(true);

      try {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
        console.log("Stopped voice recording");
      } catch (error) {
        console.error("Stop recording error:", error);
      } finally {
        setMicLoading(false);
      }
    }
  };

  return (
    <>
      <header className="bg-white border-b shadow-sm px-6 py-4 flex gap-2 justify-between items-center text-gray-800">
        {/* <div className="flex justify-between items-center"> */}
        {/* Left: Menu + Search + Mic */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleSidebarToggle}
            disabled={sidebarLoading}
            className={`text-black text-lg transition-all duration-200 relative ${
              sidebarLoading
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:text-gray-600"
            }`}
            title={sidebarLoading ? "Loading..." : "Toggle Sidebar"}
          >
            {sidebarLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            ) : (
              <FaBars />
            )}
          </button>

          <div className="w-82">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
        </div>

        <button
          onClick={handleMicClick}
          disabled={micLoading}
          className={`w-[800px] rounded-full flex items-center justify-center font-bold text-[30px] border-2 transition-all duration-200 relative ${
            micLoading
              ? "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
              : isRecording
              ? "bg-red-700 text-white border-red-900 animate-pulse shadow-[0_0_10px_red] hover:bg-red-800"
              : "bg-gray-200 text-black border-gray-400 hover:shadow-inner hover:bg-gray-300"
          }`}
          title={
            micLoading
              ? "Processing..."
              : isRecording
              ? "Stop Recording"
              : "Start Recording"
          }
        >
          {micLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current"></div>
              <span className="text-sm">Loading...</span>
            </div>
          ) : isRecording ? (
            <>
              <FaMicrophone className="animate-bounce" />
              <span className="text-sm tracking-widest ml-2">REC</span>
            </>
          ) : (
            <FaMicrophone />
          )}
        </button>

        {/* Right: Avatar + Name */}
        <div className="flex items-center space-x-3">
          <img
            src="https://i.pravatar.cc/32"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-semibold">
            Welcome,{" "}
            <span className="capitalize">
              {user?.name.split(" ")[0] ?? "Guest"}
            </span>
          </span>
        </div>
        {/* </div> */}
      </header>
    </>
  );
}
