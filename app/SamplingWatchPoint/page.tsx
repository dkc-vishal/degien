"use client";
import React, { useState } from "react";
import Table from "@/components/core/Table";
import SheetTitle from "@/components/core/SheetTitle";
import InputForm from "@/components/core/InputForm";

const page = () => {
  const [sampleName, setSampleName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Sample: ${sampleName}, Quantity: ${quantity}`);
  };

  return (
      <div className=" flex-1 flex flex-col p-6">
        {/* Form inputs */}
        <div className="">
          <SheetTitle title="Sampling Watchpoint" version="v1.4" />

          <InputForm
            label={[
              ["Style Name","JC Number","Sampling Merchant"],
            ]}
          />
        </div>

        {/* Page Content */}
        <Table col={10} row={10} imagecol={5} colwidth={[25,25,25,25,45,25,25,25,25]}/>
      </div>
  );
};

export default page;
