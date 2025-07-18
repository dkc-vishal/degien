"use client";

import { useState } from "react";
import { toast } from "sonner";

// Tab-specific columns

const tabConfig = {
    "Fit PP Top": ["Fit 1", "Fit 2", "Fit 3", "PP 1", "PP 2", "PP 3", "Top 1", "Top 2", "Top 3"],
    Web: [
        "Web 1", "Web 2", "Web 3", "Web 4", "Web 5", "Web 6",
        "Web 7", "Web 8", "Web 9", "Web 10", "Web 11", "Web 12",
    ],
};

// Row structure

const rowLabels = ["Color", "Date", "Result"];

// Sample row-wise initial data (3 rows)

const generateDemoData = (count: number) => ({
    Color: Array(count).fill(null).map((_, i) => ["Red", "Blue", "Green"][i % 3]),
    Date: Array(count).fill(null).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString("en-IN"); // dd/mm/yyyy
    }),
    Result: Array(count).fill(null).map((_, i) => (i % 2 === 0 ? "Pass" : "Fail")),
});

export default function FitPPTopWebTable() {
    const [selectedTab, setSelectedTab] = useState<keyof typeof tabConfig>("Fit PP Top");

    const getInitialFormData = (colCount: number) => {
        const demo = generateDemoData(colCount);
        return {
            Color: [...demo.Color],
            Date: [...demo.Date],
            Result: [...demo.Result],
        };
    };

    const [formData, setFormData] = useState(getInitialFormData(9)); // default to Fit PP Top's 9 columns

    const handleInputChange = (row: string, colIndex: number, value: string) => {
        setFormData((prev) => {
            const updated = { ...prev };
            if (row === "Color") {
                updated.Color = [...prev.Color];
                updated.Color[colIndex] = value;
            } else if (row === "Date") {
                updated.Date = [...prev.Date];
                updated.Date[colIndex] = value;
            } else if (row === "Result") {
                updated.Result = [...prev.Result];
                updated.Result[colIndex] = value as "Pass" | "Fail";
            }
            return updated;
        });
    };

    const handleTabChange = (tab: keyof typeof tabConfig) => {
        setSelectedTab(tab);
        setFormData(getInitialFormData(tabConfig[tab].length));

        // Show toast notification using Sonner
        toast.success(`Switched to ${tab}`, {
            duration: 2000,
            position: "top-right",
            style: {
                background: '#10b981', // Green background
                color: 'white',
                border: '1px solid #059669',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
            },
            className: "custom-success-toast"
        });
    };

    return (
        <div className=" bg-gray-100 p-8">

            <div className="max-w-7xl mx-auto">
                {/* Tabs - positioned right above the table */}
                <div className="flex gap-1 mb-0">
                    {Object.keys(tabConfig).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab as keyof typeof tabConfig)}
                            className={`px-6 py-3 font-medium transition-all duration-200 ${selectedTab === tab
                                    ? 'bg-blue-400 text-white border-l border-r border-t border-blue-500 rounded-t-lg shadow-md'
                                    : 'bg-gray-50 text-gray-600 hover:bg-blue-200 hover:text-gray-800 border-l border-r border-t border-gray-300 rounded-t-lg cursor-pointer'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Table Container with background */}

                <div className="bg-white rounded-b-lg rounded-tr-lg shadow-lg border border-gray-300">
                    <div className="overflow-auto">
                        <table className="table-auto border-collapse text-sm w-full">
                            <thead>
                                <tr>
                                    <th className="border-b border-r border-gray-300 px-6 py-3 bg-gray-50 text-center font-semibold text-gray-700 min-w-[140px]">
                                        
                                    </th>
                                    {tabConfig[selectedTab].map((col, idx) => (
                                        <th
                                            key={idx}
                                            className="border-b border-r border-gray-300 px-4 py-3 bg-gray-50 text-center font-semibold text-gray-700 min-w-[120px] last:border-r-0"
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rowLabels.map((rowLabel) => (
                                    <tr key={rowLabel} className="hover:bg-gray-50">
                                        <td className="border-b border-r border-gray-300 px-6 py-3 font-semibold bg-gray-50 text-center text-gray-800">
                                            {rowLabel}
                                        </td>
                                        {tabConfig[selectedTab].map((_, colIdx) => (
                                            <td key={colIdx} className="border-b border-r border-gray-300 px-3 py-2 text-center last:border-r-0">
                                                {rowLabel === "Result" ? (
                                                    <div className="flex justify-center">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${formData[rowLabel as keyof typeof formData][colIdx] === "Pass"
                                                                    ? "bg-green-100 text-green-700 border border-green-300"
                                                                    : "bg-red-100 text-red-700 border border-red-300"
                                                                }`}
                                                        >
                                                            {formData[rowLabel as keyof typeof formData][colIdx]}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        className="w-full text-center bg-transparent focus:outline-none focus:bg-blue-50 py-1 px-2 rounded"
                                                        value={formData[rowLabel as keyof typeof formData][colIdx] || ""}
                                                        onChange={(e) =>
                                                            handleInputChange(rowLabel, colIdx, e.target.value)
                                                        }
                                                    />
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
