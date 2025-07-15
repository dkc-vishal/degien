"use client";

import { useEffect, CSSProperties } from "react";
import { FaPrint } from "react-icons/fa";

const FT_COLUMNS = Array.from({ length: 10 }, (_, i) => `FT No ${i + 1}`);

export default function InspectionPointPrintPage() {
  const handlePrint = () => window.print();

  useEffect(() => {
    handlePrint();
  }, []);

  const data = Array.from({ length: 9 }, (_, i) => ({
    sno: i + 1,
    issue: `Issue ${i + 1}`,
    comment: `Watchpoint/Comment ${i + 1}`,
    imageUrl: `/images/${i % 5}.jpg`,
    ft: Array.from({ length: 10 }, () => ""),
  }));

  const headers = [
    { label: "S.No", width: "30px" },
    { label: "Issue Name / Stage", width: "100px" },
    { label: "Comments / Trigger / Watchpoints", width: "160px" },
    { label: "Issue Picture", width: "160px" },
    ...FT_COLUMNS.map((label) => ({ label, width: "50px" })),
  ];

  const tdStyle: CSSProperties = {
    border: "1px solid #000",
    fontSize: "10px",
    textAlign: "center",
    padding: "4px",
    verticalAlign: "middle",
    boxSizing: "border-box",
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
        <div>Form Version date – 2025‑07‑14</div>
      </div>
    </div>
  );

  const paginate = (arr: any[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const pages = paginate(data, 3); // 3 rows per page

  return (
    <>
      <style jsx global>{`
        body {
          background-color: white;
        }
        @media print {
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
          }
        }
      `}</style>

      <div className="p-4 print:p-0 mx-auto bg-white" style={{ maxWidth: "1370px" }}>
        <button
          onClick={handlePrint}
          className="no-print mb-4 flex items-center gap-2 px-3 py-1 rounded bg-gray-200 shadow cursor-pointer hover:bg-gray-300"
        >
          <FaPrint />
          Print
        </button>

        {pages.map((rows, pageIndex) => (
          <div key={pageIndex} className="mb-12" style={{ pageBreakAfter: pageIndex < pages.length - 1 ? "always" : "auto" }}>
            <PrintHeader />

            {pageIndex === 0 && (
              <div className="flex justify-between border p-4 my-4 text-sm">
                <div>
                  <div>Style Name: _________</div>
                  <div>Vendor Name: _________</div>
                  <div>Tech Name: _________</div>
                  <div>Merchant Name: _________</div>
                </div>
                <div>
                  <div>Style Number: _________</div>
                  <div>Inspection Type: _________</div>
                  <div>Color: _________</div>
                  <div>Size: _________</div>
                </div>
                <div>
                  <div>QA Name: _________</div>
                  <div>Received Date: _________</div>
                  <div>Check Date: _________</div>
                </div>
              </div>
            )}

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
                  {headers.map((h, i) => (
                    <th key={i} style={{ ...tdStyle, backgroundColor: "#fff", width: h.width }}>
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx} style={{ height: "25vh" }}>
                    <td style={tdStyle}>{row.sno}</td>
                    <td style={tdStyle}>{row.issue}</td>
                    <td style={tdStyle}>{row.comment}</td>
                    <td style={{ ...tdStyle, padding: 0 }}>
                      <div style={{ width: "100%", height: "100%" }}>
                        <img
                          src={row.imageUrl}
                          alt="Issue"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                    </td>
                    {row.ft.map((_, i) => (
                      <td key={i} style={tdStyle}></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}
