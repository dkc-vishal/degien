import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "@/lib/api";
import { CellHistory } from "@/types";

interface CellHistoryModalProps {
  cellId: string;
  isVisible: boolean;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
}

const CellHistoryModal: React.FC<CellHistoryModalProps> = ({
  cellId,
  isVisible,
  onClose,
  triggerElement,
}) => {
  const [history, setHistory] = useState<CellHistory[]>([]);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [showAbove, setShowAbove] = useState(false);
  const [hasInitializedPosition, setHasInitializedPosition] = useState(false);

  useEffect(() => {
    if (isVisible && cellId) {
      loadCellHistory();
      // Reset positioning state when modal opens
      setHasInitializedPosition(false);
      setShowAbove(false);
    }
  }, [isVisible, cellId]);

  useEffect(() => {
    if (isVisible && triggerElement) {
      updatePosition();

      // Add scroll listener
      const handleScroll = () => updatePosition();
      const scrollContainer = triggerElement.closest(".overflow-auto");

      if (scrollContainer) {
        scrollContainer.addEventListener("scroll", handleScroll);
        return () =>
          scrollContainer.removeEventListener("scroll", handleScroll);
      }
    }
  }, [isVisible, triggerElement]);

  const updatePosition = () => {
    if (!triggerElement) return;

    const cellRect = triggerElement.getBoundingClientRect();

    const tableElement = triggerElement.closest("table") as HTMLElement;
    const scrollContainer = triggerElement.closest(
      ".overflow-auto"
    ) as HTMLElement;

    if (tableElement && scrollContainer) {
      const tableRect = tableElement.getBoundingClientRect();
      // const containerRect = scrollContainer.getBoundingClientRect();

      // ✅ Calculate position relative to the table element's position within the scroll container
      const cellRelativeToTable = {
        x: cellRect.left - tableRect.left,
        y: cellRect.top - tableRect.top,
      };

      // Position the modal to the right of the cell
      let modalX = cellRelativeToTable.x + cellRect.width + 5;
      let modalY = cellRelativeToTable.y;

      // ✅ Boundary checks relative to the visible scroll area
      const popupWidth = 320;
      const popupHeight = history.length === 0 ? 200 : 225;

      const visibleAreaWidth = scrollContainer.clientWidth;
      // const visibleAreaHeight = scrollContainer.clientHeight;

      // Get current scroll position
      const scrollLeft = scrollContainer.scrollLeft;
      // const scrollTop = scrollContainer.scrollTop;

      // Check if modal would go outside visible area horizontally
      const modalRightEdge = modalX - scrollLeft;
      if (modalRightEdge + popupWidth > visibleAreaWidth) {
        modalX = cellRelativeToTable.x - popupWidth - 5; // Show to the left instead
      }

      let shouldShowAbove = showAbove;

      if (!hasInitializedPosition) {
        const tableRows = tableElement.querySelectorAll("tbody tr");
        const currentRow = triggerElement.closest("tr");
        const rowIndex = currentRow
          ? Array.from(tableRows).indexOf(currentRow)
          : -1;
        const totalRows = tableRows.length;

        // ✅ If in last 3 rows or modal would exceed container
        const isLastFewRows = rowIndex >= totalRows - 4;
        // const modalBottom = cellRect.bottom + popupHeight;
        // const containerBottom = scrollContainer.getBoundingClientRect().bottom;
        // const wouldExceedContainer = modalBottom > containerBottom;

        if (isLastFewRows) {
          shouldShowAbove = true; // ✅ Set local variable immediately
          setShowAbove(true);
          console.log("Setting above - last few rows:", {
            rowIndex,
            totalRows,
            isLastFewRows,
          });
        }
        setHasInitializedPosition(true);
      }

      if (shouldShowAbove) {
        modalY =
          cellRelativeToTable.y - (history.length === 0 ? 200 : 225) - 10; // Extra 10px clearance
        console.log("Positioning modal above:", {
          cellY: cellRelativeToTable.y,
          modalY: modalY,
          popupHeight,
          shouldShowAbove,
        });
      }

      setPosition({ top: modalY, left: modalX });
    }
  };

  const loadCellHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_ENDPOINTS.cellHistory(cellId).url);
      const historyData = res.data.data;

      // Convert to array if it's an object
      const historyArray = Array.isArray(historyData)
        ? historyData
        : Object.values(historyData);

      setHistory(historyArray);
      setSelectedHistoryIndex(historyArray.length - 1);
    } catch (error) {
      console.error("Failed to load cell history:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="absolute bg-white border border-gray-300 rounded-lg shadow-lg w-80 z-10 transition-all duration-150 ease-out"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="border-b px-4 py-2 font-semibold text-gray-800 flex justify-between items-center">
        <span>Edit history</span>
        <div className="flex items-center space-x-2">
          {/* ✅ Add counter */}
          <span className="text-xs text-gray-500 min-w-[40px] text-center">
            {history.length > 0
              ? `${selectedHistoryIndex + 1}/${history.length}`
              : "0/0"}
          </span>

          {/* Previous Button */}
          <button
            disabled={selectedHistoryIndex <= 0}
            onClick={() => setSelectedHistoryIndex((i) => Math.max(i - 1, 0))}
            className={`text-lg px-1 transition ${
              selectedHistoryIndex <= 0
                ? "text-gray-300"
                : "text-green-700 hover:text-green-900 cursor-pointer"
            }`}
            title="Previous edit"
          >
            ❮
          </button>

          {/* Next Button */}
          <button
            disabled={selectedHistoryIndex >= history.length - 1}
            onClick={() =>
              setSelectedHistoryIndex((i) =>
                Math.min(i + 1, history.length - 1)
              )
            }
            className={`text-lg px-1 transition ${
              selectedHistoryIndex >= history.length - 1
                ? "text-gray-300"
                : "text-gray-500 hover:text-gray-800 cursor-pointer"
            }`}
            title="Next edit"
          >
            ❯
          </button>
        </div>
      </div>

      <div className="p-4 max-h-80 overflow-y-auto">
        {loading ? (
          <div className="text-center text-gray-500 py-4">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mx-auto mb-2"></div>
            Loading...
          </div>
        ) : history.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-3xl mb-2">📝</div>
            No history available
          </div>
        ) : (
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {history[selectedHistoryIndex]?.edited_by
                ?.charAt(0)
                .toUpperCase() || "?"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-800">
                {history[selectedHistoryIndex]?.edited_by || "Unknown"}
              </div>
              <div className="text-xs text-gray-500 mb-3">
                {new Date(
                  history[selectedHistoryIndex]?.created_at
                ).toLocaleString()}
              </div>
              {/* <div className="mt-1 text-sm text-gray-700">
                Previous value:{" "}
                <span className="italic text-red-500">
                  "{history[selectedHistoryIndex]?.old_value}"
                </span>
                <br />
                New value:{" "}
                <span className="italic text-green-600">
                  "{history[selectedHistoryIndex]?.new_value}"
                </span>
                <br />
                has_shape:{" "}
                {history[selectedHistoryIndex]?.has_shape ? "Yes" : "No"}
                <br />
                isHighlighted:{" "}
                {history[selectedHistoryIndex]?.is_highlighted ? "Yes" : "No"}
              </div> */}
              <div className="space-y-2 text-sm">
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600">Previous:</span>
                  <div className="bg-red-50 border border-red-200 rounded px-2 py-1 mt-1">
                    <span className="text-red-700 font-mono text-xs break-all">
                      "{history[selectedHistoryIndex]?.old_value || ""}"
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600">New:</span>
                  <div className="bg-green-50 border border-green-200 rounded px-2 py-1 mt-1">
                    <span className="text-green-700 font-mono text-xs break-all">
                      "{history[selectedHistoryIndex]?.new_value || ""}"
                    </span>
                  </div>
                </div>
              </div>

              {/* ✅ Enhanced metadata display */}
              <div className="flex gap-2 mt-3 text-xs">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    history[selectedHistoryIndex]?.has_shape
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  ⭐{" "}
                  {history[selectedHistoryIndex]?.has_shape
                    ? "Has Shape"
                    : "No Shape"}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    history[selectedHistoryIndex]?.is_highlighted
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  🎨{" "}
                  {history[selectedHistoryIndex]?.is_highlighted
                    ? "Highlighted"
                    : "Normal"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t text-right px-4 py-2">
        <button
          onClick={onClose}
          className="text-sm text-blue-500 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CellHistoryModal;
