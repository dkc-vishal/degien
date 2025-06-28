"use client";
import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";

interface FolderCard {
  id: number;
  title: string;
  files: string[];
  highlight?: boolean;
}

const Dashboard: React.FC = ({styleName} : {styleName?: string}) => {

  return (
    <div className="flex bg-gray-100 flex-col ml-10 mt-10 gap-10">
      <p>No of Running Orders -> card: number</p>
      <p>No of Running Styles</p>
      <p>Pendings: according to shipment x-date</p>
      <p>Shipped style</p>
    </div>
  );
};

export default Dashboard;
