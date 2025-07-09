"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaFolderOpen } from "react-icons/fa";
import { use } from "react";
import InfoBox from "@/components/core/InfoBox";

// Data
const orders = [
  {
    name: "NS Blake Thermal",
    id: "ns-blake-thermal",
    quantity: 180,
    contains: [
      "Sampling",
      "Master-110",
      "Tech Graded Spec",
      "Fit.PP.Top.Web",
      "QA Audit Forms",
      "QA Audit Analysis",
    ],
  },
  {
    name: "Naval Blake Thermal",
    id: "naval",
    quantity: 220,
    contains: [
      "Sampling",
      "Master-110",
      "Tech Graded Spec",
      "Fit.PP.Top.Web",
      "QA Audit Forms",
      "QA Audit Analysis",
    ],
  },
];

const master = {
  name: "Master",
  id: "master",
  quantity: 400,
  contains: ["Sampling Watchpoint", "Tech Graded Specs", "Production Watchpoint"],
};

// Utility function
const convertKebabToTitle = (str: string) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const VendorPage = ({ params }: { params: { style: string } }) => {
  const router = useRouter();
  const { style } = params;
  const styleTitle = convertKebabToTitle(style);

  const handleVendorClick = (orderId: string) => {
    router.push(`/production-styles/${style}/${orderId}`);
  };

  const FolderCard = ({
    name,
    id,
    quantity,
    contains,
  }: {
    name: string;
    id: string;
    quantity: number;
    contains?: string[];
  }) => {
    const isMaster = id === "master";

    return (
      <div
        onClick={() => handleVendorClick(id)}
        className={`cursor-pointer w-[350px] min-h-[300px] border rounded-xl shadow-sm transition-all 
        flex flex-col px-5 pt-4 pb-10 relative
        ${isMaster
            ? "bg-white border-blue-300 hover:ring-2 hover:ring-blue-300"
            : "bg-yellow-50 border-gray-200 hover:ring-2 hover:ring-yellow-300"
          }`}
      >
        {/* Folder Title */}

        <div className="text-lg font-bold text-gray-800 text-center mb-3">{name}</div>

        {/* ----------- MASTER Layout ----------- */}

        {contains && isMaster ? (
          <div className="flex flex-col items-center justify-center gap-3 mb-3">

            {/* First row: Sampling Watchpoint and Tech Graded Specs */}

            <div className="flex justify-between w-full gap-4">
              {contains.slice(0, 2).map((sub, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center text-white text-xs font-medium 
                  w-full h-[95px] rounded-md px-2 py-2 shadow-sm text-center
                  ${sub.toLowerCase().includes("sampling")
                      ? "bg-gray-300 text-gray-600"
                      : "bg-blue-400"
                    }`}
                >
                  <FaFolderOpen className="w-5 h-5 mb-1" />
                  <span className="leading-tight break-words">{sub}</span>
                </div>
              ))}
            </div>

            {/* Second row: Production Watchpoint Centered */}

            <div className="flex justify-center w-[190px] mt-1">
              <div className="bg-blue-400 flex flex-col items-center justify-center text-white text-xs font-medium 
              w-2/3 h-[95px] rounded-md px-2 py-2 shadow-sm text-center"
              >
                <FaFolderOpen className="w-5 h-5 mb-1" />
                <span className="leading-tight break-words">{contains[2]}</span>
              </div>
            </div>
          </div>

        ) : contains && !isMaster ? (
          // ----------- Orders Grid Layout (2 columns) -----------
          <div className="grid grid-cols-2 gap-3 mb-3 px-1">
            {contains.map((sub, idx) => (
              <div
                key={idx}
                className="bg-yellow-100 rounded-md shadow-sm text-sm text-gray-700 font-medium
                flex items-center justify-center h-[80px] w-full text-center px-3"
              >
                {sub}
              </div>
            ))}
          </div>
        ) : null}

        {/* Footer for Quantity */}
        <div
          className={`absolute text-sm font-semibold text-gray-700 ${isMaster
            ? "bottom-1 right-3"
            : "bottom-2 left-3"
            }`}
        >
          <span className="font-bold">
            {isMaster ? "Total Style Qty:" : "Order Qty:"}
          </span>{" "}
          {quantity}
        </div>
      </div>
    );
  };

  return (
    <>
      <InfoBox/>
      
      <div className="px-9 py-8 min-h-screen bg-gray-50">
        {/* Page Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-8">
          Production Styles / {styleTitle}
        </h2>

        {/* Master Folder */}

        <div className="mb-6">
          <FolderCard {...master} />
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Orders Section */}
        <h2 className="text-xl font-semibold mt-8 mb-8">Orders</h2>

        <div className="flex flex-wrap gap-6">
          {orders.map((order) => (
            <FolderCard key={order.id} {...order} />
          ))}
        </div>
      </div>
    </>
  );
};

export default VendorPage;
