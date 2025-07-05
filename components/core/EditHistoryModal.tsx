import React from "react";

export default function EditHistoryModal({
  row,
  col,
  historyData,
  onClose,
}: {
  row: number;
  col: number;
  historyData: { value: string; editedBy: string; editedAt: string }[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-96 max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Edit History (R{row + 1}, C{col + 1})</h2>
          <button onClick={onClose} className="text-sm text-red-600">✕</button>
        </div>
        {historyData.length === 0 ? (
          <p className="text-sm text-gray-500">No edit history for this cell.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {historyData.map((entry, idx) => (
              <li key={idx} className="border-b pb-1">
                <div><strong>Value:</strong> {entry.value}</div>
                <div><strong>Edited By:</strong> {entry.editedBy || "Unknown"}</div>
                <div><strong>Edited At:</strong> {new Date(entry.editedAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
