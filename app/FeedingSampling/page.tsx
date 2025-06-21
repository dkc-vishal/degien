"use client";
import React, { useState } from "react";
import Input from "../../components/Input";

const FeedingSamplingPage = () => {
  const [sampleName, setSampleName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Sample: ${sampleName}, Quantity: ${quantity}`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Feeding Sampling</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Sample Name"
          value={sampleName}
          onChange={(e) => setSampleName(e.target.value)}
          required
        />
      </form>
    </div>
  );
};

export default FeedingSamplingPage;
