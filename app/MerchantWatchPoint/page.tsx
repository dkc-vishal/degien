"use client";
import React, { useState } from "react";
import Table from "@/components/core/Table";
import InputForm from "@/components/core/InputForm";
import SheetTitle from "@/components/core/SheetTitle";

const page = () => {
  return (
      <div className=" flex-1 flex flex-col p-6">
        {/* Form inputs */}
        <div className="">
          <SheetTitle title="Merchant Watchpoint" version="v1.4" />

          <InputForm
            label={[
              ["Style Name"],
            ]}
          />
        </div>

        {/* Page Content */}
        <Table col={10} row={10} imagecol={5} colwidth={[25,25,25,25,45,25,25,25,25]}/>
      </div>
  );
};

export default page;
