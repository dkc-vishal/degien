"use client";

import SheetTitle from "@/components/core/SheetTitle";
import Table from "../../components/core/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaPrint } from "react-icons/fa";
type ColumnMetadata = {
  header: string;
  is_hidden: boolean;
  is_moveable: boolean;
  width: number;
};
export default function QaIntialReport() {
  const [columnHeaders, setcolumnHeaders] = useState<ColumnMetadata[]>([]);
  const [tableData, setTableData] = useState({});
  const [poNumber, setPoNumber] = useState<string[]>([]);
  const [colorValues, setColorValues] = useState<string[][]>([
    Array(6).fill(Array(6).fill("")),
  ]);
  const handlePrint = () => {
    window.print();
  };
  async function fetchdata() {
    const res = await axios.get(
      "http://gulab.local:8000/api/v1.0/spreadsheet/29a7c9f9-d199-4365-9567-e248693e68c8/"
    );
    const col_metadata: Record<string, ColumnMetadata> = await res.data.data
      .column_metadata;
      console.log(col_metadata)
    setTableData(res.data.data);
    setcolumnHeaders(Object.values(col_metadata));
  }
  useEffect(() => {
    fetchdata();
  }, []);




  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            zoom: 75%; Scale down to fit page 
          }
        }
      `}</style>
      <div className="p-6">
        <div>
          <SheetTitle title="QA Initial Reports" version="v1.4" />
          <button
            onClick={handlePrint}
            className="flex items-center gap-1  font-medium px-4 py-1 mb-2 rounded-xl shadow-md transition duration-200"
          >
            <FaPrint />
          </button>
        </div>

        <div className="mid  mx-auto border-2 border-black text-xs leading-tight">
          {/* Form title */}

          {/* Row 1 */}
          <div className="data grid grid-cols-6 border border-t-0 border-black">
            <div className="col-span-1 border-r border-black p-1">
              Inspection Stage
            </div>
            <input
              className="col-span-1 outline-none border-2 border-red-500 p-1"
              placeholder="MERCHANT TO FILL"
            />
            <div className="col-span-1 border-r border-black p-1">
              Style Number
            </div>
            <input
              className="col-span-1 outline-none border-2 border-red-500 p-1"
              placeholder="MERCHANT TO FILL"
            />

            <div className="col-span-1 border-r border-black p-1">Dated</div>
            <input
              className="col-span-1 outline-none border-2 border-red-500 p-1"
              placeholder="MERCHANT TO FILL"
            />
          </div>

          {/* Row 2 */}
          <div className="data grid grid-cols-8 border border-t-0 border-black">
            <div className="col-span-1 border-r border-black p-1">QA Name</div>
            <input
              className="col-span-1 outline-none border-2 border-red-500 p-1"
              placeholder="MERCHANT TO FILL"
            />
            <div className="col-span-1 border-r border-black p-1">
              DKC Merchant Name
            </div>
            <input
              className="col-span-1 outline-none border-2 border-red-500 p-1"
              placeholder="MERCHANT TO FILL"
            />
            <div className="col-span-1 border-r border-black p-1">Vendor</div>
            <input
              className="col-span-1 outline-none border-2 border-red-500 p-1"
              placeholder="MERCHANT TO FILL"
            />
            <div className="col-span-1 border-r border-black p-1">T&A Date</div>
            <input
              className="col-span-1 outline-none border-2 border-red-500 p-1"
              placeholder="MERCHANT TO FILL"
            />
          </div>

          {/* Row 3 (Color headers) */}
          <div className="grid grid-cols-7 border border-t-0 border-black text-center font-medium">
            <div className="border-r col-span-1 border-black p-1">
              PO Number
            </div>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`${
                  i === 5 ? "" : "border-r"
                } col-span-1 border-black `}
              >
                Color {i + 1}
                <div
                  key={i}
                  className={`${
                    !poNumber.some((num) => num && num.trim() !== "")
                      ? "border-2 border-red-500"
                      : "border-r border-black"
                  }`}
                >
                  <input
                    key={i}
                    className="border-none outline-none p-1"
                    placeholder="MERCHANT TO FILL"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Buyer PO Rows */}

          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-7 border border-t-0 border-black"
            >
              <div
                className={`${
                  !poNumber.some((num) => num && num.trim() !== "")
                    ? "border-2 border-red-500"
                    : "border-r border-black"
                }`}
              >
                <input
                  className={`outline-none p-1`}
                  placeholder="PO Number"
                  value={poNumber[i]}
                  onChange={(e) => handlePoNumberChange(i, e.target.value)}
                />
              </div>
              {[...Array(6)].map((_, j) => (
                <input
                  key={i * j}
                  className={`${j === 5 ? "" : "border-r"} outline-none p-1 ${
                    !poNumber.some((num) => num && num.trim() !== "")
                      ? "border-2 border-red-500"
                      : "border-r border-black"
                  }`}
                  placeholder="MERCHANT TO FILL"
                  // value={colorValues[i]?.[j]}
                  // onChange={(e) => handleColorChange(i, j, e.target.value)}
                />
              ))}
            </div>
          ))}

          {/* Total Row */}
          <div className="grid grid-cols-7 border border-t-0 border-black font-medium text-center">
            <div className="border-r border-black p-1">Total</div>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`${i === 5 ? "" : "border-r"} border-black p-1`}
              >
                0
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-4 my-4">
            {/* Left Instructions */}
            <div className="border border-b-0 border-black text-sm col-span-2">
              {[
                "Allowed pcs to cut by dkc merchant",
                "PCS cut as written in cutting register",
                "PCS allowed to stitch as per DKC merchant",
                "PCS loaded as per loading register",
                "Floor tag chk -- if it correct or need change",
              ].map((text, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[40px_1fr_1fr] border-b border-black"
                >
                  <div className="border-r border-black grid p-2 w-10 text-center">
                    {i + 1}
                  </div>
                  <div className="p-2 flex-1 border-r border-black">{text}</div>

                  <input
                    type="text"
                    className="col-span-1 h-full p-1 outline-none border-2 border-red-500"
                  />
                </div>
              ))}
            </div>

            {/* Center Instructions From Merchant */}
            <div className="text-sm col-span-1">
              <div className="border border-black p-2 font-semibold text-center">
                Instruction From Merchant
              </div>
              {[
                "DKC merchant to allow pcs to cut",
                "DKC merchant to allow pcs to stitch",
                "Floor Tag GivenDate",
              ].map((text, i) => (
                <div key={i} className="grid grid-cols-2 border-b border-black">
                  <div className="border border-y-0 border-black p-2 col-span-1">
                    {text}
                  </div>

                  <input
                    type="text"
                    className="col-span-1 h-full p-1 outline-none border-2 border-red-500"
                  />
                </div>
              ))}
            </div>

            {/* Right Special Instructions */}
            <div className="text-sm col-span-2">
              <div className="border border-black p-2 font-semibold text-center">
                Special Instruction for QA
              </div>
              {[
                "All pcs loaded on machine must be checked",
                "There is not fail or pass all pcs to be corrected",
                "Take pcs before and after correction",
              ].map((text, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[40px_1fr_1fr] border-b border-black"
                >
                  <div className="border border-y-0 border-black p-2 w-10 text-center">
                    {i + 1}
                  </div>
                  <div className="p-2 flex-1 border-r border-black">{text}</div>
                  <input
                    type="text"
                    className="col-span-1 h-full p-1 outline-none border-2 border-red-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{marginTop:"75px"}} className="print-container">
               {columnHeaders.length > 0 && (
                 <Table
                   col={14}
                   row={120}
                   imagecol={5}
                   tablename="mid-final"
                   columnheaders={columnHeaders}
                   spreadsheet={tableData}
                 />
               )}
        </div>
      </div>
    </>
  );
}
