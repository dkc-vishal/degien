"use client";
import React, { useState } from "react";
// import Table from "@/components/core/Table";
import SheetTitle from "@/components/core/SheetTitle";
import InputForm from "@/components/core/InputForm";
import { FaPrint } from "react-icons/fa";

const page = () => {



  const handlePrint = () => {
    window.print();
  };
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
        
          <InputForm
            label={[
              ["Style Name","JC Number","Sampling Merchant"],
            ]}
          />
        </div>

        {/* Page Content */}
              {/* <Table
                col={7}
                row={20}
                imagecol={4}
                imagecol2={6}
                tablename="spamling-feeding"
                columnheaders={[
                  "MOVE",
                  "Sno",
                  "Issue Name",
                  "WatchPoint",
                  "Issue Picture",
                  "How to solve",
                  "corrected  picture"
                ]}
              /> */}
      </div>
  );
};

export default page;
