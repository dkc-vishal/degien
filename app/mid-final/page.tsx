"use client";

import SheetTitle from "@/components/core/SheetTitle";
import Table from "@/components/core/Table";
import React from "react";

const MidReportForm = () => {
  return (
    <div className="p-6">
      <div>
        <SheetTitle title="Tech Final & QA Mid Reports" version="v1.4" />
      </div>

      <div className="mid  mx-auto border border-black text-xs leading-tight">
        {/* Form title */}
        <div className="text-center font-medium border-b border-black py-1">
          Inspection Form 128 ( for mid and final )
        </div>

        {/* Row 1 */}
        <div className="data grid grid-cols-6 border-b border-black">
          <div className="col-span-1 border-2 border-red-600">
            Inspection Stage
          </div>
          <input className="col-span-1 border-r border-black p-1" />
          <div  className="col-span-1 border-r border-black p-1">
            Style Number
          </div>
          <input className="col-span-1 border-2 border-red-600 p-1" />

          <div className="col-span-1 border-r border-black p-1">Dated</div>
          <input className="col-span-1 p-1 border-2 border-red-600" />
        </div>

        {/* Row 2 */}
        <div className=" data grid grid-cols-8 border-b border-black">
          <div className="col-span-1 border-r border-black p-1">QA Name</div>
          <input className="col-span-1 border-2 border-red-600" />
          <div className="col-span-1 border-r border-black p-1">
            DKC Merchant Name
          </div>
          <input className="col-span-1 border-2 border-red-600 p-1" />
          <div className="col-span-1 border-r border-black p-1">Vendor</div>
          <input className="col-span-1 border-2 border-red-600 p-1" />
          <div className="col-span-1 border-r border-black p-1">T&A Date</div>
          <input className="col-span-1 border-2 border-red-600 p-1" />
        </div>

        <div className="flex">
          <div className="mr-2 border-1 border-black">
            {/* Row 3 (Color headers) */}
            <div className="grid grid-cols-7 border-b border-black text-center font-medium">
              <div className="border-r col-span-1 border-black p-1">
                Buyer PO
              </div>
              {[...Array(6)].map((_, i) => (
                <div key={i} className={` col-span-1 border-black `}>
                  Color
                  <div key={i} className={`border-t border-r border-black`}>
                    <input
                      key={i}
                      className="outline-none border-l-2 border-t-2 border-red-600 p-1"
                      title="MERCHANT TO FILL"
                      placeholder="MERCHANT TO FILL"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Buyer PO Rows */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="grid grid-cols-7 border-b border-black">
                <input
                  className="border-2  border-red-600 p-1"
                  placeholder="Buyer PO"
                />
                {[...Array(6)].map((_, j) => (
                  <input
                    key={j}
                    placeholder="MERCHANT TO FILL"
                    className={`${
                      j === 5 ? "" : "border-r"
                    } outline-none border-2 border-red-600 p-1`}
                  />
                ))}
              </div>
            ))}

            {/* Total Row */}
            <div className="grid grid-cols-7 border-b border-black font-medium text-center">
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
          <div>

            {[
              "DKC MERCHANT   TO ALLOW PCS TO CUT",
              "DKC MERCHANT ALLOWED PCS TO STITCH",
              "FLOOR TAG  GIVEN DATE",
              "Smell Check",
              "Wash Care Check",
              "Folding Check",
              "Price Sticker",
            ].map((label, i) => (
              <div
                key={i}
                className="grid grid-cols-2 border border-t-0 border-black"
              >
                <div className="border-r border-black p-1">{label}</div>
                <input className="p-1 border-t-2 border-x-2 border-red-600" />
              </div>
            ))}
          </div>
        </div>

        {/* AQL Quality */}
        <div className="grid grid-cols-7 border border-t-0 border-black">
          <div className="border-r border-black p-1">AQL Quality</div>
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              title="MERCHANT TO FILL"
              placeholder="MERCHANT TO FILL"
              className=" border-x-2 border-t-2 border-red-600 p-1"
            />
          ))}
        </div>

        {/* Quality Checked */}
        <div className="grid grid-cols-7 border border-t-0 border-black">
          <div className="border-r border-black p-1">Quality Checked</div>
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              title="MERCHANT TO FILL"
              placeholder="MERCHANT TO FILL"
              className="border-2 border-r border-red-600 p-1"
            />
          ))}
        </div>

        {/* RESULT section */}
        <div className="font-semibold text-base mt-2 p-1">RESULT</div>
      </div>

      <Table col={12} row={10} imagecol={3} colwidth={[25,25,25,25,45,25,25,25,25]}/>
    </div>
  );
};

export default MidReportForm;
