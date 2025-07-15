"use client";

import { useEffect } from "react";

export default function QaInitialReportPrintPage() {

    useEffect(() => {
        window.print();
    }, []);

    const PrintHeader = () => (
        <div
            className="onprint"
            style={{
                display: "none",
                justifyContent: "space-between",
                fontWeight: 500,
                fontSize: 12,
                fontFamily: "Arial",
                margin: "10px 0",
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

    const tdStyle: CSSProperties = {
        border: "1px solid #000",
        fontSize: "10px",
        textAlign: "center",
        padding: "4px",
        verticalAlign: "middle",
        boxSizing: "border-box",
    };

    return (
        <>
            <style jsx global>{`
        @media print {
          .onprint {
            display: flex !important;
          }
          .no-print {
            display: none;
          }
        }
        td, th {
          box-sizing: border-box;
        }
        body {
          background-color: white;
        }
      `}</style>

            <div className="p-6 print:p-0 mx-auto bg-white text-xs" style={{ maxWidth: "1400px" }}>
                <div className="no-print flex justify-end mb-4">
                    <button
                        onClick={() => window.print()}
                        className="px-4 py-2 bg-black text-white rounded hover:opacity-80 transition"
                    >
                        Print
                    </button>
                </div>

                <PrintHeader />

                {/* QA Initial Report Layout */}
                <div className="border border-black text-[11px]">
                    {/* Row 1 */}
                    <div className="grid grid-cols-6 border-b border-black">
                        <div className="p-1 border-r border-black">Inspection Stage</div>
                        <div className="p-1 border-r border-black col-span-1">Final</div>
                        <div className="p-1 border-r border-black">Style Number</div>
                        <div className="p-1 border-r border-black col-span-1">STL-9043</div>
                        <div className="p-1 border-r border-black">Dated</div>
                        <div className="p-1">2025-07-14</div>
                    </div>

                    {/* Row 2 */}
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

                    {/* Color Header Row */}
                    <div className="grid grid-cols-7 border-b border-black text-center font-medium">
                        <div className="border-r border-black p-1">PO Number</div>
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="border-r border-black">
                                Color {i + 1}
                                <div className="p-1 border-t border-black">Green</div>
                            </div>
                        ))}
                    </div>

                    {/* Color Rows */}
                    {colorData.map((row, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-7 border-b border-black">
                            <div className="border-r border-black p-1 text-center">PO-{1000 + rowIndex}</div>
                            {row.map((val, colIndex) => (
                                <div key={colIndex} className="border-r border-black p-1 text-center">
                                    {val}
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Total Row */}
                    <div className="grid grid-cols-7 text-center font-medium border-b border-black">
                        <div className="border-r border-black p-1">Total</div>
                        {totals.map((total, i) => (
                            <div key={i} className="border-r border-black p-1">{total}</div>
                        ))}
                    </div>

                    {/* Three Instruction Sections */}
                    <div className="grid grid-cols-5 gap-4 my-4">
                        {/* Left Instructions */}
                        <div className="border border-black col-span-2">
                            {[
                                "Allowed pcs to cut by DKC merchant",
                                "PCS cut as written in cutting register",
                                "PCS allowed to stitch as per DKC merchant",
                                "PCS loaded as per loading register",
                                "Floor tag chk -- if it correct or need change",
                            ].map((item, idx) => (
                                <div key={idx} className="grid grid-cols-3 border-b border-black">
                                    <div className="p-1 border-r border-black text-center">{idx + 1}</div>
                                    <div className="p-1 border-r border-black">{item}</div>
                                    <div className="p-1">Yes</div>
                                </div>
                            ))}
                        </div>

                        {/* Center Block - Instruction from Merchant */}
                        <div className="col-span-1 border border-black">
                            <div className="text-center font-semibold border-b border-black p-1">
                                Instruction From Merchant
                            </div>
                            {[
                                "DKC merchant to allow pcs to cut",
                                "DKC merchant to allow pcs to stitch",
                                "Floor Tag Given Date"
                            ].map((text, idx) => (
                                <div key={idx} className="grid grid-cols-2 border-b border-black">
                                    <div className="border-r border-black p-1">{text}</div>
                                    <div className="p-1">Confirmed</div>
                                </div>
                            ))}
                            {/* Fillers to match height */}
                            {[...Array(2)].map((_, idx) => (
                                <div key={idx} className="grid grid-cols-2 border-b border-white">
                                    <div className="p-1 text-white">-</div>
                                    <div className="p-1 text-white">-</div>
                                </div>
                            ))}
                        </div>

                        {/* Right Block - Special Instruction for QA */}
                        <div className="col-span-2 border border-black">
                            <div className="text-center font-semibold border-b border-black p-1">
                                Special Instruction for QA
                            </div>
                            {[
                                "All pcs loaded on machine must be checked",
                                "There is not fail or pass — all pcs to be corrected",
                                "Take pcs before and after correction"
                            ].map((text, idx) => (
                                <div key={idx} className="grid grid-cols-3 border-b border-black">
                                    <div className="p-1 border-r border-black text-center">{idx + 1}</div>
                                    <div className="p-1 border-r border-black">{text}</div>
                                    <div className="p-1">Done</div>
                                </div>
                            ))}
                            {/* Fillers to match height */}
                            {[...Array(2)].map((_, idx) => (
                                <div key={idx} className="grid grid-cols-3 border-b border-white">
                                    <div className="p-1 text-white">-</div>
                                    <div className="p-1 text-white">-</div>
                                    <div className="p-1 text-white">-</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔽 Additional QA Audit Table with Updated Headers and Demo Data */}

            <div className="p-14 mb-12" style={{ pageBreakBefore: "always" }}>
                <div className="onprint" style={{
                    display: "none",
                    justifyContent: "space-between",
                    fontWeight: 500,
                    fontSize: 12,
                    fontFamily: "Arial",
                    margin: "10px 0"
                }}>
                    <div>
                        <div><strong>Print Id</strong> – 3042</div>
                        <div><strong>Print date</strong> – {new Date().toLocaleDateString()}</div>
                    </div>
                    <div style={{ fontSize: "20px" }}>QA Initial Report</div>
                    <div style={{ textAlign: "right" }}>
                        <div><strong>Form Version</strong> – 1.0</div>
                        <div>Form Version date – 2025‑07‑14</div>
                    </div>
                </div>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        tableLayout: "fixed",
                        border: "1px solid black",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ ...tdStyle, width: "30px" }}>S.No</th>
                            <th style={{ ...tdStyle, width: "80px" }}>Date</th>
                            <th style={{ ...tdStyle, width: "120px" }}>Issue Name</th>
                            <th style={{ ...tdStyle, width: "160px" }}>Watchpoint</th>
                            <th style={{ ...tdStyle, width: "160px" }}>Measurement Picture</th>
                            <th style={{ ...tdStyle, width: "160px" }}>How to Solve</th>
                            <th style={{ ...tdStyle, width: "160px" }}>Measurement Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            {
                                date: "2025-07-08",
                                issue: "Thread Pull",
                                watchpoint: "Sleeve Join",
                                solution: "Thread trimmed",
                            },
                            {
                                date: "2025-07-09",
                                issue: "Skipped Stitch",
                                watchpoint: "Side Seam",
                                solution: "Re-stitched with correct tension",
                            },
                            {
                                date: "2025-07-10",
                                issue: "Hole in Fabric",
                                watchpoint: "Back Panel",
                                solution: "Patch added and overlocked",
                            },
                            {
                                date: "2025-07-11",
                                issue: "Uneven Button Placement",
                                watchpoint: "Front Placket",
                                solution: "Buttons re-aligned",
                            },
                            {
                                date: "2025-07-12",
                                issue: "Loose Hem",
                                watchpoint: "Bottom Hem",
                                solution: "Stitched again tightly",
                            },
                            {
                                date: "2025-07-13",
                                issue: "Broken Stitch",
                                watchpoint: "Shoulder Line",
                                solution: "Fixed with double stitch",
                            },
                            {
                                date: "2025-07-14",
                                issue: "Smudged Print",
                                watchpoint: "Chest Print",
                                solution: "Reprinted with fresh ink",
                            },
                            {
                                date: "2025-07-15",
                                issue: "Misaligned Pocket",
                                watchpoint: "Left Chest",
                                solution: "Pocket repositioned",
                            },
                        ].map((row, i) => (
                            <tr key={i}>
                                <td style={tdStyle}>{i + 1}</td>
                                <td style={tdStyle}>{row.date}</td>
                                <td style={tdStyle}>{row.issue}</td>
                                <td style={tdStyle}>{row.watchpoint}</td>
                                <td style={{ ...tdStyle, padding: 0 }}>
                                    <img
                                        src={`/images/${i % 5}.jpg`}
                                        alt="Before"
                                        style={{
                                            width: "100%",
                                            height: "25vh",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                    />
                                </td>
                                <td style={tdStyle}>{row.solution}</td>
                                <td style={{ ...tdStyle, padding: 0 }}>
                                    <img
                                        src={`/images/${(i + 1) % 5}.jpg`}
                                        alt="After"
                                        style={{
                                            width: "100%",
                                            height: "25vh",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}
