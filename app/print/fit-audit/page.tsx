"use client";

import { useEffect, CSSProperties } from "react";
import { FaPrint } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaBackwardStep } from "react-icons/fa6";

export default function FitAuditPrintPage() {

  const router = useRouter();

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    handlePrint();
  }, []);

  const data = [
    {
      sno: 1,
      header: "WAFFLE",
      measurementType: "NO. OF WAFFLE LINES",
      location: 'IN 6" OF WAFFLE FABRIC',
      imageUrl: "/images/0.jpg",
      gradingRule: "0",
      xs: "25",
      s: "25",
    },
    {
      sno: 2,
      header: "WAFFLE",
      measurementType: '6" OF WAFFLE FABRIC',
      location: "EXTENDED",
      imageUrl: "/images/1.jpg",
      gradingRule: "0",
      xs: "10 3/4",
      s: "10 3/4",
    },
    {
      sno: 3,
      header: "HEADER 3",
      measurementType: "MEASUREMENT TYPE 3",
      location: "LOCATION 3",
      imageUrl: "/images/2.jpg",
      gradingRule: "3",
      xs: "2",
      s: "3",
    },
    {
      sno: 4,
      header: "HEADER 4",
      measurementType: "MEASUREMENT TYPE 4",
      location: "LOCATION 4",
      imageUrl: "/images/3.jpg",
      gradingRule: "4",
      xs: "3",
      s: "4",
    },
    {
      sno: 5,
      header: "HEADER 5",
      measurementType: "MEASUREMENT TYPE 5",
      location: "LOCATION 5",
      imageUrl: "/images/4.jpg",
      gradingRule: "0",
      xs: "4",
      s: "5",
    },
    {
      sno: 6,
      header: "HEADER 6",
      measurementType: "MEASUREMENT TYPE 6",
      location: "LOCATION 6",
      imageUrl: "/images/5.jpg",
      gradingRule: "1",
      xs: "3",
      s: "4",
    },
    {
      sno: 7,
      header: "HEADER 7",
      measurementType: "MEASUREMENT TYPE 7",
      location: "LOCATION 7",
      imageUrl: "/images/6.jpg",
      gradingRule: "2",
      xs: "4",
      s: "5",
    },
    {
      sno: 8,
      header: "HEADER 8",
      measurementType: "MEASUREMENT TYPE 8",
      location: "LOCATION 8",
      imageUrl: "/images/7.jpg",
      gradingRule: "2",
      xs: "4",
      s: "5",
    },
    {
      sno: 9,
      header: "HEADER 9",
      measurementType: "MEASUREMENT TYPE 9",
      location: "LOCATION 9",
      imageUrl: "/images/8.jpg",
      gradingRule: "2",
      xs: "4",
      s: "5",
    },
  ];

  const headers = [
    { label: "S No", rowspan: 2, width: "30px" },
    { label: "Header", rowspan: 2, width: "40px" },
    { label: "Measurement Type", rowspan: 2, width: "160px" },
    { label: "Location", rowspan: 2, width: "90px" },
    { label: "Picture", rowspan: 2, width: "140px" },
    { label: "Grading Rule", rowspan: 2, width: "40px" },
    { label: "XS", rowspan: 2, width: "40px" },
    { label: "S", rowspan: 2, width: "40px" },
    { label: "Factory QA", rowspan: 2, width: "50px" },
    {
      label: "DKC Tech",
      colspan: 2,
      width: "80px",
      children: [
        { label: "Right", width: "40px" },
        { label: "Left", width: "40px" },
      ],
    },
    {
      label: "Difference",
      colspan: 2,
      width: "80px",
      children: [
        { label: "Right", width: "40px" },
        { label: "Left", width: "40px" },
      ],
    },
  ];

  const tdStyle: CSSProperties = {
    border: "1px solid #000",
    borderRight: "1px solid #000",
    borderBottom: "1px solid #000",
    fontSize: "10px",
    textAlign: "center",
    padding: "4px",
    verticalAlign: "middle",
    boxSizing: "border-box",
  };

  const tdRotated: CSSProperties = {
    ...tdStyle,
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    fontWeight: "bold",
  };

  const paginate = (arr: any[], size: number = 3) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const pages = paginate(data);

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
        <div>
          <strong>Print Id</strong> – 1020
        </div>
        <div>
          <strong>Print date</strong> – {new Date().toLocaleDateString()}
        </div>
      </div>
      <div style={{ fontSize: "20px" }}>Style Name – FIT AUDIT</div>
      <div style={{ textAlign: "right" }}>
        <div>
          <strong>Form Version</strong> – 1.0
        </div>
        <div>Form Version date – 2025‑07‑14</div>
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
        className="onprint"
        style={{
          display: "none",
          position: "absolute", 
          bottom: "1px", 
          right: "20px", 
          fontSize: "10px", 
          fontFamily: "Arial"
        }}
      >
        Page {currentPage} of {totalPages}
      </div>
    )
  }

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
            className="flex items-center gap-2 px-3 py-1 rounded bg-blue-300 shadow cursor-pointer hover:bg-blue-400 text-white font-bold"
          >
            <FaPrint />
            Print
          </button>
          <button
            onClick={() => router.push("/fit-audit")}
            className="flex items-center gap-2 px-3 py-1 rounded bg-blue-300 hover:bg-blue-400 shadow cursor-pointer text-white font-bold"
          >
            <FaBackwardStep />
            Back to Fit Audit
          </button>
        </div>
        {pages.map((rows, pageIndex) => (
          <div
            key={pageIndex}
            className="mb-8 relative print:relative"
            style={{
              height: "1123px", 
              position: "relative"
            }}
          >
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
                  <div>TNA Date: _________</div>
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
                border: "1px solid black"
              }}
            >
              <thead>
                <tr>
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      rowSpan={h.rowspan || 1}
                      colSpan={h.colspan || 1}
                      style={{
                        ...tdStyle,
                        backgroundColor: "#fff",
                        width: h.width,
                      }}
                    >
                      {h.label}
                    </th>
                  ))}
                </tr>
                <tr>
                  {headers.flatMap((h) =>
                    h.children
                      ? h.children.map((child, j) => (
                        <th
                          key={`${h.label}-${j}`}
                          style={{
                            ...tdStyle,
                            backgroundColor: "#fff",
                            width: child.width,
                          }}
                        >
                          {child.label}
                        </th>
                      ))
                      : []
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx} style={{ height: "300px" }}>
                    <td style={tdStyle}>{row.sno}</td>
                    <td style={tdRotated}>{row.header}</td>
                    <td style={tdStyle}>{row.measurementType}</td>
                    <td style={tdStyle}>{row.location}</td>
                    <td style={{ ...tdStyle, padding: 0 }}>
                      <div style={{ height: "100%", width: "100%" }}>
                        <img
                          src={row.imageUrl}
                          alt="pic"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                    </td>
                    <td style={tdStyle}>{row.gradingRule}</td>
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

            {/* Page count footer */}

            <PrintFooter
              currentPage={pageIndex + 1}
              totalPages={pages.length}
            />

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
