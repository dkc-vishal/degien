"use client";

import React, { useState } from "react";
import { FaUser, FaClock } from "react-icons/fa";
import { FaPen, FaCheck } from "react-icons/fa6";
import { toast } from "sonner";
import TooltipLabel from "@/components/core/TooltipLabel";
import { FaTimes } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function FitAuditSheet() {

  const [status, setStatus] = useState("fail");
  const [editMode, setEditMode] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    styleName: "",
    merchantName: "",
    styleNumber: "",
    qaTechName: "",
    vendorName: "",
    color: "",
    size: "XS",
    date: "",
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    if (!editMode) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    toast.success("Changes submitted successfully!");
    setEditMode(false);
  };

  const handlePrint = () => {
    router.push("/print/fit-audit")
  }

  return (
    <div className="flex-1 flex flex-col p-6 bg-gray-50 min-h-screen">

      {/* Title and Meta */}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Fit Audit Sheet</h1>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-white text-xs rounded-md shadow-sm hover:bg-gray-800 cursor-pointer"
            >
              <MdPrint className="w-4 h-4" />
              Print View
            </button>
          </div>

          <div className="flex flex-col items-end gap-1 text-sm text-gray-600">
            <div className="font-semibold">Version v1.4</div>
            <div className="text-xs">July 4, 2025</div>
          </div>
        </div>

        {/* Badges */}

        <div className="mt-3 mb-4 flex justify-end items-center">
          <div className="flex gap-4">
            <span className="inline-flex items-center gap-2 bg-blue-100 text-gray-700 text-xs px-3 py-1 rounded-full">
              <FaUser className="w-3 h-3" />
              Last Edited by: <span className="font-medium">Sonu NM</span>
            </span>
            <span className="inline-flex items-center gap-2 bg-blue-100 text-gray-700 text-xs px-3 py-1 rounded-full">
              <FaClock className="w-3 h-3" />
              Last Edited at: <span className="font-medium">Jul 4, 4:25 PM</span>
            </span>
          </div>
        </div>

        {/* Edit Mode Buttons */}

        <div className="w-full flex justify-start gap-4 mb-6">
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-red-300 bg-red-100 text-red-700 hover:bg-red-200 shadow-sm cursor-pointer"
              >
                <FaTimes className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 shadow-sm cursor-pointer"
              >
                <FaCheck className="w-4 h-4" />
                Submit Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white text-sm rounded-md shadow-sm cursor-pointer"
            >
              <FaPen className="w-4 h-4" />
              Enter Edit Mode
            </button>
          )}
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 items-end">
        <Input
          label="Style Name"
          placeholder="Enter style name"
          tooltip={`First Feeder: Merchant\nSecond Feeder: Tech Team\nSource: Buyer PO Number`}
          value={formData.styleName}
          onChange={(val) => handleChange("styleName", val)}
          disabled={!editMode}
        />
        <Input
          label="Merchant Name"
          placeholder="Enter merchant name"
          tooltip={`First Feeder: Merchant\nSecond Feeder: Tech Team\nSource: Buyer PO Number`}
          value={formData.merchantName}
          onChange={(val) => handleChange("merchantName", val)}
          disabled={!editMode}
        />
        <Input
          label="Style Number"
          placeholder="Enter style number"
          tooltip={`First Feeder: Merchant\nSecond Feeder: Tech Team\nSource: Buyer PO Number`}
          value={formData.styleNumber}
          onChange={(val) => handleChange("styleNumber", val)}
          disabled={!editMode}
        />
        <Input
          label="QA/Tech Name"
          placeholder="Enter QA or Tech name"
          tooltip={`First Feeder: Merchant\nSecond Feeder: Tech Team\nSource: DKC Internal`}
          value={formData.qaTechName}
          onChange={(val) => handleChange("qaTechName", val)}
          disabled={!editMode}
        />
        <Input
          label="Vendor Name"
          placeholder="Enter vendor name"
          tooltip={`First Feeder: Merchant\nSecond Feeder: Tech Team\nSource: DKC Internal`}
          value={formData.vendorName}
          onChange={(val) => handleChange("vendorName", val)}
          disabled={!editMode}
        />
        <Input
          label="Color"
          placeholder="Enter color"
          tooltip={`First Feeder: Merchant\nSecond Feeder: Tech Team\nSource: Buyer PO`}
          value={formData.color}
          onChange={(val) => handleChange("color", val)}
          disabled={!editMode}
        />

        {/* Inspection Type - Read Only */}
        <div>
          <TooltipLabel
            label="Inspection Type"
            tooltip={`First Feeder: Merchant\nSecond Feeder: Tech Team\nSource: Buyer PO`}
          />
          <input
            type="text"
            value="From Backend"
            disabled
            className="w-full px-3 py-1.5 border rounded-md text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Size Dropdown */}
        <div>
          <TooltipLabel
            label="Size"
            tooltip={`First Feeder: Merchant\nSecond Feeder: Tech Team\nSource: Buyer PO`}
          />
          <select
            value={formData.size}
            disabled={!editMode}
            onChange={(e) => handleChange("size", e.target.value)}
            className={`w-full px-3 py-1.5 border rounded-md text-sm ${!editMode ? "bg-gray-100 text-gray-500" : "bg-white"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <TooltipLabel
            label="Date"
            tooltip={`First Feeder: Merchant\nSecond Feeder: Tech Team\nSource: Buyer PO`}
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            disabled={!editMode}
            className={`w-full px-3 py-1.5 border rounded-md text-sm ${!editMode ? "bg-gray-100 text-gray-500" : "bg-white"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>

      {/* Status Dropdown aligned right */}

      <div className="mb-10 mt-5 flex justify-end mr-25">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            ${status === "pass"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
            }`}
          style={{ width: "100px" }}
        >
          <option value="fail">Fail</option>
          <option value="pass">Pass</option>
        </select>
      </div>

      {/* Table Skeleton */}

      <div className="bg-white shadow border rounded-md overflow-x-auto">
        <table className="min-w-full text-sm text-center">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border" rowSpan={2}>S.No.</th>
              <th className="px-4 py-2 border" rowSpan={2}>Header</th>
              <th className="px-4 py-2 border" rowSpan={2}>Measurement Type</th>
              <th className="px-4 py-2 border" rowSpan={2}>Location</th>
              <th className="px-4 py-2 border" rowSpan={2}>Picture</th>
              <th className="px-4 py-2 border" rowSpan={2}>Grading Rule</th>
              <th className="px-4 py-2 border" rowSpan={2}>XS</th>
              <th className="px-4 py-2 border" rowSpan={2}>S</th>
              <th className="px-4 py-2 border" rowSpan={2}>Factory QA</th>
              <th className="px-4 py-2 border" colSpan={2}>DKC Tech</th>
              <th className="px-4 py-2 border" colSpan={2}>Difference</th>
            </tr>
            <tr>
              <th className="px-4 py-2 border">Left</th>
              <th className="px-4 py-2 border">Right</th>
              <th className="px-4 py-2 border">Left</th>
              <th className="px-4 py-2 border">Right</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 13 }).map((_, j) => (
                  <td key={j} className="px-4 py-2 border h-10"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Input with TooltipLabel
const Input = ({
  label,
  placeholder,
  tooltip,
  value,
  onChange,
  disabled,
}: {
  label: string;
  placeholder: string;
  tooltip?: string;
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
}) => (
  <div>
    <TooltipLabel label={label} tooltip={tooltip} />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full px-3 py-1.5 border rounded-md text-sm ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
  </div>
);
