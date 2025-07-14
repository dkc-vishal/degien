"use client";
import React, { useEffect, useRef, useState } from "react";
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

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function TechSpecSheet() {
  const [columnHeaders, setcolumnHeaders] = useState<ColumnMetadata[]>([]);
  const [tableData, setTableData] = useState({});
  async function fetchdata() {
    try {
      const res = await axios.get(
        `${BASE_URL}/spreadsheet/580d3753-8487-4d98-909e-c3b52580f21c`
      );

      const data = res?.data?.data;

      if (!data) {
        throw new Error("No data returned from API");
      }

      const col_metadata: Record<string, ColumnMetadata> =
        data.column_metadata || {};

      setTableData(data);
      setcolumnHeaders(Object.values(col_metadata));
    } catch (error: any) {
      console.error("Error fetching data:", error?.message || error);
    }
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
              ["Style Name", "QA Name", "Specs For"],
              ["Merchant Name", "Vendor Name", "Size"],
              ["QA Name", "Color"],
            ]}
          />
        </div>

        {/* Page Content */}
        {columnHeaders.length > 0 && tableData && (
          <Table
            col={22}
            row={120}
            imagecol={6}
            tablename="tech spec"
            columnheaders={columnHeaders}
            spreadsheet={tableData}
            postapi={`${BASE_URL}/spreadsheet/update/580d3753-8487-4d98-909e-c3b52580f21c`}
          />
        )}
        {/* Footer */}
      </div>
    </>
  );
}
