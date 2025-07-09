"use client";
import React, { useState, useRef } from "react";
import {
  FaBars,
  FaTachometerAlt,
  FaClipboardList,
  FaWrench,
  FaTools,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";
export default function Header({ sidebartoggle }: any) {
  const [isRecording, setIsRecording] = useState(false);
  const toggleSidebar = sidebartoggle;
  const recognitionRef = useRef<any>(null);
const mediaRecorderRef = useRef<MediaRecorder | null>(null);
const recordedChunksRef = useRef<Blob[]>([]);

const handleMicClick = async () => {
  if (!isRecording) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
    }
  } else {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    console.log("Stopped voice recording");
  }
};


  return (
    <>
      <header className="bg-white border-b shadow-sm px-6 py-4 flex gap-2 justify-between items-center text-gray-800">
        {/* <div className="flex justify-between items-center"> */}
        {/* Left: Menu + Search + Mic */}
        <div className="flex items-center justify-between gap-4">
            <button onClick={toggleSidebar} className="text-black text-lg cursor-pointer">
              <FaBars />
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
          className={`w-[800px] rounded-full flex items-center justify-center  font-bold text-[30px] border-2 ${
            isRecording
              ? "bg-red-700 text-white border-red-900 animate-pulse shadow-[0_0_10px_red]"
              : "bg-gray-200 text-black border-gray-400 hover:shadow-inner"
          }`}
          title={isRecording ? "Stop Recording" : "Start Recording"}
        >
          {isRecording ? (
            <>
              <FaMicrophone className="animate-bounce" />
              <span className="text-sm tracking-widest">REC</span>
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
          <span className="text-sm font-medium">Welcome, Vishal</span>
        </div>
        {/* </div> */}
      </header>
    </>
  );
}
