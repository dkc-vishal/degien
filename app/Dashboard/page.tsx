"use client";
import React from "react";

const Dashboard: React.FC = ({ styleName }: { styleName?: string }) => {
  return (
    <div className="min-h-screen w-full bg-gray-100 px-10 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Running Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Running Orders</h3>
          <p className="text-3xl font-bold text-blue-500">12</p>
        </div>

        {/* Running Styles */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Running Styles</h3>
          <p className="text-3xl font-bold text-green-500">7</p>
        </div>

        {/* Pendings with inline subtitle */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Pendings{" "}
            <span className="text-sm text-gray-500 font-normal">(Filtered by shipment X-Date)</span>
          </h3>
          <p className="text-3xl font-bold text-yellow-500">4</p>
        </div>

        {/* Shipped Styles */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Shipped Styles</h3>
          <p className="text-3xl font-bold text-purple-500">15</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
