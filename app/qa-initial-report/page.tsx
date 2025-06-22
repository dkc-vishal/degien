"use client";

import SheetTitle from "@/components/core/SheetTitle";
import Table from "@/components/core/Table";

export default function QaIntialReport() {
  return (
    <>
      {/* Form inputs */}
      <div className="p-6">
        <SheetTitle title="QA Intial Report" version="v1.4" />
      </div>

      {/* Page Content */}
      <Table col={12} row={10} imagecol={3} colwidth={[50,50,50,150,50,50,50,50,50,50]}/>
    </>
  );
}
