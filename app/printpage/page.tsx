"use client";

import { useEffect } from "react";
import { CSSProperties } from "react";
import { FaPrint } from "react-icons/fa";

export default function PrintPage() {
  const handlePrint = () => {
    window.print();
  };
  const measurements = [
    {
      sno: 1,
      header: "WAFFLE",
      measurementType: "NO. OF WAFFLE LINES",
      location: 'IN 6" OF WAFFLE FABRIC',
      imageUrl: "https://picsum.photos/180/90?random=1",
      msrGradingRule: "0",
      xs: "25",
      s: "25",
    },
    {
      sno: 2,
      header: "WAFFLE",
      measurementType: '6" OF WAFFLE FABRIC',
      location: "EXTENDED",
      imageUrl: "https://picsum.photos/180/90?random=2",
      msrGradingRule: "0",
      xs: "10 3/4",
      s: "10 3/4",
    },
    {
      sno: 3,
      header: "HEADER 3",
      measurementType: "MEASUREMENT TYPE 3",
      location: "LOCATION 3",
      imageUrl: "https://picsum.photos/180/90?random=3",
      msrGradingRule: "3",
      xs: "2",
      s: "3",
    },
    {
      sno: 4,
      header: "HEADER 4",
      measurementType: "MEASUREMENT TYPE 4",
      location: "LOCATION 4",
      imageUrl: "https://picsum.photos/180/90?random=4",
      msrGradingRule: "4",
      xs: "3",
      s: "4",
    },
    {
      sno: 5,
      header: "HEADER 5",
      measurementType: "MEASUREMENT TYPE 5",
      location: "LOCATION 5",
      imageUrl: "https://picsum.photos/180/90?random=5",
      msrGradingRule: "0",
      xs: "4",
      s: "5",
    },
    {
      sno: 5,
      header: "HEADER 5",
      measurementType: "MEASUREMENT TYPE 5",
      location: "LOCATION 5",
      imageUrl: "https://picsum.photos/180/90?random=5",
      msrGradingRule: "0",
      xs: "4",
      s: "5",
    },
    {
      sno: 5,
      header: "HEADER 5",
      measurementType: "MEASUREMENT TYPE 5",
      location: "LOCATION 5",
      imageUrl: "https://picsum.photos/180/90?random=5",
      msrGradingRule: "0",
      xs: "4",
      s: "5",
    },
    {
      sno: 5,
      header: "HEADER 5",
      measurementType: "MEASUREMENT TYPE 5",
      location: "LOCATION 5",
      imageUrl: "https://picsum.photos/180/90?random=5",
      msrGradingRule: "0",
      xs: "4",
      s: "5",
    },
    {
      sno: 5,
      header: "HEADER 5",
      measurementType: "MEASUREMENT TYPE 5",
      location: "LOCATION 5",
      imageUrl: "https://picsum.photos/180/90?random=5",
      msrGradingRule: "0",
      xs: "4",
      s: "5",
    },
    {
      sno: 5,
      header: "HEADER 5",
      measurementType: "MEASUREMENT TYPE 5",
      location: "LOCATION 5",
      imageUrl: "https://picsum.photos/180/90?random=5",
      msrGradingRule: "0",
      xs: "4",
      s: "5",
    },
  ];
  const headers = [
    { label: "S No", rowspan: 2, width: "40px" },
    { label: "Header", rowspan: 2, width: "80px" },
    { label: "Measurement Type", rowspan: 2, width: "190px" },
    { label: "Location", rowspan: 2, width: "90px" },
    { label: "Picture", rowspan: 2, width: "130px" },
    { label: "Grading Rule", rowspan: 2, width: "70px" },
    { label: "XS", rowspan: 2, width: "80px" },
    { label: "S", rowspan: 2, width: "80px" },
    { label: "Factory QA", rowspan: 2, width: "80px" },
    {
      label: "DKC Tech",
      colspan: 2,
      children: [
        { label: "Left", width: "20px" },
        { label: "Right", width: "20px" },
      ],
    },
    { label: "Difference", rowspan: 2, width: "80px" },
  ];

  const tdStyle:CSSProperties = {
    border: "1px solid #000",
    padding: "4px",
    fontSize: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    wordWrap: "break-word",
  };

  const tdStyleHeaderRotated:CSSProperties = {
    ...tdStyle,
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    fontWeight: "bold",
    fontSize: "15px",
  };

  const paginate = (data: any[]) => {
    const pages = [];
    pages.push(data.slice(0, 2));
    for (let i = 4; i < data.length; i += 3) {
      pages.push(data.slice(i, i + 3));
    }
    return pages;
  };

  const pages = paginate(measurements);
  const PrintHeader = () => (
    <div style={{ marginBottom: 10, fontSize: 12, fontFamily: "Arial" }}>
      <div
        className="onprint"
        style={{
          display: "none",
          justifyContent: "space-between",
          fontWeight: 500,
        }}
      >
        <div>
          <div>
            <strong>Print Id</strong> – 1020
          </div>
          <div>
            <strong>Print date</strong> – 2025‑06‑23
          </div>
        </div>
        <div style={{ fontSize: "20px" }}>Style Name – FORM NAME</div>
        <div style={{ textAlign: "right" }}>
          <div>
            <strong>Form Version</strong> – 1.0
          </div>
          <div>Form Version date – 2025‑06‑23</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style jsx global>{`
        @media print {
          .print-header {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            font-size: 12px;
            font-family: Arial;
            background: #f5f6f8;
            border-bottom: 2px solid #ccc;
            padding: 8px 10px;
            z-index: 9999;
          }
          .onprint {
            display: flex !important;
          }
          body {
            margin-top: 10px !important;
            padding: 10px !important;
          }
          .widthchange {
            width: 100% !important;
          }
          thead {
            display: table-header-group;
          }
          tr,
          td,
          th {
            // width: auto !important;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="widthchange p-5 w-[60%]">
        <div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1  font-medium px-4 py-1 rounded-xl shadow-md transition duration-200"
          >
            <FaPrint />
          </button>
        </div>
        {pages.map((pageRows, pageIndex) => (
          <>
            <PrintHeader />

            <div key={pageIndex} style={{ marginBottom: "40px" }}>
              {/* Only first page shows the extra info box */}
              {pageIndex === 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    border: "1px solid black",
                    padding: "10px",
                    margin: "10px 0",
                  }}
                >
                  <div>
                    Style Name ________________ <br />
                    Vendor Name ________________ <br />
                    QA/Tech Name ________________ <br />
                    Merchant ________________
                  </div>
                  <div>
                    Style Number ________________ <br />
                    Inspection Type ________________ <br />
                    Color ________________ <br />
                    Size ________________
                  </div>
                </div>
              )}

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  tableLayout: "fixed", // Ensures fixed column width
                }}
              >
                <thead>
                  {/* First header row */}
                  <tr>
                    {headers.map((h, i) => (
                      <th
                        key={i}
                        colSpan={h.colspan || 1}
                        rowSpan={h.rowspan || 1}
                        style={{
                          border: "1px solid #000",
                          padding: "4px",
                          backgroundColor: "#f0f0f0",
                          fontSize: "11px",
                          minWidth: 10,
                          width: h.width || "auto",
                          textAlign: "center",
                        }}
                      >
                        {h.label}
                      </th>
                    ))}
                  </tr>

                  {/* Second header row for children like "Left" and "Right" under "DKC Tech" */}
                  <tr>
                    {headers.map((h, i) =>
                      h.children
                        ? h.children.map((child, j) => (
                            <th
                              key={`${i}-${j}`}
                              style={{
                                border: "1px solid #000",
                                padding: "4px",
                                backgroundColor: "#f9f9f9",
                                fontSize: "11px",
                                minWidth: "10px",
                                width: child.width || "auto",
                                textAlign: "center",
                              }}
                            >
                              {child.label}
                            </th>
                          ))
                        : null
                    )}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row, idx) => (
                    <tr key={idx}>
                      <td style={tdStyle}>{row.sno}</td>
                      <td style={tdStyleHeaderRotated}>{row.header}</td>
                      <td style={tdStyle}>{row.measurementType}</td>
                      <td style={tdStyle}>{row.location}</td>
                      {pageIndex === 0 ? (
                        <td
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "0px",
                            width: "150px",
                            height: "150px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              aspectRatio: "9 / 16",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={row.imageUrl}
                              alt="Measurement"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                          </div>
                        </td>
                      ) : (
                        <td
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "0px",
                            width: "130px",
                            height: "150px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              aspectRatio: "9 / 16",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={row.imageUrl}
                              alt="Measurement"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                          </div>
                        </td>
                      )}
                      <td style={tdStyle}>{row.msrGradingRule}</td>
                      <td style={tdStyle}>{row.xs}</td>
                      <td style={tdStyle}>{row.s}</td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Add a page break after each page except the last */}
              {pageIndex < pages.length - 1 && (
                <div style={{ pageBreakAfter: "always" }} />
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
}
