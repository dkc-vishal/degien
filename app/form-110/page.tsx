"use client";

import InputForm from "@/components/core/InputForm";
import SheetTitle from "@/components/core/SheetTitle";
import DynamicTable from "@/components/core/DynamicTable";
export default function Form110() {
  return (
    <div className="p-5">
      <SheetTitle title="Master 110" version="v1.4" />

      {/* Form inputs */}
      <InputForm
        label={[
          ["Style Name", "Sampling Merchant Name", "Production Merchant Name"],
          ["Style Number", "Vendor Name", "QA Name"],
          ["Tech Name", "JC Number", "Vendor PO"],
          ["Buyer PO"],
        ]}
      />
      <button
        className="flex items-center bg-green-600 mt-4 gap-1  font-medium px-2 py-1 rounded-xl shadow-md transition duration-200"
      >
        Add Repeat
      </button>
      <div className="print-container">
        <DynamicTable
          col={15}
          row={30}
          imagecol={6}
          imagecol2={10}
          tablename="110feeding"
          columnheaders={[
            "MOVE",
            "Sno",
            "Date",
            "Inspection Type",
            "Issue Name",
            "Comment",
            "Issue Picture",
            "Date",
            "Inspection Type",
            "Comment",
            "Issue Picture",
            "Date",
            "Inspection Type",
            "Comment",
            "Issue Picture",
          ]}
        />
      </div>
    </div>
  );
}
