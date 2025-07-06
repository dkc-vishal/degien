"use client";
import ImageEditorModal from "@/components/image-editor/ImageEditorModal";
import { toast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react"; // Make sure useRef is imported
import React, { useState } from "react";

export interface Issue {
  id: string;
  // description: string;
  images: string[];
  status?: string;
  priority?: string;
  createdDate?: string;
}
import {
  FaBars,
  FaTachometerAlt,
  FaClipboardList,
  FaWrench,
  FaTools,
} from "react-icons/fa";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";
import { IssueImage } from "@/types";
import { Button } from "../ui/button";
import { X } from "lucide-react";
export default function Table({
  tablename,
  col,
  row,
  imagecol,
  imagecol2,
  columnheaders,
  spreadsheet
}: any) {
  const [frozenColIndices, setFrozenColIndices] = useState<number[]>(spreadsheet.grid_dimensions.frozen_columns || []);
  const [selectedHistory, setSelectedHistory] = useState<{
    key: string;
    row: number;
    col: number;
    x: number;
    y: number;
    history: {
      oldValue: string;
      newValue: string;
      editedBy: string;
      editedAt: string;
    }[];
  } | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  type TableRow = (string | string[])[];
  const [cellShapes, setCellShapes] = useState<Record<string, string>>({});

  const [draggedRowIndex, setDraggedRowIndex] = useState<number | null>(null);
  const [draggedColIndex, setDraggedColIndex] = useState<number | null>(null);
  const draggedImageSource = useRef<string | null>(null);
  const draggedImageOrigin = useRef<[number, number] | null>(null);
  // State for Image Editor Modal
  const [editingImageInfo, setEditingImageInfo] = useState<{
    issueId: string;
    image: IssueImage;
  } | null>(null);
  const [imageSeleted, setimageSeleted] = useState({
    rownumber: 0,
    colnumber: 0,
    imgindex: 0,
  });
  const [contextMenu2, setContextMenu2] = useState<{
    visible: boolean;
    x: number;
    y: number;
    targetImage: string | null; // image src for copy
  }>({
    visible: false,
    x: 0,
    y: 0,
    targetImage: null,
  });

  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollDirectionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  
  const [columnHeaders, setColumnHeaders] = useState(
    Array.from({ length: col }, (_, colIndex) =>
      colIndex === imagecol || colIndex === imagecol2
        ? "Measurement Picture"
        : columnheaders[colIndex].header
    )
  );
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shareddata = localStorage.getItem(`table_data_${tablename}`);
    if (shareddata) {
      setTableData(JSON.parse(shareddata));
    }
  }, []);
  const [colWidths, setColWidths] = useState(
    Array.from({ length: columnheaders.length }, (_,i) => columnheaders[i]) // Default width of 100 if not specified
  );
  const isResizing = useRef(false);
  const resizingColIndex = useRef<number | null>(null);
  const [copiedImage, setCopiedImage] = useState<string | null>(null);
  // const handleMouseMove = (e: MouseEvent) => {
  //   if (resizingColIndex.current === null) return;

  //   const thElements = document.querySelectorAll("th");
  //   const th = thElements[resizingColIndex.current] as HTMLElement;

  //   if (th) {
  //     const newWidth = e.clientX - th.getBoundingClientRect().left;
  //     if (newWidth > 20) {
  //       th.style.width = `${newWidth}px`;
  //       const updatedWidths = [...colWidths];
  //       updatedWidths[resizingColIndex.current] = newWidth;
  //       setColWidths(updatedWidths);
  //       localStorage.setItem(
  //         `table_colWidths_${tablename}`,
  //         JSON.stringify(updatedWidths)
  //       );
  //     }
  //   }
  // };

  const resizeStartX = useRef(0);
  const resizeStartWidth = useRef(0);

  // const handleMouseMove = (e: MouseEvent) => {
  //   if (resizingColIndex.current === null) return;

  //   const startX = resizeStartX.current;
  //   const currentX = e.clientX;
  //   const delta = currentX - startX;

  //   const updated = [...colWidths];
  //   const newWidth = resizeStartWidth.current + delta;

  //   if (newWidth > 20 && newWidth < 500) {
  //     updated[resizingColIndex.current] = newWidth;
  //     setColWidths(updated);
  //   }
  //   localStorage.setItem(
  //     `table_colWidths_${tablename}`,
  //     JSON.stringify(updated)
  //   );
  // };

  const handleMouseMove = (e: MouseEvent) => {
    if (resizingColIndex.current === null) return;

    const startX = resizeStartX.current;
    const currentX = e.clientX;
    const delta = currentX - startX;

    const updated = [...colWidths];
    const newWidth = resizeStartWidth.current + delta;

    if (newWidth > 30 && newWidth < 1000) {
      console.log(resizingColIndex.current);
      updated[resizingColIndex.current].width = newWidth;
      setColWidths(updated);
    }
    localStorage.setItem(
      `table_colWidths_${tablename}`,
      JSON.stringify(updated)
    );
  };
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(0);

  const handleMouseUp = () => {
    isResizing.current = false;
    resizingColIndex.current = null;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const handleOpenImageEditor = (issueId: string, image: IssueImage) => {
    setEditingImageInfo({ issueId, image });
    setIsImageEditorOpen(true);
  };
  const handleCloseImageEditor = () => {
    setIsImageEditorOpen(false);
    setEditingImageInfo(null);
  };

  const handleSaveEditedImage = (newImageDataUrl: string) => {
    const { rownumber, colnumber, imgindex } = imageSeleted;
    setTableData((prevData) => {
      const newData = [...prevData];
      const row = [...newData[rownumber]];
      const images = [...(row[colnumber] as string[])];

      images[imgindex] = newImageDataUrl; // Replace image at index
      row[colnumber] = images;
      newData[rownumber] = row;

      return newData;
    });
    toast({
      title: "Image updated",
      description: "Your changes have been saved.",
    });
    handleCloseImageEditor();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tableRef.current &&
        !tableRef.current.contains(event.target as Node)
      ) {
        setSelectedCell(null);
        setSelectedRange(null);
        setSelectionAnchor(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [tableData, setTableData] = useState<TableRow[]>(
    Array.from({ length: row }, () =>
      Array.from({ length: col }, (_, colIndex) =>
        columnHeaders[colIndex] === "Measurement Picture" ? [] : ""
      )
    )
  );
  const [autofillStart, setAutofillStart] = useState<[number, number] | null>(
    null
  );
  const [autofillTarget, setAutofillTarget] = useState<[number, number] | null>(
    null
  );

  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    row: number;
    col: number;
  } | null>(null);
  const [hoveredImage, setHoveredImage] = useState<{
    row: number;
    col: number;
    index: number;
  } | null>(null);

  const [contextMenu1, setContextMenu1] = useState<{
    visible: boolean;
    x: number;
    y: number;
    row: number | null;
    col: number;
    isHeader?: boolean;
  } | null>(null);

  const [selectionAnchor, setSelectionAnchor] = useState<
    [number, number] | null
  >(null);
  const [editingCell, setEditingCell] = useState<[number, number] | null>(null);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isFocusedEdit, setIsFocusedEdit] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{
    start: [number, number];
    end: [number, number];
  } | null>(null);
  const [history, setHistory] = useState<TableRow[][]>([]);
  const [redoStack, setRedoStack] = useState<TableRow[][]>([]);
  const lastSnapshotRef = useRef<string>("");
  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    startRow: number,
    startCol: number
  ) => {
    e.preventDefault();
    console.log(e.clipboardData);
    const clipboard = e.clipboardData.getData("text");

    const rows = clipboard
      .split(/\r?\n/) // No trim!
      .map((row) => row.split("\t"));

    // Clone current table
    let updated = [...tableData];

    // 🆕 Auto-expand rows if needed
    while (updated.length < startRow + rows.length) {
      updated.push(Array(updated[0].length).fill(""));
    }

    // 🆕 Auto-expand columns if needed
    while (updated[0].length < startCol + rows[0].length) {
      updated = updated.map((row) => [
        ...row,
        ...Array(startCol + rows[0].length - row.length).fill(""),
      ]);
    }

    // Paste the copied values into the updated table
    rows.forEach((row, rowOffset) => {
      row.forEach((value, colOffset) => {
        const r = startRow + rowOffset;
        const c = startCol + colOffset;
        updated[r][c] = value;
      });
    });
    pushToHistory(tableData);

    setTableData(updated);
  };
  useEffect(() => {
    localStorage.setItem(`table_data_${tablename}`, JSON.stringify(tableData));
  }, [tableData]);
  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard" },
    { icon: <FaClipboardList />, label: "Tech Specs" },
    { icon: <FaTools />, label: "Inspections" },
    { icon: <FaWrench />, label: "Settings" },
  ];
  const [searchTerm, setSearchTerm] = useState("");

  // Table: 5 rows x 12 cols, with editable default values

  const isCellInRange = (row: number, col: number) => {
    if (!selectedRange) return false;

    const [r1, c1] = selectedRange.start;
    const [r2, c2] = selectedRange.end;
    const rowMin = Math.min(r1, r2),
      rowMax = Math.max(r1, r2);
    const colMin = Math.min(c1, c2),
      colMax = Math.max(c1, c2);

    return row >= rowMin && row <= rowMax && col >= colMin && col <= colMax;
  };

  const pushToHistory = (data: TableRow[]) => {
    const snapshot = JSON.stringify(data);
    if (snapshot === lastSnapshotRef.current) return;

    lastSnapshotRef.current = snapshot;
    setHistory((prev) => [...prev, JSON.parse(snapshot)]);
    setRedoStack([]); // clear redo on new action
  };
  const [editHistoryMap, setEditHistoryMap] = useState<
    Record<
      string,
      {
        oldValue: string;
        newValue: string;
        editedBy: string;
        editedAt: string;
      }[]
    >
  >({});

  const handleCellChange = (row: number, col: number, value: string) => {
    pushToHistory(tableData); // ✅ Store before editing
    const oldValue = tableData[row][col] as string;

    const key = `${row}-${col}`;
    const updated = [...tableData];
    updated[row][col] = value;
    setTableData(updated);
    setEditHistoryMap((prev) => ({
      ...prev,
      [key]: [
        ...(prev[key] || []),
        {
          oldValue: oldValue,
          newValue: value,
          editedBy: "vishal",
          editedAt: new Date().toLocaleString(),
        },
      ],
    }));
  };

  const autoResizeTextarea = (el: HTMLTextAreaElement) => {
    if (el && el.parentElement) {
      el.parentElement.style.height = "auto"; // Reset height
      el.parentElement.style.height = el.scrollHeight + "px";
    }
    // el.style.height = "auto"; // Reset height
  };
  const [cellColors, setCellColors] = useState<string[][]>(() =>
    tableData.map((row) => row.map(() => ""))
  );
  const autoResizeAllTextareas = (e: any) => {
    if (e && e.parentElement) {
      e.parentElement.style.height = "auto"; // Reset height
      e.parentElement.style.height = e.scrollHeight + "px";
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);
  const getImageAt = (row: number, col: number, index: number) => {
    return tableData[row][col][index]; // Example
  };

  const updateImageAt = (
    row: number,
    col: number,
    index: number,
    image: string
  ) => {
    const updated = [...tableData];
    if (Array.isArray(updated[row][col])) {
      (updated[row][col] as string[])[index] = image;
    }
    setTableData(updated);
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key.toLowerCase() === "c") {
          if (imageSeleted) {
            const { rownumber, colnumber, imgindex } = imageSeleted;
            const src = getImageAt(rownumber, colnumber, imgindex); // Your function to get image src
            setCopiedImage(src);
          }
        }
        if (e.key.toLowerCase() === "v") {
          if (copiedImage && imageSeleted) {
            const { rownumber, colnumber, imgindex } = imageSeleted;
            updateImageAt(rownumber, colnumber, imgindex, copiedImage);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [imageSeleted, copiedImage]);
  useEffect(() => {
    if (inputRef.current) {
      // inputRef.current.focus();
      // inputRef.current.select(); // Optional: selects all text
    }
  }, [editingCell]);
  //   useEffect(() => {
  //   console.log("Updated history:", history);
  // }, [history]);
  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if ((e.ctrlKey || e.metaKey) && e.key === "c") {
  //       if (!selectedRange && !selectedCell) return;

  //       let start: [number, number], end: [number, number];

  //       if (selectedRange) {
  //         ({ start, end } = selectedRange);
  //       } else if (selectedCell) {
  //         start = end = selectedCell;
  //       } else return;

  //       const startRow = Math.min(start[0], end[0]);
  //       const endRow = Math.max(start[0], end[0]);
  //       const startCol = Math.min(start[1], end[1]);
  //       const endCol = Math.max(start[1], end[1]);

  //       let copiedText = "";
  //       for (let row = startRow; row <= endRow; row++) {
  //         const rowData = [];
  //         for (let col = startCol; col <= endCol; col++) {
  //           rowData.push(tableData?.[row]?.[col] ?? "");
  //         }
  //         copiedText += rowData.join("\t") + "\n";
  //       }

  //       e.preventDefault();

  //       // ✅ Fallback method using execCommand
  //       const textarea = document.createElement("textarea");
  //       textarea.value = copiedText;
  //       document.body.appendChild(textarea);
  //       textarea.select();
  //       try {
  //         document.execCommand("copy");
  //         console.log("Copied to clipboard via fallback");
  //       } catch (err) {
  //         console.error("Fallback copy failed:", err);
  //       }
  //       document.body.removeChild(textarea);
  //     }
  //     if ((e.ctrlKey || e.metaKey) && e.key === "x") {
  //       console.log(!selectedRange && !selectedCell);
  //       if (!selectedRange && !selectedCell) return;

  //       let start: [number, number], end: [number, number];
  //       if (selectedRange) {
  //         ({ start, end } = selectedRange);
  //       } else if (selectedCell) {
  //         start = end = selectedCell;
  //       } else return;

  //       const startRow = Math.min(start[0], end[0]);
  //       const endRow = Math.max(start[0], end[0]);
  //       const startCol = Math.min(start[1], end[1]);
  //       const endCol = Math.max(start[1], end[1]);

  //       let copiedText = "";
  //       const updated = [...tableData];

  //       for (let row = startRow; row <= endRow; row++) {
  //         const rowData = [];
  //         for (let col = startCol; col <= endCol; col++) {
  //           rowData.push(updated[row][col]);
  //           updated[row][col] = ""; // Clear content
  //         }
  //         copiedText += rowData.join("\t") + "\n";
  //       }

  //       setTableData(updated);
  //       e.preventDefault();

  //       const textarea = document.createElement("textarea");
  //       textarea.value = copiedText;
  //       document.body.appendChild(textarea);
  //       textarea.select();
  //       document.execCommand("copy");
  //       document.body.removeChild(textarea);
  //     }
  //     // UNDO
  //     if ((e.ctrlKey || e.metaKey) && e.key === "z") {
  //       e.preventDefault();

  //       if (history.length === 0) return;

  //       const prev = JSON.parse(JSON.stringify(history[history.length - 1])); // deep clone

  //       console.log("Undoing to:", prev);

  //       setRedoStack((r) => [tableData, ...r]);
  //       setTableData(prev); // async
  //       setHistory((h) => h.slice(0, -1));
  //       lastSnapshotRef.current = JSON.stringify(prev);
  //     }

  //     if ((e.ctrlKey || e.metaKey) && e.key === "y") {
  //       e.preventDefault();
  //       if (redoStack.length === 0) return;

  //       const next = redoStack[0];
  //       setHistory((h) => [...h, tableData]);
  //       setTableData(next);
  //       setRedoStack((r) => r.slice(1));
  //       lastSnapshotRef.current = JSON.stringify(next);
  //     }

  //     if (e.key === "Enter" && selectedCell) {
  //       e.preventDefault();
  //       setEditingCell(selectedCell);
  //       return;
  //     }
  //     if (e.key === "Tab" && selectedCell) {
  //       e.preventDefault();
  //       setEditingCell(selectedCell);
  //       return;
  //     }

  //     if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
  //       e.preventDefault();
  //       setEditingCell(selectedCell);

  //       return;
  //     }

  //     // Escape to cancel editing
  //     if (e.key === "Escape" && editingCell) {
  //       e.preventDefault();

  //       setEditingCell(null);
  //       return;
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [
  //   selectedRange?.start?.toString(),
  //   selectedRange?.end?.toString(),
  //   selectedCell?.toString(),
  // ]);

  const insertRow = (index: number) => {
     pushToHistory(tableData); // ✅ Store before editing
    const newRow = new Array(tableData[0].length).fill("");
    const updated = [
      ...tableData.slice(0, index),
      newRow,
      ...tableData.slice(index),
    ];
    setTableData(updated);
  };

  const insertCol = (index: number) => {
     pushToHistory(tableData); // ✅ Store before editing
    // Update column headers
    const newHeaders = [...columnHeaders];
    newHeaders.splice(index, 0, "");
    setColumnHeaders(newHeaders);

    // Update table data
    const newData = tableData.map((row) => {
       pushToHistory(tableData); // ✅ Store before editing
      const newRow = [...row];
      newRow.splice(index, 0, "");
      return newRow;
    });
    setTableData(newData);

    // Update column widths
    const newWidths = [...colWidths];
    newWidths.splice(index, 0, 100); // 100 is default width; change as needed
    setColWidths(newWidths);
  };

  const deleteRow = (index: number) => {
     pushToHistory(tableData); // ✅ Store before editing
    if (tableData.length <= 1) return;
    const updated = [
      ...tableData.slice(0, index),
      ...tableData.slice(index + 1),
    ];
    setTableData(updated);
  };

  const deleteCol = (deleteIndex: number) => {
     pushToHistory(tableData); // ✅ Store before editing
    // Guard clause: don't allow deleting if there's only 1 column left
    if (columnHeaders.length <= 1) return;

    // Remove from headers
    const newHeaders = [...columnHeaders];
    newHeaders.splice(deleteIndex, 1);
    setColumnHeaders(newHeaders);

    // Remove from each row
    const newData = tableData.map((row) => {
      const newRow = [...row];
      newRow.splice(deleteIndex, 1);
      return newRow;
    });
    setTableData(newData);
  };

  const handleImagePasteOrDrop = (
    files: File[],
    rowIndex: number,
    colIndex: number
  ) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (imageFiles.length === 0) return;

    const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));

    setTableData((prev) => {
      const updated = [...prev];
      const current = updated[rowIndex][colIndex];

      const existingUrls = Array.isArray(current) ? current : [];
      const newUniqueUrls = imageUrls.filter(
        (url) => !existingUrls.includes(url)
      );

      updated[rowIndex][colIndex] = [...existingUrls, ...newUniqueUrls];
      return updated;
    });
  };
  const startAutoScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scroll = () => {
      if (!scrollDirectionRef.current) return;

      container.scrollBy(
        scrollDirectionRef.current.x,
        scrollDirectionRef.current.y
      );
      animationFrameRef.current = requestAnimationFrame(scroll);
    };

    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(scroll);
    }
  };

  const stopAutoScroll = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };
  useEffect(() => {
    const handleClick = () => {
      setContextMenu(null);
      // setSelectedHistory(null)
      setContextMenu1(null);
      setContextMenu2({ visible: false, x: 0, y: 0, targetImage: null }); // if you have a second context menu
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
  useEffect(() => {
    const savedColWidths = localStorage.getItem(`table_colWidths_${tablename}`);
    console.log(savedColWidths);
    if (savedColWidths) {
      setColWidths(JSON.parse(savedColWidths));
    }
  }, []);

  useEffect(() => {
    setCellColors((prevColors) =>
      tableData.map((row, rowIndex) =>
        row.map((_, colIndex) => prevColors[rowIndex]?.[colIndex] || "")
      )
    );
  }, [tableData]);
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent) => {
      // Convert MouseEvent to React.MouseEvent-like object
      handleMouseMoveForScroll({
        clientX: e.clientX,
        clientY: e.clientY,
        // @ts-ignore
        preventDefault: () => {},
      });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopAutoScroll);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopAutoScroll);
      stopAutoScroll();
    };
  }, [isDragging]);
  useEffect(() => {
    const handleClick = () => setContextMenu1(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  useEffect(() => {
    const savedWidths = localStorage.getItem(`table_colWidths_${tablename}`);
    if (savedWidths) {
      setColWidths(JSON.parse(savedWidths));
    }
  }, []);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // inputRef.current.select(); // Optional: selects all text
    }
  }, [editingCell]);

  const clearSelectedCells = () => {
    pushToHistory(tableData); // ✅ Store before editing
    if (!selectedRange) return;

    const { start, end } = selectedRange;
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;

    const newData = [...tableData];
    console.log(newData);
    for (
      let row = Math.min(startRow, endRow);
      row <= Math.max(startRow, endRow);
      row++
    ) {
      for (
        let col = Math.min(startCol, endCol);
        col <= Math.max(startCol, endCol);
        col++
      ) {
        newData[row][col] = ""; // Clear cell content
      }
    }

    setTableData(newData);
  };

  const handleMouseMoveForScroll = (e: {
    clientX: number;
    clientY: number;
  }) => {
    if (!isDragging || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const rect = container.getBoundingClientRect();
    const margin = 40;
    const speed = 15;

    const direction = { x: 0, y: 0 };

    if (e.clientY < rect.top + margin) direction.y = -speed;
    else if (e.clientY > rect.bottom - margin) direction.y = speed;

    if (e.clientX < rect.left + margin) direction.x = -speed;
    else if (e.clientX > rect.right - margin) direction.x = speed;

    scrollDirectionRef.current = direction;

    if (direction.x !== 0 || direction.y !== 0) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
  };

  function getColumnLetter(index: number): string {
    let result = "";
    while (index >= 0) {
      result = String.fromCharCode((index % 26) + 65) + result;
      index = Math.floor(index / 26) - 1;
    }
    return result;
  }

  const highlightRow = (rowIndex: number, color = "#fff3cd") => {
     pushToHistory(tableData); // ✅ Store before editing
    setCellColors((prev) => {
      const updated = [...prev];
      updated[rowIndex] = updated[rowIndex].map(() => color);
      return updated;
    });
  };
  const unhighlightRow = (rowIndex: number) => {
     pushToHistory(tableData); // ✅ Store before editing
    setCellColors((prev) => {
      const updated = [...prev];
      updated[rowIndex] = updated[rowIndex].map(() => "");
      return updated;
    });
  };
  const getStickyLeftOffset = (colIndex: number): string | undefined => {
    const frozen = [...frozenColIndices].sort((a, b) => a - b);
    let left = 0;
    for (const i of frozen) {
      if (i === colIndex) return `${left}px`;
      left += colWidths[i].width || 100; // fallback to 100px
    }
    return undefined;
  };
  const isCellInAutofillRange = (row: number, col: number): boolean => {
    if (!autofillStart || !autofillTarget) return false;

    const [startRow, startCol] = autofillStart;
    const [endRow, endCol] = autofillTarget;

    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);
    const minCol = Math.min(startCol, endCol);
    const maxCol = Math.max(startCol, endCol);

    return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol;
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // ensures the row doesn't jump to center
        inline: "nearest",
      });
    }
  }, [editingCell]);

  useEffect(() => {
    if (editingCell && inputRef.current && typeof window !== "undefined") {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }, [editingCell]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (autofillStart) {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        const td = target?.closest("td[data-row][data-col]") as HTMLElement;
        if (td) {
          const r = parseInt(td.dataset.row!, 10);
          const c = parseInt(td.dataset.col!, 10);
          setAutofillTarget([r, c]);
        }
      }
    };

    const handleMouseUp = () => {
      if (autofillStart && autofillTarget) {
        const [startRow, startCol] = autofillStart;
        const [endRow, endCol] = autofillTarget;
        const value = tableData[startRow][startCol];

        const updated = [...tableData];
        const deltaRow = endRow - startRow;
        const deltaCol = endCol - startCol;

        const isVertical = Math.abs(deltaRow) >= Math.abs(deltaCol);
        const fillDirection = isVertical ? "vertical" : "horizontal";

        const sourceValue = updated[startRow][startCol];

        {
          // Not numeric → fill with same value
          if (fillDirection === "vertical") {
            const min = Math.min(startRow, endRow);
            const max = Math.max(startRow, endRow);

            for (let r = min; r <= max; r++) {
              updated[r][startCol] = sourceValue;
            }
          } else {
            const min = Math.min(startCol, endCol);
            const max = Math.max(startCol, endCol);

            for (let c = min; c <= max; c++) {
              updated[startRow][c] = sourceValue;
            }
          }
        }

        setTableData(updated);
        // Optionally update history:
        // pushToHistory(updated);
      }

      setAutofillStart(null);
      setAutofillTarget(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [autofillStart, autofillTarget, tableData]);
  useKeyboardShortcuts({
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
  });
  return (
    <>
      {contextMenu1?.visible && (
        <ul
          className="absolute z-50 bg-white border rounded shadow-md"
          style={{ top: contextMenu1.y, left: contextMenu1.x }}
          onClick={() => setContextMenu1(null)}
        >
          {frozenColIndices.includes(contextMenu1.col) ? (
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setFrozenColIndices((prev) =>
                  prev.filter((i) => i !== contextMenu1.col)
                );
                setContextMenu1(null);
              }}
            >
              Unfreeze column
            </li>
          ) : (
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setFrozenColIndices((prev) => [...prev, contextMenu1.col]);
                setContextMenu1(null);
              }}
            >
              Freeze column
            </li>
          )}
        </ul>
      )}

      {contextMenu?.visible && (
        <div
          className="absolute bg-white border rounded shadow-md z-50 text-sm"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={() => setContextMenu(null)}
        >
          <ul>
            <li
              onClick={() => {
                insertRow(contextMenu.row);
                setContextMenu(null);
              }}
              className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
            >
              Insert Row Above
            </li>
            <li
              onClick={() => {
                insertRow(contextMenu.row + 1);
                setContextMenu(null);
              }}
              className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
            >
              Insert Row Below
            </li>
            <li
              onClick={() => {
                insertCol(contextMenu.col);
                setContextMenu(null);
              }}
              className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
            >
              Insert Column Left
            </li>
            <li
              onClick={() => {
                insertCol(contextMenu.col + 1);
                setContextMenu(null);
              }}
              className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
            >
              Insert Column Right
            </li>
            <li
              onClick={() => {
                highlightRow(contextMenu.row);
                setContextMenu(null);
              }}
              className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-yellow-600"
            >
              Highlight Row
            </li>
            <li
              onClick={() => {
                unhighlightRow(contextMenu.row);
                setContextMenu(null);
              }}
              className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-gray-600"
            >
              Unhighlight Row
            </li>
            <li
              onClick={() => {
                const key = `${contextMenu.row}-${contextMenu.col}`;
                setCellShapes((prev) => ({ ...prev, [key]: "star" }));
                setContextMenu(null);
              }}
              className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
            >
              Add Star
            </li>
            {contextMenu &&
              cellShapes[`${contextMenu.row}-${contextMenu.col}`] && (
                <li
                  onClick={() => {
                    const key = `${contextMenu.row}-${contextMenu.col}`;
                    const updated = { ...cellShapes };
                    delete updated[key];
                    setCellShapes(updated);
                    setContextMenu(null);
                  }}
                  className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                >
                  Remove Star
                </li>
              )}
            <li
              onClick={() => {
                deleteRow(contextMenu.row);
                setContextMenu(null);
              }}
              className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-red-500"
            >
              Delete Row
            </li>

            <li
              onClick={() => {
                deleteCol(contextMenu.col);
                setContextMenu(null);
              }}
              className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-red-500"
            >
              Delete Column
            </li>
            <li
              onClick={() => {
                const key = `${contextMenu.row}-${contextMenu.col}`;
                const history = editHistoryMap[key] || [];
                setSelectedHistory({
                  key,
                  row: contextMenu.row,
                  col: contextMenu.col,
                  x: contextMenu.x,
                  y: contextMenu.y,
                  history,
                });
                setSelectedHistoryIndex(history.length - 1);
                // setContextMenu(null);
              }}
              className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-blue-600"
            >
              View Edit History
            </li>
          </ul>
        </div>
      )}
      {contextMenu2.visible && (
        <div
          style={{
            position: "fixed",
            top: contextMenu2.y,
            left: contextMenu2.x,
            background: "#fff",
            border: "1px solid #ccc",
            zIndex: 1000,
            boxShadow: "0 0 6px rgba(0,0,0,0.2)",
          }}
          onClick={() => setContextMenu2({ ...contextMenu2, visible: false })}
        >
          <div
            onClick={() => {
              setCopiedImage(contextMenu2.targetImage);
              setContextMenu2({ ...contextMenu2, visible: false });
            }}
            style={{ padding: "8px", cursor: "pointer" }}
          >
            📋 Copy
          </div>
          <div
            onClick={() => {
              if (copiedImage) {
                // Do your paste logic here
                console.log("Paste image:", copiedImage);
                // For example: set image in the cell
              }
              setContextMenu2({ ...contextMenu2, visible: false });
            }}
            style={{ padding: "8px", cursor: "pointer" }}
          >
            📥 Paste
          </div>
        </div>
      )}
      {selectedHistory && selectedHistory.history.length > 0 && (
        <div
          className="absolute bg-white border border-gray-300 rounded-lg shadow-lg w-80 z-50"
          style={{
            top: selectedHistory.row + selectedHistory.y,
            left: selectedHistory.col + selectedHistory.x,
          }}
        >
          <div className="border-b px-4 py-2 font-semibold text-gray-800 flex justify-between items-center">
            <span>Edit history</span>
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                disabled={selectedHistoryIndex <= 0}
                onClick={() =>
                  setSelectedHistoryIndex((i) => Math.max(i - 1, 0))
                }
                className={`text-lg px-1 transition ${
                  selectedHistoryIndex <= 0
                    ? "text-gray-300"
                    : "text-green-700 hover:text-green-900"
                }`}
              >
                ❮
              </button>

              {/* Next Button */}
              <button
                disabled={
                  selectedHistoryIndex >= selectedHistory.history.length - 1
                }
                onClick={() =>
                  setSelectedHistoryIndex((i) =>
                    Math.min(i + 1, selectedHistory.history.length - 1)
                  )
                }
                className={`text-lg px-1 transition ${
                  selectedHistoryIndex >= selectedHistory.history.length - 1
                    ? "text-gray-300"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                ❯
              </button>
            </div>
          </div>

          <div className="p-4">
            {(() => {
              const entry = selectedHistory.history[selectedHistoryIndex];
              return (
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {entry.editedBy.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-800">
                      {entry.editedBy}
                    </div>
                    <div className="text-xs text-gray-500">
                      {entry.editedAt}
                    </div>
                    <div className="mt-1 text-sm text-gray-700">
                      Previous_value:{" "}
                      <span className="italic text-red-500">
                        "{entry.oldValue}"
                      </span>{" "}
                      <br />
                      New_Value:
                      <span className="italic text-green-600">
                        "{entry.newValue}"
                      </span>
                      <br />
                      has_shape:
                      <br />
                      isHighlighted:
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="border-t text-right px-4 py-2">
            <button
              onClick={() => {
                setSelectedHistory(null);
                setSelectedHistoryIndex(0);
              }}
              className="text-sm text-blue-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <main className="mt-4">
        <div className=" rounded-xl shadow" ref={tableRef}>
          {/* Table */}

          <div
            ref={scrollContainerRef}
            style={{ width: "100%" }}
            onMouseMove={handleMouseMoveForScroll}
          >
            <div
              className="removeminheight overflow-auto max-h-[800px] border rounded"
              style={{ width: "100%", overflow: "scroll" }}
            >
              <table className="table-fixed w-full text-sm border-content border-collapse">
                <colgroup>
                  {colWidths.map((w, i) => (
                    <col key={i} style={{ width: w.width }} />
                  ))}
                </colgroup>
                <thead>
                  <tr className=" sticky top-0 z-30 bg-white border border-gray-300 p-2 text-sm font-semibold">
                    {tableData[0]?.map((_, i) => (
                      <>
                        <th
                          key={i}
                          draggable
                          style={{
                            // position: "relative",
                            width: colWidths[i].width, // Set default width
                            minWidth: "50px",
                            maxWidth: "100px",
                            position: frozenColIndices.includes(i)
                              ? "sticky"
                              : "relative",
                            left: frozenColIndices.includes(i)
                              ? getStickyLeftOffset(i)
                              : undefined,
                            zIndex: frozenColIndices.includes(i)
                              ? 10
                              : undefined,
                            background: frozenColIndices.includes(i)
                              ? "#fff"
                              : undefined,
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            setContextMenu1({
                              visible: true,
                              x: e.pageX,
                              y: e.pageY,
                              row: null,
                              col: i,
                              isHeader: true,
                            });
                          }}
                          onDragStart={(e) => {
                            if (isResizing.current) {
                              e.preventDefault();
                              return;
                            }
                            setDraggedColIndex(i);
                          }}
                          onDrop={() => {
                            if (
                              draggedColIndex === null ||
                              draggedColIndex === i
                            )
                              return;
                            const updated = tableData.map((row) => {
                              const newRow = [...row];
                              const [moved] = newRow.splice(draggedColIndex, 1);
                              newRow.splice(i, 0, moved);
                              let temp = colWidths[i].width;
                              colWidths[i].width = colWidths[draggedColIndex].width;
                              colWidths[draggedColIndex].width = temp;
                              localStorage.setItem(
                                `table_colWidths_${tablename}`,
                                JSON.stringify(colWidths)
                              );

                              return newRow;
                            });
                            setTableData(updated);
                            console.log(updated);
                            setDraggedColIndex(null);
                          }}
                          onDragOver={(e) => e.preventDefault()}
                          className={`border   ${
                            isDragging ? "cursor-move" : "cursor-pointer"
                          } ${i === 0 ? "" : ""}`}
                        >
                          {getColumnLetter(i)}

                          {/* Resize Handle */}
                          <div
                            onMouseDown={(e) => {
                              isResizing.current = true;
                              resizingColIndex.current = i;
                              resizeStartX.current = e.clientX;
                              resizeStartWidth.current = colWidths[i].width;
                              console.log(colWidths, i);
                              document.addEventListener(
                                "mousemove",
                                handleMouseMove
                              );
                              document.addEventListener(
                                "mouseup",
                                handleMouseUp
                              );
                            }}
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              bottom: 0,
                              width: "6px",
                              cursor: "col-resize",
                              zIndex: 10,
                              userSelect: "none",
                            }}
                          />
                        </th>
                      </>
                    ))}
                  </tr>
                  <tr className="sticky top-0 z-30 bg-white border border-gray-300 p-2 text-sm font-semibold">
                    {columnHeaders?.map((_, i) => (
                      <>
                        <th
                          key={i}
                          draggable
                          style={{
                            // position: "relative",
                            width: colWidths[i].width, // Set default width
                            minWidth: "50px",
                            maxWidth: "500px",
                            position: frozenColIndices.includes(i)
                              ? "sticky"
                              : "relative",
                            left: frozenColIndices.includes(i)
                              ? getStickyLeftOffset(i)
                              : undefined,
                            zIndex: frozenColIndices.includes(i)
                              ? 10
                              : undefined,
                            background: frozenColIndices.includes(i)
                              ? "#fff"
                              : undefined,
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            setContextMenu1({
                              visible: true,
                              x: e.pageX,
                              y: e.pageY,
                              row: null,
                              col: i,
                              isHeader: true,
                            });
                          }}
                          onDragStart={(e) => {
                            if (isResizing.current) {
                              e.preventDefault();
                              return;
                            }
                            setDraggedColIndex(i);
                          }}
                          onDrop={() => {
                            if (
                              draggedColIndex === null ||
                              draggedColIndex === i
                            )
                              return;
                            const updated = tableData.map((row) => {
                              const newRow = [...row];
                              const [moved] = newRow.splice(draggedColIndex, 1);
                              newRow.splice(i, 0, moved);
                              let temp = colWidths[i].width;
                              colWidths[i].width = colWidths[draggedColIndex].width;
                              colWidths[draggedColIndex].width = temp;
                              localStorage.setItem(
                                `table_colWidths_${tablename}`,
                                JSON.stringify(colWidths)
                              );

                              return newRow;
                            });
                            setTableData(updated);
                            console.log(updated);
                            setDraggedColIndex(null);
                          }}
                          onDragOver={(e) => e.preventDefault()}
                          className={`border  
                          }  ${isDragging ? "cursor-move" : "cursor-pointer"} ${
                            i === 0 ? "" : ""
                          }`}
                        >
                          {columnHeaders[i]}

                          {/* Resize Handle */}
                          <div
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              isResizing.current = true;
                              resizingColIndex.current = i;
                              document.addEventListener(
                                "mousemove",
                                handleMouseMove
                              );
                              document.addEventListener(
                                "mouseup",
                                handleMouseUp
                              );
                            }}
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              bottom: 0,
                              width: "6px",
                              cursor: "col-resize",
                              zIndex: 10,
                              userSelect: "none",
                            }}
                          />
                        </th>
                      </>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {tableData
                    .filter((row) =>
                      row.some(
                        (cell) =>
                          typeof cell === "string" &&
                          cell.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                    )
                    .map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`bg-white even:bg-gray-50 `}
                      >
                        {row.map((cell, colIndex) => {
                          if (false) return null;

                          return colIndex === 0 ? (
                            <td
                              style={{
                                backgroundColor:
                                  cellColors?.[rowIndex]?.[colIndex] || "bg-slate-200",
                                width: colWidths[colIndex].width,
                                minWidth: 50,
                                textAlign: "center",
                                position: true ? "sticky" : undefined,
                                left: true
                                  ? getStickyLeftOffset(colIndex)
                                  : undefined,
                                zIndex: true ? 9 : undefined,
                              }}
                              key={colIndex}
                              className={` border bg-slate-200 ${
                                draggedRowIndex
                                  ? "cursor-grabbing"
                                  : "cursor-grab"
                              }`}
                              draggable
                              onDragStart={() => setDraggedRowIndex(rowIndex)}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={() => {
                                if (
                                  draggedRowIndex === null ||
                                  draggedRowIndex === rowIndex
                                )
                                  return;
                                const updated = [...tableData];
                                const [draggedRow] = updated.splice(
                                  draggedRowIndex,
                                  1
                                );
                                updated.splice(rowIndex, 0, draggedRow);
                                setTableData(updated);
                                setDraggedRowIndex(null);
                              }}
                            >
                              <RxDragHandleDots2 />
                            </td>
                          ) : colIndex === 1 ? (
                            <td
                              className={`border bg-slate-200`}
                              style={{
                                textAlign: "center",
                                position: true ? "sticky" : undefined,
                                left: true
                                  ? getStickyLeftOffset(colIndex)
                                  : undefined,
                                zIndex: true ? 9 : undefined,
                              }}
                            >
                              {rowIndex + 1}
                            </td>
                          ) : columnHeaders[colIndex] ===
                            "Measurement Picture" ? (
                            rowIndex === -1 ? (
                              <td>
                                <textarea
                                  value={columnHeaders[colIndex]}
                                  readOnly={
                                    !(
                                      editingCell?.[0] === rowIndex &&
                                      editingCell?.[1] === colIndex
                                    )
                                  }
                                  onChange={(e) => {
                                    handleCellChange(
                                      rowIndex,
                                      colIndex,
                                      e.target.value
                                    );
                                    autoResizeTextarea(e.target);
                                  }}
                                  onDoubleClick={() => {
                                    setEditingCell([rowIndex, colIndex]);
                                  }}
                                  onBlur={() => {
                                    setEditingCell(null);
                                  }}
                                  onPaste={(e) => {
                                    handlePaste(e, rowIndex, colIndex);
                                    setTimeout(
                                      () =>
                                        autoResizeTextarea(
                                          e.target as HTMLTextAreaElement
                                        ),
                                      0
                                    );
                                  }}
                                  onMouseDown={() => {
                                    setSelectionAnchor([rowIndex, colIndex]);
                                    setSelectedCell([rowIndex, colIndex]);
                                    setSelectedRange({
                                      start: [rowIndex, colIndex],
                                      end: [rowIndex, colIndex],
                                    });
                                    setIsDragging(true);
                                  }}
                                  onMouseEnter={() => {
                                    if (isDragging && selectionAnchor) {
                                      setSelectedCell([rowIndex, colIndex]);
                                      setSelectedRange({
                                        start: selectionAnchor,
                                        end: [rowIndex, colIndex],
                                      });
                                    }
                                  }}
                                  onInput={(e) =>
                                    autoResizeTextarea(
                                      e.target as HTMLTextAreaElement
                                    )
                                  }
                                  onClick={(e) => {
                                    // e.stopPropagation();
                                    setSelectedCell([rowIndex, colIndex]);
                                    setSelectionAnchor(null);
                                  }}
                                  onKeyDown={(e) => {
                                    console.log(e.key);

                                    if (
                                      editingCell?.[0] === rowIndex &&
                                      editingCell?.[1] === colIndex
                                    ) {
                                      if (e.key === "Escape") {
                                        e.preventDefault();
                                        setEditingCell(null);
                                        return;
                                      }
                                      if (e.key === "Enter" && !e.shiftKey) {
                                        console.log(e.key);
                                        e.preventDefault();
                                        setEditingCell(null);
                                        return;
                                      }
                                    }
                                    if (!selectedCell) return;
                                    const [row, col] = selectedCell;
                                    let newRow = row;
                                    let newCol = col;
                                    if (e.key === "ArrowUp")
                                      newRow = Math.max(0, row - 1);
                                    else if (e.key === "ArrowDown")
                                      newRow = Math.min(
                                        tableData.length - 1,
                                        row + 1
                                      );
                                    else if (e.key === "ArrowLeft")
                                      newCol = Math.max(2, col - 1);
                                    else if (e.key === "ArrowRight")
                                      newCol = Math.min(
                                        tableData[0].length - 1,
                                        col + 1
                                      );
                                    else return;
                                    e.preventDefault();
                                    if (e.shiftKey) {
                                      const anchor =
                                        selectionAnchor || selectedCell;
                                      setSelectedRange({
                                        start: anchor,
                                        end: [newRow, newCol],
                                      });
                                      setSelectedCell([newRow, newCol]);
                                      if (!selectionAnchor)
                                        setSelectionAnchor(selectedCell);
                                    } else {
                                      setEditingCell([newRow, newCol]);

                                      setSelectedCell([newRow, newCol]);
                                      setSelectedRange(null);
                                      setSelectionAnchor(null);
                                    }
                                  }}
                                  className={` ${
                                    cellColors?.[rowIndex]?.[colIndex]
                                      ? cellColors?.[rowIndex]?.[colIndex]
                                      : frozenColIndices.includes(colIndex)
                                      ? "bg-slate-200"
                                      : ""
                                  }
                                     w-full h-auto  m-0 border   outline-none resize-none overflow-hidden whitespace-pre-wrap break-words`}
                                  rows={1}
                                />
                              </td>
                            ) : (
                              <td
                                tabIndex={0}
                                style={{
                                  backgroundColor:
                                    cellColors?.[rowIndex]?.[colIndex] || "",
                                  width: colWidths[colIndex].width,
                                  minWidth: 50,
                                  position: frozenColIndices.includes(colIndex)
                                    ? "sticky"
                                    : undefined,
                                  left: frozenColIndices.includes(colIndex)
                                    ? getStickyLeftOffset(colIndex)
                                    : undefined,
                                  zIndex: frozenColIndices.includes(colIndex)
                                    ? 9
                                    : undefined,
                                }}
                                className={` border-2 border-black p-2 min-h-[80px] ${
                                  selectedCell?.[0] === rowIndex &&
                                  selectedCell?.[1] === colIndex
                                    ? "border-blue-500 ring-2 ring-blue-400 border-3"
                                    : "border-gray-300"
                                }
                                  ${
                                    isCellInRange(rowIndex, colIndex)
                                      ? " bg-blue-100"
                                      : ""
                                  } ${
                                  cellColors?.[rowIndex]?.[colIndex]
                                    ? cellColors?.[rowIndex]?.[colIndex]
                                    : frozenColIndices.includes(colIndex)
                                    ? "bg-slate-200"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  // e.stopPropagation();
                                  setEditingCell([rowIndex, colIndex]);
                                  setSelectedCell([rowIndex, colIndex]);
                                  setSelectionAnchor(null);
                                  setIsFocusedEdit(false); // It's a single-click edit
                                }}
                                onMouseDown={() => {
                                  setSelectionAnchor([rowIndex, colIndex]);
                                  setSelectedCell([rowIndex, colIndex]);
                                  setSelectedRange({
                                    start: [rowIndex, colIndex],
                                    end: [rowIndex, colIndex],
                                  });
                                  // setIsDragging(true);
                                }}
                                onMouseEnter={() => {
                                  if (isDragging && selectionAnchor) {
                                    setSelectedCell([rowIndex, colIndex]);
                                    setSelectedRange({
                                      start: selectionAnchor,
                                      end: [rowIndex, colIndex],
                                    });
                                  }
                                }}
                                onPaste={(e) => {
                                  e.preventDefault();
                                  console.log(e.clipboardData.getData("text"));

                                  const items = e.clipboardData?.files;
                                  if (items?.length)
                                    handleImagePasteOrDrop(
                                      Array.from(items),
                                      rowIndex,
                                      colIndex
                                    );
                                  if (copiedImage) {
                                    const updated = [...tableData];
                                    if (
                                      !Array.isArray(
                                        updated[rowIndex][colIndex]
                                      )
                                    )
                                      updated[rowIndex][colIndex] = [];

                                    (
                                      updated[rowIndex][colIndex] as string[]
                                    ).push(copiedImage);
                                    setTableData(updated);
                                    console.log("Image pasted from clipboard");
                                  }
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const files = e.dataTransfer?.files;
                                  console.log(files);
                                  console.log(draggedImageOrigin);

                                  if (
                                    draggedImageSource.current &&
                                    draggedImageOrigin.current
                                  ) {
                                    const [fromRow, fromCol] =
                                      draggedImageOrigin.current;
                                    const updated = [...tableData];

                                    // Remove from old cell
                                    updated[fromRow][fromCol] = (
                                      updated[fromRow][fromCol] as string[]
                                    ).filter(
                                      (img) =>
                                        img !== draggedImageSource.current
                                    );

                                    // Add to new cell
                                    if (
                                      !Array.isArray(
                                        updated[rowIndex][colIndex]
                                      )
                                    ) {
                                      updated[rowIndex][colIndex] = [];
                                    }

                                    (
                                      updated[rowIndex][colIndex] as string[]
                                    ).push(draggedImageSource.current);

                                    setTableData(updated);
                                    draggedImageSource.current = null;
                                    draggedImageOrigin.current = null;
                                  } else if (files?.length) {
                                    // ✅ Filter to only image files
                                    const imageFiles = Array.from(files).filter(
                                      (file) => file.type.startsWith("image/")
                                    );

                                    if (imageFiles.length > 0) {
                                      handleImagePasteOrDrop(
                                        imageFiles,
                                        rowIndex,
                                        colIndex
                                      );
                                    } else {
                                      alert("Only image files are allowed.");
                                    }
                                  }
                                }}
                                onDragOver={(e) => e.preventDefault()}
                                onKeyDown={(e) => {
                                  const [row = 0, col = 0] = editingCell ?? [];
                                  const maxRow = tableData.length - 1;
                                  const maxCol = tableData[0].length - 1;

                                  // Allow caret movement but block outer handlers in freemode
                                  if (isFocusedEdit) {
                                    const arrowKeys = [
                                      "ArrowUp",
                                      "ArrowDown",
                                      "ArrowLeft",
                                      "ArrowRight",
                                    ];
                                    if (arrowKeys.includes(e.key)) {
                                      e.stopPropagation(); // Let text cursor move, prevent cell nav
                                    }

                                    // Exit freemode on Enter/Tab
                                    if (e.key === "Enter" || e.key === "Tab") {
                                      e.preventDefault();
                                      setIsFocusedEdit(false); // Exit freemode
                                      // You may also blur textarea or move focus to next
                                    }

                                    return;
                                  }

                                  if (!editingCell) return;

                                  if (e.key === "Escape") {
                                    e.preventDefault();
                                    setEditingCell(null);
                                    return;
                                  }

                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    const nextRow = Math.min(row + 1, maxRow);
                                    setEditingCell([nextRow, col] as [
                                      number,
                                      number
                                    ]);
                                    setSelectedCell([nextRow, col] as [
                                      number,
                                      number
                                    ]);
                                    setSelectionAnchor([nextRow, col] as [
                                      number,
                                      number
                                    ]);
                                    setSelectedRange({
                                      start: [nextRow, col] as [number, number],
                                      end: [nextRow, col] as [number, number],
                                    });
                                    return;
                                  }

                                  if (e.key === "Tab") {
                                    e.preventDefault();
                                    let nextCol = e.shiftKey
                                      ? col - 1
                                      : col + 1;
                                    let nextRow = row;

                                    if (nextCol < 2) {
                                      nextCol = maxCol;
                                      nextRow = Math.max(2, row - 1);
                                    } else if (nextCol > maxCol) {
                                      nextCol = 0;
                                      nextRow = Math.min(maxRow, row + 1);
                                    }

                                    setEditingCell([nextRow, nextCol] as [
                                      number,
                                      number
                                    ]);
                                    setSelectedCell([nextRow, nextCol] as [
                                      number,
                                      number
                                    ]);
                                    setSelectionAnchor([nextRow, nextCol] as [
                                      number,
                                      number
                                    ]);
                                    setSelectedRange({
                                      start: [nextRow, nextCol] as [
                                        number,
                                        number
                                      ],
                                      end: [nextRow, nextCol] as [
                                        number,
                                        number
                                      ],
                                    });
                                    return;
                                  }

                                  if (
                                    [
                                      "ArrowUp",
                                      "ArrowDown",
                                      "ArrowLeft",
                                      "ArrowRight",
                                    ].includes(e.key)
                                  ) {
                                    e.preventDefault();

                                    let nextRow = row;
                                    let nextCol = col;

                                    if (e.key === "ArrowUp")
                                      nextRow = Math.max(0, row - 1);
                                    if (e.key === "ArrowDown")
                                      nextRow = Math.min(maxRow, row + 1);
                                    if (e.key === "ArrowLeft") {
                                      console.log(col);
                                        nextCol = Math.max(2, col - 1);
                                    }
                                    if (e.key === "ArrowRight")
                                      nextCol = Math.min(maxCol, col + 1);

                                    setEditingCell([nextRow, nextCol] as [
                                      number,
                                      number
                                    ]);
                                    setSelectedCell([nextRow, nextCol] as [
                                      number,
                                      number
                                    ]);
                                    setSelectionAnchor([nextRow, nextCol] as [
                                      number,
                                      number
                                    ]);
                                    setSelectedRange({
                                      start: [nextRow, nextCol] as [
                                        number,
                                        number
                                      ],
                                      end: [nextRow, nextCol] as [
                                        number,
                                        number
                                      ],
                                    });
                                  }
                                }}
                              >
                                {cellShapes[`${rowIndex}-${colIndex}`] ===
                                  "star" && (
                                  <div
                                    className="absolute top-1 right-1 text-yellow-500 text-xl pointer-events-none"
                                    title="Star"
                                  >
                                    ★
                                  </div>
                                )}
                                {Array.isArray(cell) ? (
                                  <div className="flex flex-wrap  justify-center">
                                    {(cell as string[]).map((src, i) => (
                                      <div
                                        key={i}
                                        style={{
                                          position: "relative",
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        onMouseEnter={() =>
                                          setHoveredImage({
                                            row: rowIndex,
                                            col: colIndex,
                                            index: i,
                                          })
                                        }
                                        onMouseLeave={() =>
                                          setHoveredImage(null)
                                        }
                                      >
                                        <img
                                          onClick={(e) => {
                                            setimageSeleted({
                                              rownumber: rowIndex,
                                              colnumber: colIndex,
                                              imgindex: i,
                                            });
                                          }}
                                          onDoubleClick={(e) => {
                                            const tempImage = {
                                              id: `temp-${Date.now()}`,
                                              url: src,
                                              file: new File([], `image-${rowIndex}-${colIndex}-${i}.png`, {
                                                type: src.match(/data:(image\/\w+);/)?.[1] || "image/*",
                                              }),
                                              name: `image-${rowIndex}-${colIndex}-${i}.png`,
                                            };
                                            handleOpenImageEditor(src, tempImage);
                                          }}
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                            aspectRatio: "9/16",
                                            objectFit: "contain",
                                            border:
                                              imageSeleted &&
                                              imageSeleted.rownumber ===
                                                rowIndex &&
                                              imageSeleted.colnumber ===
                                                colIndex &&
                                              imageSeleted.imgindex === i
                                                ? "2px solid purple"
                                                : "none",
                                          }}
                                          onContextMenu={(e) => {
                                            e.preventDefault();
                                            setContextMenu2({
                                              visible: true,
                                              x: e.clientX,
                                              y: e.clientY,
                                              targetImage: src, // the right-clicked image
                                            });
                                          }}
                                          draggable
                                          onDragStart={(e) => {
                                            draggedImageSource.current = src;
                                            draggedImageOrigin.current = [
                                              rowIndex,
                                              colIndex,
                                            ];
                                            e.dataTransfer.setData(
                                              "text/plain",
                                              src
                                            );
                                          }}
                                          src={src}
                                        />

                                        {/* Delete button visible only on hover */}
                                        {/* {hoveredImage &&
                                          hoveredImage.row === rowIndex &&
                                          hoveredImage.col === colIndex &&
                                          hoveredImage.index === i && (
                                            // <button
                                            //   onClick={(e) => {
                                            //     const updated = [...tableData];
                                            //     (
                                            //       updated[rowIndex][
                                            //         colIndex
                                            //       ] as string[]
                                            //     ).splice(i, 1);
                                            //     setTableData(updated);
                                            //     setTimeout(() => {
                                            //       autoResizeAllTextareas(e);
                                            //     }, 0);
                                            //   }}
                                            //   style={{
                                            //     position: "absolute",
                                            //     top: 5,
                                            //     right: 0,
                                            //     background: "white",
                                            //     color: "red",
                                            //     border: "none",
                                            //     borderRadius: "50%",
                                            //     width: "18px",
                                            //     height: "18px",
                                            //     fontSize: "16px",
                                            //     cursor: "pointer",
                                            //     boxShadow:
                                            //       "0 0 3px rgba(0,0,0,0.3)",
                                            //   }}
                                            //   title="Delete image"
                                            // >
                                            //   ×
                                            // </button> */}
                                            <div className="absolute top-5 right-1 opacity-100  transition-opacity duration-200 flex flex-col gap-1 z-10">

                                            <Button 
                                              onClick={(e) => {
                                                const updated = [...tableData];
                                                (
                                                  updated[rowIndex][
                                                    colIndex
                                                  ] as string[]
                                                ).splice(i, 1);
                                                setTableData(updated);
                                                setTimeout(() => {
                                                  autoResizeAllTextareas(e);
                                                }, 0);
                                              }}
                                              variant="destructive"
                                              size="icon"
                                              className="h-6 w-6"
                                              aria-label="Delete image"
                                              >
                                              <X size={16} />
                                            </Button>
                                            </div>
                                          {/* )} */}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  ""
                                )}
                                <p className="no-print text-sm text-gray-400">
                                  Drop or paste image
                                </p>
                              </td>
                            )
                          ) : (
                            <td
                              data-row={rowIndex}
                              data-col={colIndex}
                              style={{
                                backgroundColor:
                                  cellColors?.[rowIndex]?.[colIndex] || "",
                                width: colWidths[colIndex].width,
                                minWidth: 50,
                                position: frozenColIndices.includes(colIndex)
                                  ? "sticky"
                                  : undefined,

                                left: frozenColIndices.includes(colIndex)
                                  ? getStickyLeftOffset(colIndex)
                                  : undefined,
                                zIndex: frozenColIndices.includes(colIndex)
                                  ? 9
                                  : undefined,
                              }}
                              key={colIndex}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                setContextMenu({
                                  visible: true,
                                  x: e.pageX,
                                  y: e.pageY,
                                  row: rowIndex,
                                  col: colIndex,
                                });
                              }}
                              onClick={(e) => {
                                // e.stopPropagation();
                                setEditingCell([rowIndex, colIndex]);
                                setSelectedCell([rowIndex, colIndex]);
                                setSelectionAnchor(null);
                                setIsFocusedEdit(false); // It's a single-click edit
                              }}
                              onDoubleClick={(e) => {
                                e.stopPropagation();
                                setEditingCell([rowIndex, colIndex]);
                                setIsFocusedEdit(true); // Free edit mode
                              }}
                              className={` border  ${
                                cellColors?.[rowIndex]?.[colIndex]
                                  ? cellColors?.[rowIndex]?.[colIndex]
                                  : frozenColIndices.includes(colIndex)
                                  ? "bg-slate-200"
                                  : ""
                              } ${
                                selectedCell?.[0] === rowIndex &&
                                selectedCell?.[1] === colIndex
                                  ? "border-blue-500 ring-2 ring-blue-400 border-3"
                                  : "border-gray-300"
                              }
                                  ${
                                    isCellInRange(rowIndex, colIndex)
                                      ? "bg-blue-100"
                                      : ""
                                  }
                                   ${
                                     isCellInAutofillRange(rowIndex, colIndex)
                                       ? "bg-green-200 border-2 border-green-400"
                                       : ""
                                   }
                                   
                                  `}
                            >
                              {cellShapes[`${rowIndex}-${colIndex}`] ===
                                "star" && (
                                <div
                                  className="absolute top-1 right-1 text-yellow-500 text-xl pointer-events-none"
                                  title="Star"
                                >
                                  ★
                                </div>
                              )}
                              {selectedCell?.[0] === rowIndex &&
                                selectedCell?.[1] === colIndex && (
                                  <div
                                    className="absolute w-2 h-2 bg-blue-600 bottom-0 right-0 cursor-crosshair z-50"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      setAutofillStart([rowIndex, colIndex]);
                                    }}
                                  />
                                )}

                              <textarea
                              style={{
                                backgroundColor:
                                  cellColors?.[rowIndex]?.[colIndex] || "",
                              }}
                                value={cell}
                                data-cell={`${rowIndex}-${colIndex}`}
                                ref={
                                  editingCell?.[0] === rowIndex &&
                                  editingCell?.[1] === colIndex
                                    ? inputRef
                                    : null
                                }
                                onChange={(e) => {
                                  handleCellChange(
                                    rowIndex,
                                    colIndex,
                                    e.target.value
                                  );
                                  // autoResizeTextarea(e.target);
                                }}
                                onBlur={() => {
                                  // pushToHistory(tableData); // Only push once editing is done
                                  setEditingCell(null);
                                }}
                                onPaste={(e) => {
                                  handlePaste(e, rowIndex, colIndex);
                                  setTimeout(
                                    () =>
                                      autoResizeTextarea(
                                        e.target as HTMLTextAreaElement
                                      ),
                                    0
                                  );
                                }}
                                onMouseDown={(e) => {
                                  if (e.detail > 1) {
                                    e.preventDefault(); // Prevents auto-select on double-click
                                  }
                                  setSelectionAnchor([rowIndex, colIndex]);
                                  setSelectedCell([rowIndex, colIndex]);
                                  setSelectedRange({
                                    start: [rowIndex, colIndex],
                                    end: [rowIndex, colIndex],
                                  });
                                  setIsDragging(true);
                                }}
                                onMouseEnter={() => {
                                  if (isDragging && selectionAnchor) {
                                    setSelectedCell([rowIndex, colIndex]);
                                    setSelectedRange({
                                      start: selectionAnchor,
                                      end: [rowIndex, colIndex],
                                    });
                                  }
                                }}
                                onInput={(e) =>
                                  autoResizeTextarea(
                                    e.target as HTMLTextAreaElement
                                  )
                                }
                                onKeyDown={(e) => {
                                  const [row, col] = editingCell ?? [];
                                  const maxRow = tableData.length - 1;
                                  const maxCol = tableData[0].length - 1;
                                  if (
                                    e.key === "Delete" || // Windows / external keyboards
                                    e.key === "Backspace" // MacBook Delete key
                                  ) {
                                    console.log("ok");
                                    e.preventDefault(); // Prevent accidental browser navigation
                                    clearSelectedCells();
                                  }

                                  // Allow caret movement but block outer handlers in freemode
                                  if (isFocusedEdit) {
                                    const arrowKeys = [
                                      "ArrowUp",
                                      "ArrowDown",
                                      "ArrowLeft",
                                      "ArrowRight",
                                    ];
                                    if (arrowKeys.includes(e.key)) {
                                      e.stopPropagation(); // Let text cursor move, prevent cell nav
                                    }

                                    // Exit freemode on Enter/Tab
                                    if (e.key === "Enter" || e.key === "Tab") {
                                      e.preventDefault();
                                      setIsFocusedEdit(false); // Exit freemode
                                      // You may also blur textarea or move focus to next
                                    }

                                    return;
                                  }

                                  if (!editingCell) return;

                                  if (e.key === "Escape") {
                                    e.preventDefault();
                                    setEditingCell(null);
                                    return;
                                  }
                                  
                                  // if (e.key === "Enter" && !e.shiftKey) {
                                  //   e.preventDefault();
                                  //   const nextRow = Math.min(row + 1, maxRow);
                                  //   setEditingCell([nextRow, col] as [
                                  //     number,
                                  //     number
                                  //   ]);
                                  //   setSelectedCell([nextRow, col] as [
                                  //     number,
                                  //     number
                                  //   ]);
                                  //   setSelectionAnchor([nextRow, col] as [
                                  //     number,
                                  //     number
                                  //   ]);
                                  //   setSelectedRange({
                                  //     start: [nextRow, col] as [number, number],
                                  //     end: [nextRow, col] as [number, number],
                                  //   });
                                  //   return;
                                  // }

                                  // if (e.key === "Tab") {
                                  //   e.preventDefault();
                                  //   let nextCol = e.shiftKey
                                  //     ? col - 1
                                  //     : col + 1;
                                  //   let nextRow = row;

                                  //   if (nextCol < 2) {
                                  //     nextCol = maxCol;
                                  //     nextRow = Math.max(2, row - 1);
                                  //   } else if (nextCol > maxCol) {
                                  //     nextCol = 0;
                                  //     nextRow = Math.min(maxRow, row + 1);
                                  //   }

                                  //   setEditingCell([nextRow, nextCol] as [
                                  //     number,
                                  //     number
                                  //   ]);
                                  //   setSelectedCell([nextRow, nextCol] as [
                                  //     number,
                                  //     number
                                  //   ]);
                                  //   setSelectionAnchor([nextRow, nextCol] as [
                                  //     number,
                                  //     number
                                  //   ]);
                                  //   setSelectedRange({
                                  //     start: [nextRow, nextCol] as [
                                  //       number,
                                  //       number
                                  //     ],
                                  //     end: [nextRow, nextCol] as [
                                  //       number,
                                  //       number
                                  //     ],
                                  //   });
                                  //   return;
                                  // }

                                  // if (
                                  //   [
                                  //     "ArrowUp",
                                  //     "ArrowDown",
                                  //     "ArrowLeft",
                                  //     "ArrowRight",
                                  //   ].includes(e.key)
                                  // ) {
                                  //   e.preventDefault();

                                  //   let nextRow = row;
                                  //   let nextCol = col;

                                  //   if (e.key === "ArrowUp")
                                  //     nextRow = Math.max(0, row - 1);
                                  //   if (e.key === "ArrowDown")
                                  //     nextRow = Math.min(maxRow, row + 1);
                                  //   if (e.key === "ArrowLeft")
                                  //     nextCol = Math.max(0, col - 1);
                                  //   if (e.key === "ArrowRight")
                                  //     nextCol = Math.min(maxCol, col + 1);

                                  //   setEditingCell([nextRow, nextCol] as [
                                  //     number,
                                  //     number
                                  //   ]);
                                  //   setSelectedCell([nextRow, nextCol] as [
                                  //     number,
                                  //     number
                                  //   ]);
                                  //   setSelectionAnchor([nextRow, nextCol] as [
                                  //     number,
                                  //     number
                                  //   ]);
                                  //   setSelectedRange({
                                  //     start: [nextRow, nextCol] as [
                                  //       number,
                                  //       number
                                  //     ],
                                  //     end: [nextRow, nextCol] as [
                                  //       number,
                                  //       number
                                  //     ],
                                  //   });
                                  // }
                                }}
                                className={`${
                                  rowIndex === 0
                                    ? "text-black p-3! text-[15px]!"
                                    : "p-3!"
                                } className="w-full h-auto m-0 border outline-none resize-none overflow-hidden whitespace-pre-wrap break-words p-2 align-top"
`}
                                rows={1}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Buttons */}
        </div>
      </main>
      {isImageEditorOpen && editingImageInfo && (
        <ImageEditorModal
          isOpen={isImageEditorOpen}
          onClose={handleCloseImageEditor}
          image={editingImageInfo.image}
          onSave={(newImageDataUrl) => handleSaveEditedImage(newImageDataUrl)}
        />
      )}
    </>
  );
}
