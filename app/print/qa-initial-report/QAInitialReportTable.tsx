"use client";

import React from "react";

interface TableRow {
  date: string;
  issue: string;
  watchpoint: string;
  solution: string;
}

interface QAInitialReportTableProps {
  tableData: TableRow[];
  startIndex: number;
  endIndex: number;
  pageNumber: number;
  totalPages: number;
}

export default function QAInitialReportTable({
  tableData,
  startIndex,
  endIndex,
  pageNumber,
  totalPages
}: QAInitialReportTableProps) {
  const tdStyle = {
    border: "1px solid #000",
    fontSize: "10px",
    textAlign: "center" as const,
    padding: "4px",
    verticalAlign: "middle" as const,
    boxSizing: "border-box" as const,
  };

  return (
    <div
      style={{
        width: "800px",
        height: "1120px",
        margin: "2rem auto",
        padding: "24px",
        border: "1px solid #000",
        background: "#fff",
        boxSizing: "border-box",
        position: "relative",
        pageBreakBefore: "always", // ✅ Ensure new page for table
      }}
    >
      {/* Page Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: 500,
        fontSize: 12,
        fontFamily: "Arial",
        marginBottom: "10px",
      }}>
        <div>
          <div><strong>Print Id</strong> – 3040</div>
          <div><strong>Print date</strong> – {new Date().toLocaleDateString()}</div>
        </div>
        <div style={{ fontSize: "20px", alignSelf: "center" }}>QA Initial Report</div>
        <div style={{ textAlign: "right" }}>
          <div><strong>Form Version</strong> – 1.0</div>
          <div>Form Version date – 2025‑07‑14</div>
        </div>
      </div>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed",
        border: "1px solid black"
      }}>
        <thead>
          <tr>
            <th style={{ ...tdStyle, width: "22px" }}>S.No</th>
            <th style={{ ...tdStyle, width: "50px" }}>Date</th>
            <th style={{ ...tdStyle, width: "80px" }}>Issue Name</th>
            <th style={{ ...tdStyle, width: "100px" }}>Watchpoint</th>
            <th style={{ ...tdStyle, width: "160px" }}>Before Correction</th>
            <th style={{ ...tdStyle, width: "100px" }}>How to Solve</th>
            <th style={{ ...tdStyle, width: "160px" }}>After Correction</th>
          </tr>
        </thead>
        <tbody>
          {tableData.slice(startIndex, endIndex).map((item, i) => (
            <tr key={i}>
              <td style={tdStyle}>{startIndex + i + 1}</td>
              <td style={tdStyle}>{item.date}</td>
              <td style={tdStyle}>{item.issue}</td>
              <td style={tdStyle}>{item.watchpoint}</td>
              <td style={{ ...tdStyle, padding: 0 }}>
                <img src={`/images/${(startIndex + i) % 5}.jpg`} style={{ width: "100%", height: "25vh", objectFit: "cover" }} />
              </td>
              <td style={tdStyle}>{item.solution}</td>
              <td style={{ ...tdStyle, padding: 0 }}>
                <img src={`/images/${(startIndex + i + 1) % 5}.jpg`} style={{ width: "100%", height: "25vh", objectFit: "cover" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer with Page Count */}
      <div style={{
        position: "absolute",
        bottom: "24px",
        left: "0",
        width: "100%",
        textAlign: "center",
        fontSize: "12px",
        fontFamily: "Arial",
        fontWeight: 500
      }}>
        Page {pageNumber} of {totalPages}
      </div>
    </div>
  );
}
