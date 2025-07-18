"use client";

import React, { useState, useRef } from "react";
import FitPPTopWebTable from "./FitPPTopWebTable";
import GradingTable from "./GradingTable";

export default function TechGradedSpecsDashboard() {

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Tech Graded Specs - Dashboard</h1>
                </header>

                {/* Fit-PP-Top-Web TABLE */}

                <div className="mb-8">
                    <FitPPTopWebTable />
                </div>

                {/* Grading Table */}

                <div className="mb-8">
                    <GradingTable/>
                </div>
            </div>
        </div>
    );
}