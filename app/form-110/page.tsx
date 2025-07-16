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

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function QaIntialReport() {
  const [columnHeaders, setcolumnHeaders] = useState<ColumnMetadata[]>([]);
  const [tableData, setTableData] = useState({});

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
          <SheetTitle title="QA Initial Reports" version="v1.4" />
          <InputForm label={[["Style Name"]]} />
        </div>

        <div style={{ marginTop: "75px" }} className="print-container">
          {columnHeaders.length > 0 && (
            <Table
              col={9}
              row={120}
              imagecol={7}
              tablename="form 110"
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
