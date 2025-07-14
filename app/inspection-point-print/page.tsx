"use client";

import React, { useState } from "react";
import { FaUser, FaClock } from "react-icons/fa";
import { FaPen, FaCheck } from "react-icons/fa6";
import { toast } from "sonner";
import TooltipLabel from "@/components/core/TooltipLabel";
import { FaTimes } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import { useRouter } from "next/navigation";

const FT_COLUMNS = Array.from({ length: 10 }, (_, i) => `FT No ${i + 1}`);

export default function InspectionPointPrint() {

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    styleName: "",
    techName: "",
    merchantName: "",
    vendorName: "",
    qaName: "",
  });

  const router = useRouter();

  const handlePrintRedirect = () => {
    router.push("/print/inspection-point-print")
  }

  const handleChange = (key: keyof typeof formData, value: string) => {
    if (!editMode) return;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    toast.success("Changes submitted successfully!");
    setEditMode(false);
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">Inspection Point Print</h1>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div className="font-semibold">Version v1.4</div>
            <div className="text-xs">July 9, 2025</div>
          </div>
        </div>

        {/* Meta Badges */}

        <div className="mt-3 mb-5 flex items-center justify-between">

          {/* Print button: left-aligned */}

          <button
            onClick={handlePrintRedirect}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-800 text-white cursor-pointer text-xs rounded-md shadow-sm"
          >
            <MdPrint className="w-4 h-4" />
            Print
          </button>

          {/* Last edited badges (right-aligned) */}

          <div className="flex gap-4">
            <span className="inline-flex items-center gap-2 bg-blue-100 text-gray-700 text-xs px-3 py-1 rounded-full">
              <FaUser className="w-3 h-3" />
              Last Edited by: <span className="font-medium">Sonu NM</span>
            </span>
            <span className="inline-flex items-center gap-2 bg-blue-100 text-gray-700 text-xs px-3 py-1 rounded-full">
              <FaClock className="w-3 h-3" />
              Last Edited at: <span className="font-medium">July 9, 10:00 AM</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <Input
          label="Style Name"
          placeholder="Enter style name"
          value={formData.styleName}
          disabled={!editMode}
          onChange={(val) => handleChange("styleName", val)}
          tooltip={`1st Feeder: Merchant\n2nd Feeder: Tech team\nSource: Buyer PO Number`}
        />
        <Input
          label="Tech Name"
          placeholder="Enter tech name"
          value={formData.techName}
          disabled={!editMode}
          onChange={(val) => handleChange("techName", val)}
          tooltip={`1st Feeder: Merchant\n2nd Feeder: Tech team\nSource: DKC Internal`}
        />
        <Input
          label="Merchant Name"
          placeholder="Enter merchant name"
          value={formData.merchantName}
          disabled={!editMode}
          onChange={(val) => handleChange("merchantName", val)}
          tooltip={`1st Feeder: Merchant\n2nd Feeder: Tech team\nSource: DKC Internal`}
        />
        <Input
          label="Vendor Name"
          placeholder="Enter vendor name"
          value={formData.vendorName}
          disabled={!editMode}
          onChange={(val) => handleChange("vendorName", val)}
          tooltip={`1st Feeder: Merchant\n2nd Feeder: Tech team\nSource: DKC Internal`}
        />
        <Input
          label="QA Name"
          placeholder="Enter QA name"
          value={formData.qaName}
          disabled={!editMode}
          onChange={(val) => handleChange("qaName", val)}
          tooltip={`1st Feeder: Merchant\n2nd Feeder: Tech team\nSource: DKC Internal`}
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow border rounded-md overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">S.No.</th>
              <th className="px-4 py-2 border">Issue Name / Stage</th>
              <th className="px-4 py-2 border">Comments / Trigger / Watchpoints</th>
              <th className="px-4 py-2 border">Issue Picture</th>
              {FT_COLUMNS.map((ft) => (
                <th key={ft} className="px-4 py-2 border">{ft}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 14 }).map((_, j) => (
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

// Reusable Input Field with Tooltip
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
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full px-3 py-1.5 border rounded-md text-sm ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
  </div>
);
