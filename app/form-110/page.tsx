"use client";

import SheetTitle from "@/components/core/SheetTitle";
import Table from "../../components/core/DynamicTable";
import { useState, useEffect } from "react";
import axios from "axios";
import InputForm from "@/components/core/InputForm";

type ColumnMetadata = {
  header: string;
  is_hidden: boolean;
  is_moveable: boolean;
  width: number;
};
type AllowedDataType = "str" | "number" | "bool" | string;

type CellData = {
  cell_id: string;
  row: number;
  column: number;
  value: AllowedDataType | string[];
  data_type: AllowedDataType | string[];
  is_editable: boolean;
  is_header: boolean;
  has_shape: boolean;
};
type SpreadsheetPayload = {
  spreadsheet_id: string;
  revision: number;
  frozen_columns: number[];
  grid_dimensions: {
    total_rows: number;
    total_columns: number;
    min_row_height: number;
  };
  column_metadata: Record<string, ColumnMetadata>;
  cells: Record<string, CellData>;
  spreadsheet_metadata: {
    name: string;
    last_edited_by: string;
    last_edit_time: string; // ISO date string
  };
};
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function QaIntialReport() {
  const [columnHeaders, setcolumnHeaders] = useState<ColumnMetadata[]>([]);
  const [tableData, setTableData] = useState<SpreadsheetPayload>();

  async function fetchdata() {
    const res = await axios.get(
      `${BASE_URL}/spreadsheet/8bdd5d83-9702-40bd-addb-be39a0340366/`
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
    <>
      <style jsx global>{`
        @media print {
          body {
            zoom: 75%; Scale down to fit page 
          }
        }
      `}</style>
      <div className="p-6">
        <div>
          <SheetTitle
            title={tableData?.spreadsheet_metadata?.name || "Form 110"}
            version="v1.4"
          />
          <InputForm
            label={[
              [
                "Style Name",
                "Sampling Merchant Name",
                "Production Merchant Name",
              ],
              ["Style Number", "Vendor Name", "QA Name"],
              ["Tech Name", "JC Number", "Vendor PO", "Buyer PO"],
            ]}
          />
        </div>

        <div style={{ marginTop: "75px" }} className="print-container">
          {columnHeaders.length > 0 && (
            <Table
              col={9}
              row={120}
              tablename={tableData?.spreadsheet_metadata?.name}
              columnheaders={columnHeaders}
              spreadsheet={tableData}
              getapi={"8bdd5d83-9702-40bd-addb-be39a0340366"}
            />
          )}
        </div>
      </div>
    </>
  );
}
