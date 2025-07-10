"use client";
import React from "react";
import InputForm from "@/components/core/InputForm";
import SheetTitle from "@/components/core/SheetTitle";
// import Table from "@/components/core/Table";

const FeedingSamplingPage = () => {
  return (
    <div className=" flex-1 flex flex-col p-6">
      {/* Form inputs */}
      <div className="">
        <SheetTitle title="Feeding Sampling Sheet" version="v1.4" />

        <InputForm
          label={[["Sample Name", "JC Number", "Sampling Merchant Name"]]}
        />
      </div>

      {/* Page Content */}
      {/* <Table
       col={7} row={8} imagecol={-1} colwidth={[25,25,150,150,150,150,150]}
      /> */}
    </div>
  );
};

export default FeedingSamplingPage;
