import { useCallback } from "react";

type Cell = [number, number];

interface UseExcelNavigationProps {
  tableData: any[][];
  editingCell: Cell | null;
  setEditingCell: (cell: Cell | null) => void;
  setSelectedCell: (cell: Cell | null) => void;
  setSelectionAnchor: (cell: Cell | null) => void;
  setSelectedRange: (range: { start: Cell; end: Cell } | null) => void;
}

export const useExcelNavigation = ({
  tableData,
  editingCell,
  setEditingCell,
  setSelectedCell,
  setSelectionAnchor,
  setSelectedRange,
}: UseExcelNavigationProps) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!editingCell) return;

      const [row, col] = editingCell;
      const maxRow = tableData.length - 1;
      const maxCol = tableData[0].length - 1;

      const moveToCell = (newRow: number, newCol: number) => {
        const next: Cell = [newRow, newCol];
        setEditingCell(next);
        setSelectedCell(next);
        setSelectionAnchor(next);
        setSelectedRange({ start: next, end: next });

        setTimeout(() => {
          const el = document.querySelector(
            `[data-cell="${newRow}-${newCol}"]`
          ) as HTMLTextAreaElement;
          el?.focus();
          el?.select();
        }, 0);
      };

      if (e.key === "Escape") {
        e.preventDefault();
        setEditingCell(null);
        return;
      }

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        moveToCell(Math.min(row + 1, maxRow), col);
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        let nextCol = e.shiftKey ? col - 1 : col + 1;
        let nextRow = row;

        if (nextCol < 0) {
          nextCol = maxCol;
          nextRow = Math.max(0, row - 1);
        } else if (nextCol > maxCol) {
          nextCol = 0;
          nextRow = Math.min(maxRow, row + 1);
        }

        moveToCell(nextRow, nextCol);
        return;
      }

      // Optional: Arrow key navigation
      if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        let newRow = row;
        let newCol = col;

        if (e.key === "ArrowUp") newRow = Math.max(0, row - 1);
        else if (e.key === "ArrowDown") newRow = Math.min(maxRow, row + 1);
        else if (e.key === "ArrowLeft") newCol = Math.max(0, col - 1);
        else if (e.key === "ArrowRight") newCol = Math.min(maxCol, col + 1);

        moveToCell(newRow, newCol);
      }
    },
    [
      editingCell,
      tableData,
      setEditingCell,
      setSelectedCell,
      setSelectionAnchor,
      setSelectedRange,
    ]
  );

  return { handleKeyDown };
};
