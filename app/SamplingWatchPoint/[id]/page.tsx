"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/core/Table";
import SheetTitle from "@/components/core/SheetTitle";
import InputForm from "@/components/core/InputForm";
import { FaPrint } from "react-icons/fa";
import { useParams } from "next/navigation";
import axios from "axios";
type ColumnMetadata = {
  header: string;
  is_hidden: boolean;
  is_moveable: boolean;
  width: number;
};
const page = () => {
  const [columnHeaders, setcolumnHeaders] = useState<ColumnMetadata[]>([]);
  const [tableData, setTableData] = useState({});
  const { id } = useParams();
  const handlePrint = () => {
    window.print();
  };
  async function fetchdata() {
    const res = await axios.get(
      `http://gulab.local:8000/api/v1.0/spreadsheet/${id}/`
    );
    const col_metadata: Record<string, ColumnMetadata> = await res.data.data
      .column_metadata;
    console.log(col_metadata);
    setTableData(res.data.data);
    setcolumnHeaders(Object.values(col_metadata));
  }

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className=" flex-1 flex flex-col p-6">
      {/* Form inputs */}
      <div className="">
        <SheetTitle title="Sampling Watchpoint" version="v1.4" />

        <button
          onClick={handlePrint}
          className="flex items-center gap-1  font-medium px-2 py-1 rounded-xl shadow-md transition duration-200"
        >
          <FaPrint />
        </button>

        <InputForm label={[["Style Name", "JC Number", "Sampling Merchant"]]} />
      </div>
      <div style={{ marginTop: "75px" }} className="print-container">
        {columnHeaders.length > 0 && (
          <Table
            col={8}
            row={50}
            imagecol={5}
            imagecol2={7}
            tablename="Sampling Watchpoint"
            columnheaders={columnHeaders}
            spreadsheet={tableData}
            getapi={id}
          />
        )}
      </div>
    </div>
  );
};

export default page;
