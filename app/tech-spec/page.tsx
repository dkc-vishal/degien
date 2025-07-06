"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/core/Table spec";
import Link from "next/link";
import axios from "axios";
import { FaPrint } from "react-icons/fa";
import SheetTitle from "@/components/core/SheetTitle";
import InputForm from "@/components/core/InputForm";
type ColumnMetadata = {
  data_type: string;
  header: string;
  is_editable: boolean;
  is_frozen: boolean;
  is_hidden: boolean;
  is_moveable: boolean;
  width: number;
};
export default function TechSpecSheet() {
  const [columnHeaders, setcolumnHeaders] = useState<ColumnMetadata[]>([]);
  const [tableData, setTableData] = useState({});
  async function fetchdata() {
    const res = await axios.get(
      "http://shivam-mac.local:8001/api/v1.0/spreadsheet/580d3753-8487-4d98-909e-c3b52580f21c"
    );
    const col_metadata: Record<string, ColumnMetadata> = await res.data.data
      .column_metadata;
    // console.log(col_metadata);
    setTableData(res.data.data);
    setcolumnHeaders(Object.values(col_metadata));
  }
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <div className=" flex-1 flex flex-col p-6">
        {/* Form inputs */}
        <div className="">
          <SheetTitle
            title="Tech Specs Measurement Sheet"
            version="v1.4"
            printpage="/techspecprintpage"
          />
          <Link
            href="/printpage"
            className="py-1 rounded-xl shadow-md transition duration-200"
          >
            <FaPrint />
          </Link>

          <InputForm
            label={[
              ["Style Name", "Buyer PO Number", "Vendor PO Number"],
              ["Merchant Name", "Vendor Name", "Spec Valid Till"],
              ["Tech Name", "Base Size", "QA Name", "Order Quantity"],
            ]}
          />
        </div>

        {/* Page Content */}
        {columnHeaders.length > 0 && (
          <Table
            col={22}
            row={20}
            imagecol={6}
            tablename="tech spec"
            columnheaders={columnHeaders}
            spreadsheet={tableData}
          />
        )}
        {/* Footer */}
      </div>
    </>
  );
}
