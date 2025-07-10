import { useEffect } from "react";

type CellPosition = [number, number];

export function useKeyboardShortcuts({
  tableData,
  setTableData,
  selectedCell,
  setSelectedCell,
  editingCell,
  setEditingCell,
  selectedRange,
  setSelectedRange,
  setSelectionAnchor,
  history,
  setHistory,
  redoStack,
  setRedoStack,
  lastSnapshotRef,
  saveoncellchange,
}: {
  tableData: any[][];
  setTableData: (data: any[][]) => void;
  selectedCell: CellPosition | null;
  setSelectedCell: (cell: CellPosition | null) => void;
  editingCell: CellPosition | null;
  setEditingCell: (cell: CellPosition | null) => void;
  selectedRange: { start: CellPosition; end: CellPosition } | null;
  setSelectedRange: (range: { start: CellPosition; end: CellPosition } | null) => void;
  setSelectionAnchor: (anchor: CellPosition | null) => void;
  history: any[][][];
  setHistory: React.Dispatch<React.SetStateAction<any[][][]>>;
  redoStack: any[][][];
  setRedoStack: React.Dispatch<React.SetStateAction<any[][][]>>;
  lastSnapshotRef: React.MutableRefObject<string>;
  saveoncellchange: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey;
            if (e.key === "Escape") {
              e.preventDefault();
              console.log("Escape key pressed");
              setEditingCell(null);
            }
      // Copy
      if (isCtrl && e.key === "c") {
        if (!selectedRange && !selectedCell) return;
        const start = selectedRange?.start || selectedCell!;
        const end = selectedRange?.end || selectedCell!;

        const startRow = Math.min(start[0], end[0]);
        const endRow = Math.max(start[0], end[0]);
        const startCol = Math.min(start[1], end[1]);
        const endCol = Math.max(start[1], end[1]);

        let copiedText = "";
        for (let row = startRow; row <= endRow; row++) {
          const rowData = [];
          for (let col = startCol; col <= endCol; col++) {
            rowData.push(tableData?.[row]?.[col].value ?? "");
          }
          copiedText += rowData.join("\t") + "\n";
        }

        e.preventDefault();
        const textarea = document.createElement("textarea");
        textarea.value = copiedText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        return;
      }

      // Cut
      if (isCtrl && e.key === "x") {
        if (!selectedRange && !selectedCell) return;
        const start = selectedRange?.start || selectedCell!;
        const end = selectedRange?.end || selectedCell!;
        const startRow = Math.min(start[0], end[0]);
        const endRow = Math.max(start[0], end[0]);
        const startCol = Math.min(start[1], end[1]);
        const endCol = Math.max(start[1], end[1]);

        const updated = [...tableData];
        let copiedText = "";

        for (let row = startRow; row <= endRow; row++) {
          const rowData = [];
          for (let col = startCol; col <= endCol; col++) {
            rowData.push(updated[row][col].value);
            updated[row][col].value = "";
          }
          copiedText += rowData.join("\t") + "\n";
        }

        const textarea = document.createElement("textarea");
        textarea.value = copiedText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        e.preventDefault();
        setTableData(updated);
        return;
      }

      // Undo
      if (isCtrl && e.key === "z") {
        e.preventDefault();
        if (history.length === 0) return;

        const prev = JSON.parse(JSON.stringify(history[history.length - 1]));
        setRedoStack((r) => [tableData, ...r]);
        setTableData(prev);
        setHistory((h) => h.slice(0, -1));
        lastSnapshotRef.current = JSON.stringify(prev);
        return;
      }

      // Redo
      if (isCtrl && e.key === "y") {
        e.preventDefault();
        if (redoStack.length === 0) return;

        const next = redoStack[0];
        setTableData(next);
        setHistory((h) => [...h, tableData]);
        setRedoStack((r) => r.slice(1));
        lastSnapshotRef.current = JSON.stringify(next);
        return;
      }

      if (!selectedCell) return;
      const [row, col] = selectedCell;
      const maxRow = tableData.length - 1;
      const maxCol = tableData[0].length - 1;

      if (["Enter", "Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        let newRow = row;
        let newCol = col;

        if (e.key === "ArrowUp") newRow = Math.max(0, row - 1);
        else if (e.key === "ArrowDown") newRow = Math.min(maxRow, row + 1);
        else if (e.key === "ArrowLeft") newCol = Math.max(2, col - 1);
        else if (e.key === "ArrowRight") newCol = Math.min(maxCol, col + 1);
        else if (e.key === "Enter") newRow = Math.min(row + 1, maxRow);
        else if (e.key === "Tab") newCol = e.shiftKey ? col - 1 : col + 1;

        if (e.shiftKey && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
          const anchor = selectedRange?.start || selectedCell;
          setSelectedRange({ start: anchor, end: [newRow, newCol] });
        } else {
          setEditingCell([newRow, newCol]);
          setSelectedCell([newRow, newCol]);
          setSelectionAnchor([newRow, newCol]);
          setSelectedRange({ start: [newRow, newCol], end: [newRow, newCol] });
          saveoncellchange()
        }
      }

      // Escape

    };  

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    tableData,
    selectedCell,
    editingCell,
    selectedRange,
    history,
    redoStack,
  ]);
}
