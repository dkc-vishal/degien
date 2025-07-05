// components/core/PageHeader.tsx
"use client";
import React from "react";

interface PageHeaderProps {
  breadcrumb: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ breadcrumb }) => {
  return (
    <div className="mb-6 pb-4 border-gray-200">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-tight">
        {breadcrumb}
      </h2>
    </div>
  );
};

export default PageHeader;
