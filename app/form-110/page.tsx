"use client";

import InputForm from "@/components/core/InputForm";
import SheetTitle from "@/components/core/SheetTitle";

export default function Form110() {
  return (
    <div className="p-6">
      <SheetTitle title="Form 110" version="v1.4" />

      {/* Form inputs */}
      <InputForm
        label={[
          ["Style Name", "Sampling Merchant Name", "Production Merchant Name"],
          ["Style Number", "Vendor Name", "QA Name"],
          ["Tech Name", "JC Number", "Vendor PO"],
          ["Buyer PO"],
        ]}
      />
    </div>
  );
}
