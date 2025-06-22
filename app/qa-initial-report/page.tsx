"use client";

import SheetTitle from "@/components/core/SheetTitle";
import Table from "@/components/core/Table";
import { useState } from "react";

export default function QaIntialReport() {
  const [poNumber, setPoNumber] = useState<string[]>([]);
  const [colorValues, setColorValues] = useState<string[][]>([
    Array(6).fill(Array(6).fill("")),
  ]);

  const handlePoNumberChange = (index: number, value: string) => {
    const newPoNumber = [...poNumber];
    newPoNumber[index] = value;
    setPoNumber(newPoNumber);
  };

  const handleColorChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    setColorValues((prev) => {
      const newColorValues = prev.map((row) => [...row]);
      newColorValues[rowIndex][colIndex] = value;
      return newColorValues;
    });
  };

  return (
    <div className="p-6">
      <div>
        <SheetTitle title="QA Intial Report" version="v1.4" />
      </div>

      {/* QA Report */}
      <div>
        {/* Inspection Form Header */}
        <div>
          {/* Form title */}
          <div className="text-center font-medium border border-black py-1">
            Inspection Form 127 for Initial -- Approved
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-6 border border-t-0 border-black">
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
          <div className="grid grid-cols-8 border border-t-0 border-black">
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
        </div>

        {/* Instructions Section */}
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

      {/* Page Content */}
      <Table />

      {/* Submit Button */}
      <button className="bg-purple-500 text-white px-4 py-2 mt-4 rounded">
        Submit
      </button>
    </div>
  );
}
