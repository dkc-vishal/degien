import React from "react";
import { FaCircleInfo } from "react-icons/fa6";

const TooltipLabel = ({
  label,
  tooltip,
  className = "text-sm text-gray-700 mb-1",
}: {
  label: string;
  tooltip?: string;
  className?: string;
}) => {
  const renderTooltip = (tooltip: string) => {
    return tooltip.split("\n").map((line, idx) => {
      const parts = line.split(":");
      if (parts.length === 2) {
        const [key, value] = parts;
        return (
          <div key={idx}>
            <strong>{key.trim()}:</strong> {value.trim()}
          </div>
        );
      } else {
        return <div key={idx}>{line}</div>;
      }
    });
  };

  return (
    <label className={`flex items-center gap-1 ${className}`}>
      {label}
      {tooltip && (
        <div className="relative group">
          <FaCircleInfo className="w-4 h-4 text-blue-400 cursor-pointer" />
          <div className="absolute left-5 top-0 z-10 hidden group-hover:block 
            bg-white text-black text-xs rounded px-2 py-1 w-max max-w-xs
            border border-black shadow-md whitespace-pre-wrap">
            {renderTooltip(tooltip)}
          </div>
        </div>
      )}
    </label>
  );
};

export default TooltipLabel;
