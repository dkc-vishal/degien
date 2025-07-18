"use client";

import { CSSProperties } from "react";
import { FaPrint } from "react-icons/fa";
import { useRouter } from "next/navigation"
import { FaBackwardStep } from "react-icons/fa6";

const FT_COLUMNS = Array.from({ length: 10 }, (_, i) => `FT No ${i + 1}`);

export default function InspectionPointPrintPage() {

  const router = useRouter();

  const handleBack = () => {
    router.push("/inspection-point-print");
  }

  const handlePrint = () => window.print();

  const getRowHeightForPage = (pageIndex: number, totalPages: number, rowsInPage: number) => {
    const pageHeight = 1123;
    const pageCounterHeight = 20; // Further reduced
    const printHeaderHeight = 35; // Further reduced 
    const styleInfoHeight = pageIndex === 0 ? 70 : 0; // Further reduced
    const tableHeaderHeight = 45; // Slightly increased for better header visibility
    const tableMargins = 3; // Minimal margins to maximize row space
    
    const availableHeight = pageHeight - pageCounterHeight - printHeaderHeight - styleInfoHeight - tableHeaderHeight - tableMargins;
    
    // Always calculate for exactly 3 rows per page (since that's what we display)
    const actualRowsPerPage = 3;
    const calculatedHeight = Math.floor(availableHeight / actualRowsPerPage);
    
    // Use the full calculated height to maximize page utilization
    return calculatedHeight;
  };

  // useEffect(() => {
  //   handlePrint();
  // }, []);

  const data = Array.from({ length: 9 }, (_, i) => ({
    sno: i + 1,
    issue: `Issue ${i + 1}`,
    comment: `Watchpoint/Comment ${i + 1}`,
    imageUrl: `/images/${i % 5}.jpg`,
    ft: Array.from({ length: 10 }, () => ""),
  }));

  const headers = [
    { label: "S.No", width: "25px" }, // Slightly reduced to give more space to image
    { label: "Issue Name / Stage", width: "90px" }, // Slightly reduced
    { label: "Comments / Trigger / Watchpoints", width: "140px" }, // Slightly reduced
    { label: "Issue Picture", width: "200px" }, // Increased significantly for images
    ...FT_COLUMNS.map((label) => ({ label, width: "45px" })), // Slightly reduced to accommodate image column
  ];

  const tdStyle: CSSProperties = {
    border: "1px solid #000",
    fontSize: "16px", // Increased even more for better visibility in large rows
    textAlign: "center",
    padding: "15px", // Increased padding for larger rows
    verticalAlign: "middle",
    boxSizing: "border-box",
    lineHeight: "1.5", // Better line spacing for larger text
    fontWeight: "500", // Slightly bolder for better readability
  };

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
        <div><strong>Print Id</strong> – 2048</div>
        <div><strong>Print date</strong> – {new Date().toLocaleDateString()}</div>
      </div>
      <div style={{ fontSize: "20px" }}>Inspection Point Form</div>
      <div style={{ textAlign: "right" }}>
        <div><strong>Form Version</strong> – 1.4</div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            backgroundColor: "#e0e0e0", // light gray 
            padding: "1px 2px",
            borderRadius: "2px",
            display: "inline-block"
          }}
        >
          Form Version date – 14-07-2025
        </div>
      </div>
    </div>
  );

  const PrintFooter = ({
    currentPage,
    totalPages,
  }: {
    currentPage: number;
    totalPages: number;
  }) => {
    return (
      <div
        style={{
          fontSize: "12px", // Reduced to give more space to rows
          fontFamily: "Arial",
          marginBottom: "10px", // Reduced margin
          borderBottom: "1px solid #000", 
          width: "fit-content",
          paddingBottom: "3px", // Reduced padding
          fontWeight: "bold"
        }}
      >
        Page {currentPage} of {totalPages}
      </div>
    )
  }

  const dynamicPaginate = (data: any[]) => {
    const maxRowsPerPage = 3; // Keep max 3 rows per page
    const pages = [];
    
    for (let i = 0; i < data.length; i += maxRowsPerPage) {
      pages.push(data.slice(i, i + maxRowsPerPage));
    }
    
    return pages;
  };

  const pages = dynamicPaginate(data);

  return (
    <>
      <style jsx global>{`
        body {
          background-color: white;
        }
        td,
        th {
          box-sizing: border-box;
        }
        @media print {
          body {
            background-color: white !important;
          }
          .onprint {
            display: flex !important;
          }
          .no-print {
            display: none;
          }
          thead {
            display: table-header-group;
          }
          tr,
          td,
          th {
            page-break-inside: avoid;
            box-sizing: border-box;
          }
        }
      `}</style>

      <div className="p-4 print:p-0 mx-auto bg-white" style={{ maxWidth: "1370px" }}>
        <div className="no-print flex gap-4 mb-8">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-1 rounded bg-blue-300 shadow cursor-pointer hover:bg-blue-400 text-white font-semibold"
          >
            <FaPrint />
            Print
          </button>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-3 py-1 rounded bg-blue-300 shadow cursor-pointer hover:bg-blue-400 text-white font-semibold"
          >
            <FaBackwardStep />
            Back to Inspection Point Page
          </button>
        </div>
        {pages.map((rows, pageIndex) => (
          <div
            key={pageIndex}
            className="mb-8 relative print:relative"
            style={{
              height: "1123px",
              position: "relative",
              display: "flex",
              flexDirection: "column"
            }}
          >

            {/* Page count at top left */}

            <PrintFooter
              currentPage={pageIndex + 1}
              totalPages={pages.length}
            />

            <PrintHeader />

            {pageIndex === 0 && (
              <div className="flex justify-between border p-5 text-base" style={{ marginTop: "8px", marginBottom: "3px", fontSize: "15px" }}>
                <div style={{ lineHeight: "1.7" }}>
                  <div><strong>Style Name:</strong> _________</div>
                  <div><strong>Vendor Name:</strong> _________</div>
                  <div><strong>Tech Name:</strong> _________</div>
                  <div><strong>Merchant Name:</strong> _________</div>
                </div>
                <div style={{ lineHeight: "1.7" }}>
                  <div><strong>Style Number:</strong> _________</div>
                  <div><strong>Inspection Type:</strong> _________</div>
                  <div><strong>Color:</strong> _________</div>
                  <div><strong>Size:</strong> _________</div>
                </div>
                <div style={{ lineHeight: "1.7" }}>
                  <div><strong>QA Name:</strong> _________</div>
                  <div><strong>Received Date:</strong> _________</div>
                  <div><strong>Check Date:</strong> _________</div>
                </div>
              </div>
            )}

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed",
                border: "1px solid black",
                marginTop: "10px", // Increased margin
                flex: "1"
              }}
            >
              <thead>
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} style={{ 
                      ...tdStyle, 
                      backgroundColor: "#fff", 
                      width: h.width,
                      fontSize: "15px", // Increased header size
                      fontWeight: "bold",
                      padding: "10px" // Increased padding for headers
                    }}>
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      height: `${getRowHeightForPage(pageIndex, pages.length, rows.length)}px`
                    }}
                  >
                    <td style={tdStyle}>{row.sno}</td>
                    <td style={tdStyle}>{row.issue}</td>
                    <td style={tdStyle}>{row.comment}</td>
                    <td style={{ ...tdStyle, padding: "5px", height: "100%" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            aspectRatio: "9 / 16", // Maintained 9:16 aspect ratio
                            height: "95%", // Use most of the available height
                            maxWidth: "95%", // Use most of the available width
                            position: "relative",
                            overflow: "hidden",
                            border: "1px solid #ddd", // Added subtle border for better definition
                          }}
                        >
                          <img
                            src={row.imageUrl}
                            alt="Issue"
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    {row.ft.map((_: any, i: number) => (
                      <td key={i} style={tdStyle}></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Page break after each page except last */}

            {
              pageIndex < pages.length - 1 && <div style={{
                pageBreakAfter: "always"
              }} />
            }

          </div>
        ))}
      </div>
    </>
  );
}
