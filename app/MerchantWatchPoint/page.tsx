"use client";
import React, { useState } from "react";
import Input from "../../components/Input";
import Table from "@/components/core/Table";
import DynamicTable from "@/components/core/DynamicTable";

const page = () => {
  const [sampleName, setSampleName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Sample: ${sampleName}, Quantity: ${quantity}`);
  };

  return (
    <div className="mt-4 mx-4 bg-white p-4 ">
      <div className="flex flex-row mb-6 justify-between align-center height-16 px-6">
        <h1 className="text-3xl font-bold mb-6 ml-[42%]">
          Merchant Watch Point
        </h1>

        <div>
          <p>Version - 23</p>
          <p>Last Updated - 2024-01-01</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mb-6 px-6 flex flex-row gap-4 w-[50%]"
      >
        <Input
          label="Sample Name"
          value={sampleName}
          onChange={(e) => setSampleName(e.target.value)}
          type="text"
          required
        />
      </form>
      <DynamicTable columnLenght={10} rowLenght={10} />
    </div>
  );
};

export default page;
