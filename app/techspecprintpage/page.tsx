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
      m: "25",
      l: "25",
      xl: "25",
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
      m: "10 3/4",
      l: "10 3/4",
      xl: "10 3/4",
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
      m: "4",
      l: "5",
      xl: "6",
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
      m: "5",
      l: "6",
      xl: "7",
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
      m: "6",
      l: "7",
      xl: "8",
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
      m: "6",
      l: "7",
      xl: "8",
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
      m: "6",
      l: "7",
      xl: "8",
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
      m: "6",
      l: "7",
      xl: "8",
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
      m: "6",
      l: "7",
      xl: "8",
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
      m: "6",
      l: "7",
      xl: "8",
    },
  ];

  const headers = [
    "S No",
    "Header",
    "Measurement Type",
    "Location",
    "Picture",
    "Grading Rule",
    "XS",
    "S",
    "M",
    "L",
    "XL",
  ];
  const tdStyle: CSSProperties = {
    border: "1px solid #000",
    textAlign: "center",
    height: "90px",
    padding: "2px",
    fontSize: "12px",
    minWidth: "60px",
  };
  const tdStyleHeaderRotated: CSSProperties = {
    ...tdStyle,
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    padding: "0",
    verticalAlign: "middle",
  };
  const paginate = (data: any[]) => {
    const pages = [];
    pages.push(data.slice(0, 4));
    for (let i = 4; i < data.length; i += 4) {
      pages.push(data.slice(i, i + 4));
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
            <strong>Version</strong> – 1.0
          </div>
          <div>Version date – 2025‑06‑23</div>
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
            // padding: 10px !important;
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
      <div className="p-5">
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

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {headers.map((h, i) => (
                      <th
                        key={i}
                        style={{
                          border: "1px solid #000",
                          padding: "4px",
                          backgroundColor: "#f0f0f0",
                          fontSize: "11px",
                          minWidth: "10px",
                        }}
                      >
                        {h}
                      </th>
                    ))}
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
                            width: "130px",
                            height: "200px",
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
                              src={`images/${idx}.jpg`}
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
                            width: "170px",
                            height: "250px",
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
                              src={`images/${idx}.jpg`}
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
                      <td style={tdStyle}>{row.m}</td>
                      <td style={tdStyle}>{row.l}</td>
                      <td style={tdStyle}>{row.xl}</td>
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
