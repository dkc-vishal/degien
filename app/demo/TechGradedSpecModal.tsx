"use client";
import React from "react";
import { RxCross2 } from "react-icons/rx";

export default function FitPopupModal({
  position,
  onClose,
}: {
  position: { top: number; left: number };
  onClose: () => void;
}) {
  const { top, left } = position;

  const popupStyle: React.CSSProperties = {
    position: "absolute",
    top,
    left,
    zIndex: 50,
    width: 320,
    backgroundColor: "#111827", // Tailwind gray-900
    borderRadius: 10,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.6)",
    border: "2px solid #3b82f6", // Tailwind blue-500
    padding: 16,
    fontFamily: "Arial, sans-serif",
    color: "#f9fafb", // Tailwind gray-50
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    fontSize: "13px",
    borderCollapse: "collapse",
    borderRadius: 6,
    overflow: "hidden",
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: "#1e40af", // Tailwind blue-900
    border: "1px solid #60a5fa", // Tailwind blue-400
    padding: "6px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#f9fafb",
  };

  const tdStyle: React.CSSProperties = {
    border: "1px solid #374151", // Tailwind gray-700
    padding: "6px",
    textAlign: "center",
    backgroundColor: "#1f2937", // Tailwind gray-800
    color: "#f3f4f6", // Tailwind gray-100
  };

  return (
    <div style={popupStyle}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-blue-300">
          Web 2 Data - Details
        </span>
        <button
          onClick={onClose}
          className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer scale-110 duration-300 flex"
        >
          <RxCross2 className="w-4 h-4"/>
        </button>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            {["Fit 1", "Fit 2", "PP1", "PP2", "PP3", "Top 1"].map((col) => (
              <th key={col} style={thStyle}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {[98, 96, 102, 99, 101, 97].map((val, i) => (
              <td key={i} style={tdStyle}>
                {val}
              </td>
            ))}
          </tr>
          <tr>
            {[97, 95, 103, 98, 100, 96].map((val, i) => (
              <td key={i} style={tdStyle}>
                {val}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}