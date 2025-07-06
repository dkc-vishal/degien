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
  const handleMicClick = () => {
    setIsRecording((prev) => !prev);
    if (!isRecording) {
      // Start recording
      if (typeof window !== "undefined") {
        const SpeechRecognition =
          (window as any).SpeechRecognition ||
          (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
          alert("Speech Recognition not supported in this browser.");
          return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          console.log("Transcript:", transcript);
          alert("You said: " + transcript);
          // TODO: use transcript in your app logic
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
        recognitionRef.current = recognition;
        setIsRecording(true);
      }
    } else {
      // Stop recording
      recognitionRef.current?.stop();
      setIsRecording(false);
    }
    console.log(isRecording ? "Stopped Recording" : "Started Recording");
  };

  return (
    <>
      <header className="bg-white border-b shadow-sm px-6 py-4 flex gap-2 justify-between items-center text-gray-800">
        {/* <div className="flex justify-between items-center"> */}
        {/* Left: Menu + Search + Mic */}
        <div className="flex items-center justify-between gap-4">
            <button onClick={toggleSidebar} className="text-black text-lg">
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
