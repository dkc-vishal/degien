"use client";
import ImageEditorModal from "@/components/image-editor/ImageEditorModal";
import { toast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react"; // Make sure useRef is imported
import React, { useState } from "react";
// export interface IssueImage {
//   id: string;
//   url: string;
//   file: File;
//   name: string;
// }

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

export default function Table() {
  const [frozenColIndex, setFrozenColIndex] = useState<number | null>(null);

  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);
  const [isDragging, setIsDragging] = useState(false);
  const [history, setHistory] = useState<string[][][]>([]);
  const [redoStack, setRedoStack] = useState<string[][][]>([]);
  type TableRow = (string | string[])[];
  const [draggedRowIndex, setDraggedRowIndex] = useState<number | null>(null);
  const [draggedColIndex, setDraggedColIndex] = useState<number | null>(null);
  const draggedImageSource = useRef<string | null>(null);
  const draggedImageOrigin = useRef<[number, number] | null>(null);
  // State for Image Editor Modal
  const [editingImageInfo, setEditingImageInfo] = useState<{
    issueId: string;
    image: string;
  } | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [imageSeleted, setimageSeleted] = useState({
    rownumber: 0,
    colnumber: 0,
    imgindex: 0

  })
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollDirectionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const [columnHeaders, setColumnHeaders] = useState([
    "",
    "Sno.",
    "Should Go to QA Inspection",
    "Header",
    "Measurement Type",
    "Location",
    "Measurement Picture",
    "FIT Changed",
    "FIT Grading Rule",
    "PP Changed",
    "PP Grading",
    "TOP Changed",
    "TOP Grading",
    "sdfdsfdsf",
  ]);
  const [imageopen, setIsTyping] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const [colWidths, setColWidths] = useState(
    () => columnHeaders.map(() => 150) // default 150px per column
  );
  const isResizing = useRef(false);
  const resizingColIndex = useRef<number | null>(null);
  const [copiedImage, setCopiedImage] = useState<string | null>(null);
  const handleMouseMove = (e: MouseEvent) => {
    if (resizingColIndex.current === null) return;

    const thElements = document.querySelectorAll("th");
    const th = thElements[resizingColIndex.current] as HTMLElement;

    if (th) {
      const newWidth = e.clientX - th.getBoundingClientRect().left;
      if (newWidth > 20) {
        th.style.width = `${newWidth}px`;
        const updatedWidths = [...colWidths];
        updatedWidths[resizingColIndex.current] = newWidth;
        setColWidths(updatedWidths);
        localStorage.setItem("table_colWidths", JSON.stringify(updatedWidths));
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    resizingColIndex.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const handleOpenImageEditor = (issueId: string, image: string) => {
    setEditingImageInfo({ issueId, image });
    setIsImageEditorOpen(true);
  };
  const handleCloseImageEditor = () => {
    setIsImageEditorOpen(false);
    setEditingImageInfo(null);
  };

  const handleSaveEditedImage = (
    newImageDataUrl: string
  ) => {

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
    Array.from({ length: 10 }, () =>
      Array.from({ length: 13 }, (_, colIndex) =>
        columnHeaders[colIndex] === "Measurement Picture" ? [] : ""
      )
    )
  );
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    row: number;
    col: number;
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
  const [selectedRange, setSelectedRange] = useState<{
    start: [number, number];
    end: [number, number];
  } | null>(null);

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    startRow: number,
    startCol: number
  ) => {
    e.preventDefault();

    const clipboard = e.clipboardData.getData("text");

    const rows = clipboard
      .trim()
      .split(/\r?\n/)
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
    // pushToHistory(tableData);
    setTableData(updated);
  };

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

  const pushToHistory = (data: string[][]) => {
    setHistory((prev) => [...prev, JSON.parse(JSON.stringify(data))]);
    setRedoStack([]); // clear redo stack on new action
  };

  const handleCellChange = (rowIdx: number, colIdx: number, value: string) => {
    const updated = [...tableData];
    updated[rowIdx][colIdx] = value;

    setTableData(updated);
  };
  const autoResizeTextarea = (el: HTMLTextAreaElement) => {
    if (el && el.parentElement) {
      el.parentElement.style.height = "auto"; // Reset height
      el.parentElement.style.height = el.scrollHeight + "px";
    }
    // el.style.height = "auto"; // Reset height
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        if (!selectedRange && !selectedCell) return;

        let start: [number, number], end: [number, number];

        if (selectedRange) {
          ({ start, end } = selectedRange);
        } else if (selectedCell) {
          start = end = selectedCell;
        } else return;

        const startRow = Math.min(start[0], end[0]);
        const endRow = Math.max(start[0], end[0]);
        const startCol = Math.min(start[1], end[1]);
        const endCol = Math.max(start[1], end[1]);

        let copiedText = "";
        for (let row = startRow; row <= endRow; row++) {
          const rowData = [];
          for (let col = startCol; col <= endCol; col++) {
            rowData.push(tableData?.[row]?.[col] ?? "");
          }
          copiedText += rowData.join("\t") + "\n";
        }

        e.preventDefault();

        // ✅ Fallback method using execCommand
        const textarea = document.createElement("textarea");
        textarea.value = copiedText;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          console.log("Copied to clipboard via fallback");
        } catch (err) {
          console.error("Fallback copy failed:", err);
        }
        document.body.removeChild(textarea);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "x") {
        console.log(!selectedRange && !selectedCell);
        if (!selectedRange && !selectedCell) return;

        let start: [number, number], end: [number, number];
        if (selectedRange) {
          ({ start, end } = selectedRange);
        } else if (selectedCell) {
          start = end = selectedCell;
        } else return;

        const startRow = Math.min(start[0], end[0]);
        const endRow = Math.max(start[0], end[0]);
        const startCol = Math.min(start[1], end[1]);
        const endCol = Math.max(start[1], end[1]);

        let copiedText = "";
        const updated = [...tableData];

        for (let row = startRow; row <= endRow; row++) {
          const rowData = [];
          for (let col = startCol; col <= endCol; col++) {
            rowData.push(updated[row][col]);
            updated[row][col] = ""; // Clear content
          }
          copiedText += rowData.join("\t") + "\n";
        }

        setTableData(updated);
        e.preventDefault();

        const textarea = document.createElement("textarea");
        textarea.value = copiedText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      // if ((e.ctrlKey || e.metaKey) && e.key === "z") {
      //   e.preventDefault();
      //   if (history.length > 0) {
      //     setRedoStack((r) => [tableData.map((row) => [...row]), ...r]);
      //     setTableData(history[history.length - 1]);
      //     setHistory((h) => h.slice(0, h.length - 1));
      //   }
      // }

      // // Redo
      // else if ((e.ctrlKey || e.metaKey) && e.key === "y") {
      //   e.preventDefault();
      //   if (redoStack.length > 0) {
      //     setHistory((h) => [...h, tableData.map((row) => [...row])]);
      //     setTableData(redoStack[0]);
      //     setRedoStack((r) => r.slice(1));
      //   }
      // }
      if (e.key === "Enter" && selectedCell) {
        e.preventDefault();
        setEditingCell(selectedCell);
        return;
      }

      // Escape to cancel editing
      if (e.key === "Escape" && editingCell) {
        e.preventDefault();

        setEditingCell(null);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedRange?.start?.toString(),
    selectedRange?.end?.toString(),
    selectedCell?.toString(),
  ]);
  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu(null);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
  const insertRow = (index: number) => {
    const newRow = new Array(tableData[0].length).fill("");
    const updated = [
      ...tableData.slice(0, index),
      newRow,
      ...tableData.slice(index),
    ];
    setTableData(updated);
  };

  const insertCol = (index: number) => {
    // update columnHeaders
    const newHeaders = [...columnHeaders];
    newHeaders.splice(index, 0, "New Column");
    setColumnHeaders(newHeaders);

    // update tableData — ⚠️ THIS is likely missing or incorrect!
    const newData = tableData.map((row) => {
      const newRow = [...row];
      newRow.splice(index, 0, ""); // <-- this part is crucial
      return newRow;
    });
    setTableData(newData);
  };

  const deleteRow = (index: number) => {
    if (tableData.length <= 1) return;
    const updated = [
      ...tableData.slice(0, index),
      ...tableData.slice(index + 1),
    ];
    setTableData(updated);
  };

  const deleteCol = (deleteIndex: number) => {
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
    files: FileList,
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


  const handleMouseMoveForScroll = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const rect = container.getBoundingClientRect();
    const margin = 40; // distance from edge to start scrolling
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

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
      stopAutoScroll();
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);
  function getColumnLetter(index: number): string {
    let result = "";
    while (index >= 0) {
      result = String.fromCharCode((index % 26) + 65) + result;
      index = Math.floor(index / 26) - 1;
    }
    return result;
  }
  useEffect(() => {
    const handleClick = () => setContextMenu1(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  useEffect(() => {
    const savedWidths = localStorage.getItem("table_colWidths");
    if (savedWidths) {
      setColWidths(JSON.parse(savedWidths));
    }
  }, []);
  return (
    <>
      {contextMenu1?.visible && (
        <ul
          className="absolute z-50 bg-white border rounded shadow-md"
          style={{ top: contextMenu1.y, left: contextMenu1.x }}
          onClick={() => setContextMenu1(null)}
        >
          {frozenColIndex === null || contextMenu1.col !== frozenColIndex ? (
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setFrozenColIndex(contextMenu1.col);
                setContextMenu1(null);
              }}
            >
              Freeze column here
            </li>
          ) : (
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setFrozenColIndex(null);
                setContextMenu1(null);
              }}
            >
              Unfreeze columns
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
          </ul>
        </div>
      )}
      
      <main className="p-6">
        <div className="bg-white p-6 rounded-xl shadow" ref={tableRef}>
       
       
          {/* Table */}
          <div
            ref={scrollContainerRef}
            style={{ width: "100%", }}
            onMouseMove={handleMouseMoveForScroll}
          >
            <div className="overflow-auto max-h-[800px] border rounded" style={{ width: "100%", overflow: "scroll" }} >
              <table className="table-fixed w-full text-sm border-content">

                <thead >
                  <tr className="sticky top-0 z-30 bg-white border border-gray-300 p-2 text-sm font-semibold">
                    {tableData[0]?.map((_, i) => (
                      <th
                        key={i}
                        draggable
                        style={{
                          position: "relative",
                          width: colWidths[i], // Set default width
                          minWidth: "50px",
                          maxWidth: "500px",
                          background: frozenColIndex === i ? "green" : ""
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
                            const [moved] = newRow.splice(
                              draggedColIndex,
                              1
                            );
                            newRow.splice(i, 0, moved);
                            let temp = colWidths[i]
                            colWidths[i] = colWidths[draggedColIndex];
                            colWidths[draggedColIndex] = temp;
                            localStorage.setItem("table_colWidths", JSON.stringify(colWidths));

                            return newRow;
                          });
                          setTableData(updated);
                          console.log(updated)
                          setDraggedColIndex(null);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        className={`border ${i === frozenColIndex ? "sticky! left-0 z-10 shadow-md " : ""} ${frozenColIndex !== null && i < frozenColIndex && i !== 0 && i !== 1 ? 'hidden' : ''}  ${isDragging ? "cursor-move" : "cursor-pointer"
                          }`}
                      >
                        {getColumnLetter(i)}

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
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {tableData
                    .filter((row) =>
                      row.some(
                        (cell) =>
                          typeof cell === "string" &&
                          cell
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      )
                    )
                    .map((row, rowIndex) => (

                      <tr
                        key={rowIndex}
                        style={{ textAlign: "center", background: rowIndex === 0 ? "green" : "", fontWeight: rowIndex === 0 ? "600" : "" }}
                        className={`bg-white even:bg-gray-50 `}
                      >
                        {row.map((cell, colIndex) => {
                          if (frozenColIndex !== null && colIndex < frozenColIndex && colIndex !== 0 && colIndex !== 1) return null;

                          return (

                            colIndex === 0 ? (
                              <td

                                style={{
                                  width: colWidths[colIndex],
                                  minWidth: 50,
                                }}
                                key={colIndex}
                                className={`border ${colIndex === frozenColIndex ? `sticky! left-${colWidths[colIndex]} z-20 bg-white shadow-md ` : ""} ${draggedRowIndex
                                  ? "cursor-grabbing"
                                  : "cursor-grab"
                                  }`}
                                draggable
                                onDragStart={() =>
                                  setDraggedRowIndex(rowIndex)
                                }
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
                                className={`border ${frozenColIndex ? `sticky! left-${colWidths[colIndex]} z-20 bg-white shadow-md ` : ""}`}
                                style={{ textAlign: "center" }}
                              >
                                {rowIndex + 1}
                              </td>
                            ) : columnHeaders[colIndex] ===
                              "Measurement Picture" ? (
                              rowIndex === 0 ? <td>Image Column</td> : (
                                <td
                                  style={{
                                    width: colWidths[colIndex],
                                    minWidth: 50,
                                  }}
                                  className={` border p-2 min-h-[80px]${frozenColIndex ? `sticky! left-${colWidths[colIndex]} z-20 bg-white shadow-md ` : ""} ${selectedCell?.[0] === rowIndex &&
                                    selectedCell?.[1] === colIndex
                                    ? "border-blue-500 ring-2 ring-blue-400"
                                    : "border-gray-300"
                                    }
                                  ${isCellInRange(rowIndex, colIndex)
                                      ? " bg-blue-100"
                                      : ""
                                    }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCell([rowIndex, colIndex]);
                                    setSelectionAnchor(null);
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
                                    console.log(e.clipboardData);
                                    const items = e.clipboardData?.files;
                                    if (items?.length)
                                      handleImagePasteOrDrop(
                                        items,
                                        rowIndex,
                                        colIndex
                                      );
                                    if (copiedImage) {
                                      const updated = [...tableData];
                                      if (!Array.isArray(updated[rowIndex][colIndex]))
                                        updated[rowIndex][colIndex] = [];

                                      (updated[rowIndex][colIndex] as string[]).push(copiedImage);
                                      setTableData(updated);
                                      console.log("Image pasted from clipboard");
                                    }
                                  }}
                                  // onDrop={(e) => {
                                  //   e.preventDefault();
                                  //   const files = e.dataTransfer?.files;
                                  //   if (files?.length) handleImagePasteOrDrop(files, rowIndex, colIndex);
                                  // }}
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

                                      // Remove from old
                                      updated[fromRow][fromCol] = (
                                        updated[fromRow][fromCol] as string[]
                                      ).filter(
                                        (img) =>
                                          img !== draggedImageSource.current
                                      );

                                      // Add to new
                                      if (
                                        !Array.isArray(
                                          updated[rowIndex][colIndex]
                                        )
                                      )
                                        updated[rowIndex][colIndex] = [];
                                      (
                                        updated[rowIndex][colIndex] as string[]
                                      ).push(draggedImageSource.current);

                                      setTableData(updated);
                                      draggedImageSource.current = null;
                                      draggedImageOrigin.current = null;
                                    } else if (files?.length) {
                                      handleImagePasteOrDrop(
                                        files,
                                        rowIndex,
                                        colIndex
                                      );
                                    }
                                  }}
                                  onDragOver={(e) => e.preventDefault()}
                                >
                                  {Array.isArray(cell) ? (
                                    <div className="flex flex-wrap gap-1 justify-center">
                                      {cell.map((src, i) => (
                                        <img

                                          onDoubleClick={e => {
                                            e.stopPropagation();
                                            setimageSeleted({
                                              rownumber: rowIndex,
                                              colnumber: colIndex,
                                              imgindex: i
                                            })
                                            handleOpenImageEditor(src, src)

                                          }}
                                          style={{ width: "100%", height: "100%", aspectRatio: "9/16" }}
                                          onKeyDown={(e) => {
                                            if ((e.ctrlKey || e.metaKey) && e.key === "c") {
                                              setCopiedImage(src);
                                            }
                                          }}
                                          onContextMenu={(e) => {
                                            e.preventDefault();
                                            setCopiedImage(src); // Store this image's src
                                            console.log("Image copied:", src);
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
                                          key={i}
                                          src={src}
                                          className="w-16 h-16 object-cover rounded"
                                        />
                                      ))}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  <p className="text-sm text-gray-400">
                                    Drop or paste image
                                  </p>
                                </td>
                              )
                            ) : (
                              <td
                                style={{
                                  width: colWidths[colIndex],
                                  minWidth: 50,
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
                                className={` border ${colIndex === frozenColIndex ? `sticky! left-${colWidths[colIndex]} z-20 bg-white shadow-md ` : ""} ${selectedCell?.[0] === rowIndex &&
                                  selectedCell?.[1] === colIndex
                                  ? "border-blue-500 ring-2 ring-blue-400"
                                  : "border-gray-300"
                                  }
                                  ${isCellInRange(rowIndex, colIndex) ? "bg-blue-100" : ""}`}
                              >
                                <textarea
                                  value={cell}
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
                                  // onClick={(e) => e.stopPropagation()}
                                  onClick={(e) => {

                                    e.stopPropagation();
                                    setSelectedCell([rowIndex, colIndex]);
                                    setSelectionAnchor(null);
                                  }}
                                  onKeyDown={(e) => {
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
                                      newCol = Math.max(0, col - 1);
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
                                  className={`w-full h-auto p-0 m-0 border px-2 py-1  outline-none resize-none overflow-hidden whitespace-pre-wrap break-words`}
                                  rows={1}
                                />
                              </td>
                            )

                          );
                        }
                        )}
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
          onSave={(newImageDataUrl) =>
            handleSaveEditedImage(
              newImageDataUrl
            )
          }
        />
      )}


    </>
  );
}
