"use client";

import QAInitialReportTable from "./QAInitialReportTable";
import { MdPrint } from "react-icons/md";

export default function QAInitialReportPrintPage() {

  const handlePrint = () => {
    window.print();
  }

  const tableData = [
    { date: "2025-07-08", issue: "Thread Pull", watchpoint: "Sleeve Join", solution: "Thread trimmed" },
    { date: "2025-07-09", issue: "Skipped Stitch", watchpoint: "Side Seam", solution: "Re-stitched with correct tension" },
    { date: "2025-07-10", issue: "Hole in Fabric", watchpoint: "Back Panel", solution: "Patch added and overlocked" },
    { date: "2025-07-11", issue: "Uneven Button Placement", watchpoint: "Front Placket", solution: "Buttons re-aligned" },
    { date: "2025-07-12", issue: "Loose Hem", watchpoint: "Bottom Hem", solution: "Stitched again tightly" },
    { date: "2025-07-13", issue: "Broken Stitch", watchpoint: "Shoulder Line", solution: "Fixed with double stitch" },
    { date: "2025-07-14", issue: "Smudged Print", watchpoint: "Chest Print", solution: "Reprinted with fresh ink" },
    { date: "2025-07-15", issue: "Misaligned Pocket", watchpoint: "Left Chest", solution: "Pocket repositioned" },
    { date: "2025-07-16", issue: "Loose Thread", watchpoint: "Back Yoke", solution: "Trimmed" },
    { date: "2025-07-17", issue: "Wrong Stitch", watchpoint: "Neckline", solution: "Re-stitched" },
  ];

  const colorData = [
    [5, 3, 4, 6, 2, 1],
    [4, 2, 5, 7, 1, 3],
    [3, 1, 4, 5, 2, 2],
    [6, 2, 3, 5, 3, 4],
    [2, 4, 1, 3, 5, 6],
    [5, 3, 4, 2, 1, 3],
  ];

  const totals = colorData[0].map((_, colIndex) =>
    colorData.reduce((sum, row) => sum + row[colIndex], 0)
  );

  const totalPages = 4;

  const PrintHeader = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: 500,
        fontSize: 12,
        fontFamily: "Arial",
        marginBottom: "10px",
      }}
    >
      <div>
        <div><strong>Print Id</strong> – 3040</div>
        <div><strong>Print date</strong> – {new Date().toLocaleDateString()}</div>
      </div>
      <div style={{ fontSize: "20px" }}>QA Initial Report</div>
      <div style={{ textAlign: "right" }}>
        <div><strong>Form Version</strong> – 1.0</div>
        <div>Form Version date – 2025‑07‑14</div>
      </div>
    </div>
  );

  return (
    <>
      <div className="mx-auto text-xs space-y-6">
        {/* Page 1 */}

        <button
          onClick={handlePrint}
          className="fixed top-36 left-110  flex items-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md text-sm font-medium shadow-md print:hidden cursor-pointer"
        >
          <MdPrint className="text-lg" />
          Print
        </button>

        <div style={{
          width: "800px",
          height: "1120px",
          margin: "2rem auto",
          padding: "24px",
          border: "1px solid #000",
          background: "#fff",
          boxSizing: "border-box",
          position: "relative"
        }}>
          <PrintHeader />

          {/* Main Report Section */}
          <div className="border border-black text-[11px]">
            <div className="grid grid-cols-6 border-b border-black">
              <div className="p-1 border-r border-black">Inspection Stage</div>
              <div className="p-1 border-r border-black">Final</div>
              <div className="p-1 border-r border-black">Style Number</div>
              <div className="p-1 border-r border-black">STL-9043</div>
              <div className="p-1 border-r border-black">Dated</div>
              <div className="p-1 border-r border-black">2025-07-14</div>
            </div>

            <div className="grid grid-cols-8 border-b border-black">
              <div className="p-1 border-r border-black">QA Name</div>
              <div className="p-1 border-r border-black">Karan</div>
              <div className="p-1 border-r border-black">DKC Merchant Name</div>
              <div className="p-1 border-r border-black">Abhishek</div>
              <div className="p-1 border-r border-black">Vendor</div>
              <div className="p-1 border-r border-black">Manthan Apparels</div>
              <div className="p-1 border-r border-black">T&A Date</div>
              <div className="p-1">2025-07-12</div>
            </div>

            <div className="grid grid-cols-7 border-b border-black text-center font-medium">
              <div className="border-r border-black p-1">PO Number</div>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-r border-black">
                  Color {i + 1}
                  <div className="p-1 border-t border-black">Green</div>
                </div>
              ))}
            </div>

            {colorData.map((row, i) => (
              <div key={i} className="grid grid-cols-7 border-b border-black">
                <div className="border-r border-black p-1 text-center">PO-{1000 + i}</div>
                {row.map((val, j) => (
                  <div key={j} className="border-r border-black p-1 text-center">{val}</div>
                ))}
              </div>
            ))}

            <div className="grid grid-cols-7 text-center font-medium border-b border-black">
              <div className="border-r border-black p-1">Total</div>
              {totals.map((total, i) => (
                <div key={i} className="border-r border-black p-1">{total}</div>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-4 my-4">
              <div className="border border-black col-span-2">
                {[
                  "Allowed pcs to cut by DKC merchant",
                  "PCS cut as written in cutting register",
                  "PCS allowed to stitch as per DKC merchant",
                  "PCS loaded as per loading register",
                  "Floor tag chk -- if it correct or need change",
                ].map((text, idx) => (
                  <div key={idx} className="grid grid-cols-3 border-b border-black">
                    <div className="p-1 border-r border-black text-center">{idx + 1}</div>
                    <div className="p-1 border-r border-black">{text}</div>
                    <div className="p-1">Yes</div>
                  </div>
                ))}
              </div>

              <div className="border border-black col-span-1">
                <div className="text-center font-semibold border-b border-black p-1">
                  Instruction From Merchant
                </div>
                {[
                  "DKC merchant to allow pcs to cut",
                  "DKC merchant to allow pcs to stitch",
                  "Floor Tag Given Date",
                ].map((text, idx) => (
                  <div key={idx} className="grid grid-cols-2 border-b border-black">
                    <div className="p-1 border-r border-black">{text}</div>
                    <div className="p-1">Confirmed</div>
                  </div>
                ))}
              </div>

              <div className="border border-black col-span-2">
                <div className="text-center font-semibold border-b border-black p-1">
                  Special Instruction for QA
                </div>
                {[
                  "All pcs loaded on machine must be checked",
                  "There is not fail or pass — all pcs to be corrected",
                  "Take pcs before and after correction",
                ].map((text, idx) => (
                  <div key={idx} className="grid grid-cols-3 border-b border-black">
                    <div className="p-1 border-r border-black text-center">{idx + 1}</div>
                    <div className="p-1 border-r border-black">{text}</div>
                    <div className="p-1">Done</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <QAInitialReportTable
            tableData={tableData}
            startIndex={0}
            endIndex={1}
            pageNumber={1}
            totalPages={totalPages}
          />
        </div>

        {/* Additional Pages */}
        {[1, 2, 3].map((pageIndex) => (
          <QAInitialReportTable
            key={pageIndex}
            tableData={tableData}
            startIndex={1 + (pageIndex - 1) * 3}
            endIndex={1 + pageIndex * 3}
            pageNumber={pageIndex + 1}
            totalPages={totalPages}
          />
        ))}
      </div>
      <div className="text-center text-[11px] font-medium mt-34 print:block print:text-black">
        Page 1 of {totalPages}
      </div>
    </>
  );
}
