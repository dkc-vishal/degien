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
function parseFraction(input: string): number {
  input = input.trim();
  if (!input) return 0;
  // Mixed fraction (e.g., "1 1/4")
  if (input.includes(" ")) {
    const [whole, frac] = input.split(" ");
    const [num, den] = frac.split("/");
    return parseInt(whole) + parseInt(num) / parseInt(den);
  }
  // Simple fraction (e.g., "3/8")
  if (input.includes("/")) {
    const [num, den] = input.split("/");
    return parseInt(num) / parseInt(den);
  }
  // Whole number
  return parseFloat(input);
}

// Helper to convert decimal to fraction string (up to 1/16 precision)
function toFractionString(value: number): string {
  if (isNaN(value)) return "";
  const whole = Math.floor(value);
  let frac = value - whole;
  let closest = "";
  let minDiff = 1;
  for (let d = 2; d <= 16; d++) {
    const n = Math.round(frac * d);
    const diff = Math.abs(frac - n / d);
    if (n > 0 && diff < minDiff) {
      closest = `${n}/${d}`;
      minDiff = diff;
    }
  }
  if (closest && whole > 0) return `${whole} ${closest}`;
  if (closest) return closest;
  return `${whole}`;
}

type Row = {
  gradingInput: string;
  baseSizeInput: string;
  baseSizeType: "XS" | "S" | "M" | "L" | "XL";
};

function parseGradingArray(input: string): number[] {
  // Accepts comma-separated grading values, e.g. "0,0,1,0"
  return input
    .split(",")
    .map((v) => parseFraction(v))
    .slice(0, 4); // Only take up to 4 values
}

export default function Table({
  tablename,
  col,
  row,
  imagecol,
  imagecol2,
  columnheaders,
}: any) {
  const [frozenColIndices, setFrozenColIndices] = useState<number[]>([]);

  const [isDragging, setIsDragging] = useState(false);
  const [history, setHistory] = useState<string[][][]>([]);
  const [redoStack, setRedoStack] = useState<string[][][]>([]);
  type TableRow = (string | string[])[];
  const [cellShapes, setCellShapes] = useState<Record<string, string>>({});

  const [draggedRowIndex, setDraggedRowIndex] = useState<number | null>(null);
  const [draggedColIndex, setDraggedColIndex] = useState<number | null>(null);
  const draggedImageSource = useRef<string | null>(null);
  const draggedImageOrigin = useRef<[number, number] | null>(null);
  // State for Image Editor Modal
  const [editingImageInfo, setEditingImageInfo] = useState<{
    issueId: string;
    image: string;
  } | null>(null);
  const [imageSeleted, setimageSeleted] = useState({
    rownumber: 0,
    colnumber: 0,
    imgindex: 0,
  });

  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollDirectionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const [columnHeaders, setColumnHeaders] = useState(
    Array.from({ length: col }, (_, colIndex) =>
      colIndex === imagecol || colIndex === imagecol2
        ? "Measurement Picture"
        : columnheaders[colIndex]
    )
  );

  const tableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const savedColWidths = localStorage.getItem(`table_colWidths_${tablename}`);
    console.log(savedColWidths);
    if (savedColWidths) {
      setColWidths(JSON.parse(savedColWidths));
    }
  }, []);

  useEffect(() => {
    const shareddata = localStorage.getItem(`table_data_${tablename}`);
    if (shareddata) {
      setTableData(JSON.parse(shareddata));
    }
  }, []);
  const [colWidths, setColWidths] = useState([
    5, 5, 25, 25, 150, 25, 25, 25, 150,
  ]);
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
        localStorage.setItem(
          `table_colWidths_${tablename}`,
          JSON.stringify(updatedWidths)
        );
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
    console.log(e.clipboardData);
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

  const pushToHistory = (data: string[][]) => {
    setHistory((prev) => [...prev, JSON.parse(JSON.stringify(data))]);
    setRedoStack([]); // clear redo stack on new action
  };

  const [RealTimeMeasurment, setRealTimemeasuremtn] = useState<string[]>([]);

  const [RealTimeGradingRule, setRealTimeGradingRule] = useState<string[]>([]);
  const handleCellChange = (rowIdx: number, colIdx: number, value: string) => {
    const updated = [...tableData];
    updated[rowIdx][colIdx] = value;
    setTableData(updated);

    const topMeasIdx = columnHeaders.indexOf("TOP CHANGED MEASUREMENT");
    const ppMeasIdx = columnHeaders.indexOf("PP CHANGED MEASUREMENT");
    const fitMeasIdx = columnHeaders.indexOf("FIT CHANGED MEASUREMENT");
    const msrMeasIdx = columnHeaders.indexOf("MSR MEASUREMENT");
    const realTimeMeasIdx = columnHeaders.indexOf("REAL TIME MEASUREMENT");
    function updateRealTimeMeasurement(row: any) {
      row[realTimeMeasIdx] =
        row[topMeasIdx] ||
        row[ppMeasIdx] ||
        row[fitMeasIdx] ||
        row[msrMeasIdx] ||
        "";
    }
    if ([topMeasIdx, ppMeasIdx, fitMeasIdx, msrMeasIdx].includes(colIdx)) {
      updateRealTimeMeasurement(updated[rowIdx]);
    }

    // Inside handleCellChange, after updating the cell:
    if ([topMeasIdx, ppMeasIdx, fitMeasIdx, msrMeasIdx].includes(colIdx)) {
      updateRealTimeMeasurement(updated[rowIdx]);
    }
    // Grading rule logic
    const topIdx = columnHeaders.indexOf("TOP CHANGED GRADING RULE");
    const ppIdx = columnHeaders.indexOf("PP CHANGED GRADING RULE");
    const fitIdx = columnHeaders.indexOf("FIT GRADING RULE");
    const msrIdx = columnHeaders.indexOf("MSR GRADING RULE");
    const realTimeIdx = columnHeaders.indexOf("REAL TIME GRADING RULE");

    function updateRealTimeGradingRule(row: any) {
      row[realTimeIdx] =
        row[topIdx] || row[ppIdx] || row[fitIdx] || row[msrIdx] || "";
    }
    if ([topIdx, ppIdx, fitIdx, msrIdx].includes(colIdx)) {
      updateRealTimeGradingRule(updated[rowIdx]);
    }

    // Always recalculate sizes on any cell change
    const msrMeasurementCol = columnHeaders.findIndex((header) =>
      header.includes("MSR MEASUREMENT")
    );
    const msrGradingRuleCol = columnHeaders.findIndex((header) =>
      header.includes("REAL TIME GRADING RULE")
    );

    const msrBaseSizeTypeCol = columnHeaders.findIndex((header) =>
      header.includes("base size type")
    );

    const baseSizeInput = updated[rowIdx][realTimeMeasIdx] as string;
    const gradingInput = updated[rowIdx][msrGradingRuleCol] as string;
    // You can use the value from the table if you want:
    // const baseSizeType = updated[rowIdx][msrBaseSizeTypeCol] as Row["baseSizeType"] || "S";
    const baseSizeType = "S";
    console.log(
      baseSizeType,
      String(RealTimeMeasurment[realTimeIdx]),
      gradingInput
    );
    const sizes = calculateSizes(baseSizeType, baseSizeInput, gradingInput);

    const xsCol = columnHeaders.findIndex((header) => header === "XS");
    const sCol = columnHeaders.findIndex((header) => header === "S");
    const mCol = columnHeaders.findIndex((header) => header === "M");
    const lCol = columnHeaders.findIndex((header) => header === "L");
    const xlCol = columnHeaders.findIndex((header) => header === "XL");

    if (xsCol !== -1)
      updated[rowIdx][xsCol] = toFractionString(sizes.xs).toString();
    if (sCol !== -1)
      updated[rowIdx][sCol] = toFractionString(sizes.s).toString();
    if (mCol !== -1)
      updated[rowIdx][mCol] = toFractionString(sizes.m).toString();
    if (lCol !== -1)
      updated[rowIdx][lCol] = toFractionString(sizes.l).toString();
    if (xlCol !== -1)
      updated[rowIdx][xlCol] = toFractionString(sizes.xl).toString();

    setTableData(updated);
  };
  function handlepastecellChange(colIndex: number) {
    const column = tableData.map((row) => row[colIndex]);
    for (let i = 0; i < column.length; i++) {
      let noWhitespaceText = (column[i] as string).split(/\s+/).join(" ");
      console.log(noWhitespaceText);
      handleCellChange(i, colIndex, noWhitespaceText);
    }
  }
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
    newHeaders.splice(index, 0, "");
    setColumnHeaders(newHeaders);

    const newData = tableData.map((row) => {
      const newRow = [...row];
      newRow.splice(index, 0, "");
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
  function calculateSizes(
    baseSizeType: Row["baseSizeType"],
    baseSizeInput: string,
    gradingInput: string
  ) {
    const gradingArr = parseGradingArray(gradingInput);
    const isSpecial = gradingArr.length === 4;
    const grading = isSpecial
      ? gradingArr
      : [
          parseFraction(gradingInput),
          parseFraction(gradingInput),
          parseFraction(gradingInput),
          parseFraction(gradingInput),
        ];
    let xs = NaN,
      s = NaN,
      m = NaN,
      l = NaN,
      xl = NaN;

    // Base size value
    let base = parseFraction(baseSizeInput);

    // Logic: left of base size is -, right is +
    switch (baseSizeType) {
      case "XS":
        xs = base;
        s = xs + grading[0];
        m = s + grading[1];
        l = m + grading[2];
        xl = l + grading[3];
        break;
      case "S":
        s = base;
        xs = s - grading[0];
        m = s + grading[1];
        l = m + grading[2];
        xl = l + grading[3];
        break;
      case "M":
        m = base;
        s = m - grading[1];
        xs = s - grading[0];
        l = m + grading[2];
        xl = l + grading[3];
        break;
      case "L":
        l = base;
        m = l - grading[2];
        s = m - grading[1];
        xs = s - grading[0];
        xl = l + grading[3];
        break;
      case "XL":
        xl = base;
        l = xl - grading[3];
        m = l - grading[2];
        s = m - grading[1];
        xs = s - grading[0];
        break;
    }
    return { xs, s, m, l, xl };
  }
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
    const savedWidths = localStorage.getItem(`table_colWidths_${tablename}`);
    if (savedWidths) {
      setColWidths(JSON.parse(savedWidths));
    }
  }, []);
  //   const handleFillColor = (color: string) => {
  //   setCellColors((prev) => {
  //     const newColors = [...prev.map((r) => [...r])];

  //     if (selectedRange) {
  //       const startRow = Math.min(selectedRange.start[0], selectedRange.end[0]);
  //       const endRow = Math.max(selectedRange.start[0], selectedRange.end[0]);
  //       const startCol = Math.min(selectedRange.start[1], selectedRange.end[1]);
  //       const endCol = Math.max(selectedRange.start[1], selectedRange.end[1]);

  //       for (let row = startRow; row <= endRow; row++) {
  //         for (let col = startCol; col <= endCol; col++) {
  //           newColors[row][col] = color;
  //         }
  //       }
  //     } else if (selectedCell) {
  //       const [row, col] = selectedCell;
  //       newColors[row][col] = color;
  //     }

  //     return newColors;
  //   });
  // };
  const highlightRow = (rowIndex: number, color = "#fff3cd") => {
    setCellColors((prev) => {
      const updated = [...prev];
      updated[rowIndex] = updated[rowIndex].map(() => color);
      return updated;
    });
  };
  const unhighlightRow = (rowIndex: number) => {
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
      left += colWidths[i] || 100; // fallback to 100px
    }
    return undefined;
  };
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
          </ul>
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
              <table className="table-fixed w-full text-sm border-content">
                <thead>
                  <tr className="no-print sticky top-0 z-30 bg-white border border-gray-300 p-2 text-sm font-semibold">
                    {tableData[0]?.map((_, i) => (
                      <>
                        <th
                          key={i}
                          draggable
                          style={{
                            // position: "relative",
                            width: colWidths[i], // Set default width
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
                              let temp = colWidths[i];
                              colWidths[i] = colWidths[draggedColIndex];
                              colWidths[draggedColIndex] = temp;
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
                          className={`border  ${
                            frozenColIndices.length > 0 &&
                            !frozenColIndices.includes(i) &&
                            i < Math.max(...frozenColIndices) &&
                            i !== 0 &&
                            i !== 1
                              ? "hidden"
                              : ""
                          }  ${isDragging ? "cursor-move" : "cursor-pointer"} ${
                            i === 0 ? "no-print" : ""
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
                            width: colWidths[i], // Set default width
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
                              let temp = colWidths[i];
                              colWidths[i] = colWidths[draggedColIndex];
                              colWidths[draggedColIndex] = temp;
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
                          className={`border  ${
                            frozenColIndices.length > 0 &&
                            !frozenColIndices.includes(i) &&
                            i < Math.max(...frozenColIndices) &&
                            i !== 0 &&
                            i !== 1
                              ? "hidden"
                              : ""
                          }  ${isDragging ? "cursor-move" : "cursor-pointer"} ${
                            i === 0 ? "no-print" : ""
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
                          if (
                            frozenColIndices.length > 0 &&
                            !frozenColIndices.includes(colIndex) &&
                            colIndex < Math.max(...frozenColIndices) &&
                            colIndex !== 0 &&
                            colIndex !== 1
                          )
                            return null;

                          return colIndex === 0 ? (
                            <td
                              style={{
                                backgroundColor:
                                  cellColors?.[rowIndex]?.[colIndex] || "",
                                width: colWidths[colIndex],
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
                              className={`no-print border  ${
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
                              className={`border `}
                              style={{
                                textAlign: "center",
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
                                  // onClick={(e) => e.stopPropagation()}
                                  onClick={(e) => {
                                    e.stopPropagation();
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
                                  className={`
                                     w-full h-auto  m-0 border   outline-none resize-none overflow-hidden whitespace-pre-wrap break-words`}
                                  rows={1}
                                />
                              </td>
                            ) : (
                              <td
                                style={{
                                  backgroundColor:
                                    cellColors?.[rowIndex]?.[colIndex] || "",
                                  width: colWidths[colIndex],
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
                                    ? "border-blue-500 ring-2 ring-blue-400"
                                    : "border-gray-300"
                                }
                                  ${
                                    isCellInRange(rowIndex, colIndex)
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
                                  console.log(e.clipboardData.getData("text"));

                                  const items = e.clipboardData?.files;
                                  if (items?.length)
                                    handleImagePasteOrDrop(
                                      items,
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
                                        onDoubleClick={(e) => {
                                          e.stopPropagation();
                                          setimageSeleted({
                                            rownumber: rowIndex,
                                            colnumber: colIndex,
                                            imgindex: i,
                                          });
                                          handleOpenImageEditor(src, src);
                                        }}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          aspectRatio: "9/16",
                                        }}
                                        onKeyDown={(e) => {
                                          if (
                                            (e.ctrlKey || e.metaKey) &&
                                            e.key === "c"
                                          ) {
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
                                <p className="no-print text-sm text-gray-400">
                                  Drop or paste image
                                </p>
                              </td>
                            )
                          ) : (
                            <td
                              style={{
                                backgroundColor:
                                  cellColors?.[rowIndex]?.[colIndex] || "",
                                width: colWidths[colIndex],
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
                              className={` border} ${
                                selectedCell?.[0] === rowIndex &&
                                selectedCell?.[1] === colIndex
                                  ? "border-blue-500 ring-2 ring-blue-400"
                                  : "border-gray-300"
                              }
                                  ${
                                    isCellInRange(rowIndex, colIndex)
                                      ? "bg-blue-100"
                                      : ""
                                  }`}
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
                                  handlepastecellChange(colIndex);
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
                                className={`${
                                  rowIndex === 0
                                    ? "uppercase text-black p-3! text-[15px]!"
                                    : "p-3!"
                                } w-full h-auto m-0 border outline-none resize-none overflow-hidden whitespace-pre-wrap break-words`}
                                rows={1}
                              />
                              {/* <div
                                contentEditable={
                                  editingCell?.[0] === rowIndex &&
                                  editingCell?.[1] === colIndex
                                }
                                suppressContentEditableWarning={true}
                                onInput={(e) => {
                                  const value = (e.target as HTMLDivElement)
                                    .innerText;
                                  handleCellChange(rowIndex, colIndex, value);
                                }}
                                onDoubleClick={() =>
                                  setEditingCell([rowIndex, colIndex])
                                }
                                onBlur={() => setEditingCell(null)}
                                onPaste={(e) => {
                                  handlePaste(e, rowIndex, colIndex);
                                  setTimeout(() => {
                                    // Optional: Add height auto-resize logic if needed
                                  }, 0);
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
                                className={`${
                                  rowIndex === 0
                                    ? "uppercase text-black text-[15px]"
                                    : ""
                                } w-full h-full m-0 border outline-none whitespace-pre-wrap break-words px-3 py-2 resize-none flex items-center `}
                              >
                                {cell}
                              </div> */}
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
      {/* {isImageEditorOpen && editingImageInfo && (
        <ImageEditorModal
          isOpen={isImageEditorOpen}
          onClose={handleCloseImageEditor}
          image={editingImageInfo.image}
          onSave={(newImageDataUrl) => handleSaveEditedImage(newImageDataUrl)}
        />
      )} */}
    </>
  );
}
