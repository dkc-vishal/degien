"use client";

import React, { useState, useRef } from "react";
import FitPopupModal from "./TechGradedSpecModal";

export default function TechGradedSpecsDashboard() {
    const [results, setResults] = useState(Array(7).fill("pass"));

    const [popupData, setPopupData] = useState<{ top: number; left: number } | null>(null);

    const valueCellRefs = useRef<(HTMLInputElement | null)[]>([]);

    // creating mock data for popup table 

    const popupTableData = {
        columns: ["Fit 1", "Fit 2", "PP1", "PP2", "PP3", "Top 1"],
        rows: [
            ["Red", "Blue", "Green", "Yellow", "Black", "White"],
            ["Maroon", "Teal", "Olive", "Gray", "Navy", "Pink"]
        ],
    };

    // calculating the position of the popup modal 

    function calculatePopupPosition(e: React.MouseEvent<HTMLInputElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const modalWidth = 320;
        const modalHeight = 140;
        const offset = 8;

        const topPos = rect.top + window.scrollY + rect.height / 2 - modalHeight / 2;
        const leftPos =
            rect.left - modalWidth - offset < 0
                ? rect.right + offset
                : rect.left - modalWidth - offset;

        return {
            top: topPos,
            left: leftPos + window.scrollX,
        };
    }

    const handleResultChange = (index: number, value: string) => {
        const newResults = [...results];
        newResults[index] = value;
        setResults(newResults);
    };

    const resultOptions = [
        { value: "pass", label: "Pass", color: "bg-green-500", textColor: "text-white" },
        { value: "fail", label: "Fail", color: "bg-red-500", textColor: "text-white" },
    ];

    const fitTableColumns = [
        "Fit 1", "PP1", "PP2", "Top 1", "Top 2", "Web 1", "Web 2"
    ];

    const [fitTableData, setFitTableData] = useState([
        { label: "Color", values: ["Red", "Blue", "Green", "Red", "Blue", "Green", "Red"] },
        { label: "Date", values: ["2025-07-16", "2025-07-17", "2025-07-18", "2025-07-19", "2025-07-20", "2025-07-21", "2025-07-22"] },
        { label: "Time", values: ["10:30 AM", "11:00 AM", "09:45 AM", "02:15 PM", "03:00 PM", "10:00 AM", "04:30 PM"] },
        { label: "Person", values: ["John Doe", "Jane Smith", "Peter Jones", "John Doe", "Jane Smith", "Peter Jones", "John Doe"] },
        { label: "Result" },
    ]);

    const handleFitDataChange = (rowIndex: number, colIndex: number, value: string) => {
        const updatedData = [...fitTableData];
        if (updatedData[rowIndex].values) {
            updatedData[rowIndex].values[colIndex] = value;
            setFitTableData(updatedData);
        }
    };

    const gradingTableColumns = [
        "S.No.", "Header", "Measurement Type", "Location", "Grading Rule", "XS", "S", "Value"
    ];

    const [gradingTableRows, setGradingTableRows] = useState([
        { sn: 1, header: "Chest", type: "Length", location: "Front", rule: "±1cm", xs: "34", s: "36", value: "35", source: "Web 2" },
        { sn: 2, header: "Waist", type: "Width", location: "Back", rule: "±0.5cm", xs: "28", s: "30", value: "29", source: "Web 2", color: "red" },
        { sn: 3, header: "Sleeve", type: "Length", location: "Left", rule: "±0.7cm", xs: "22", s: "23", value: "22.5", source: "Web 2" },
        { sn: 4, header: "Shoulder", type: "Width", location: "Across", rule: "±0.5cm", xs: "15", s: "16", value: "15.5", source: "Web 2", color: "red" },
        { sn: 5, header: "Length", type: "Length", location: "Center Back", rule: "±1cm", xs: "28", s: "29", value: "28.5", source: "Web 2" },
    ]);

    const handleGradingDataChange = (index: number, field: string, value: string) => {
        const updatedRows = [...gradingTableRows];
        (updatedRows[index] as any)[field] = value;
        setGradingTableRows(updatedRows);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Tech Graded Specs - Dashboard</h1>
                </header>

                {/* FIT TABLE */}

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3 px-6 rounded-l-lg"></th>
                                    {fitTableColumns.map((col) => (
                                        <th key={col} scope="col" className="py-3 px-6 text-center">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {fitTableData.map((row, rowIndex) => (
                                    <tr key={row.label} className="bg-white border-b hover:bg-gray-50">
                                        <td className="py-4 px-6 font-semibold text-gray-900">{row.label}</td>
                                        {row.label === "Result" ? (
                                            fitTableColumns.map((_, index) => (
                                                <td key={index} className="py-4 px-6 text-center">
                                                    <select
                                                        value={results[index]}
                                                        onChange={(e) => handleResultChange(index, e.target.value)}
                                                        className={`p-1.5 rounded-md border-0 text-center text-xs font-semibold focus:ring-2 focus:ring-offset-1 ${resultOptions.find(opt => opt.value === results[index])?.color} ${resultOptions.find(opt => opt.value === results[index])?.textColor}`}
                                                    >
                                                        {resultOptions.map(opt => (
                                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                            ))
                                        ) : (
                                            row.values?.map((val, colIndex) => (
                                                <td key={colIndex} className="py-2 px-4 text-center">
                                                    <input
                                                        type="text"
                                                        value={val}
                                                        onChange={(e) => handleFitDataChange(rowIndex, colIndex, e.target.value)}
                                                        className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md p-1"
                                                    />
                                                </td>
                                            ))
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {popupData && (
                    <FitPopupModal
                        position={popupData}
                        onClose={() => setPopupData(null)}
                    />
                )}

                {/* GRADING TABLE */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    {gradingTableColumns.map((col) => (
                                        <th key={col} scope="col" className="py-3 px-6 text-center">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {gradingTableRows.map((row, rowIndex) => (
                                    <tr key={row.sn} className="bg-white border-b hover:bg-gray-50">
                                        <td className="py-2 px-4 text-center font-medium text-gray-900">
                                            <input type="text" value={row.sn} onChange={(e) => handleGradingDataChange(rowIndex, 'sn', e.target.value)} className="w-12 bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md p-1" />
                                        </td>
                                        <td className="py-2 px-4 text-center">
                                            <input type="text" value={row.header} onChange={(e) => handleGradingDataChange(rowIndex, 'header', e.target.value)} className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md p-1" />
                                        </td>
                                        <td className="py-2 px-4 text-center">
                                            <input type="text" value={row.type} onChange={(e) => handleGradingDataChange(rowIndex, 'type', e.target.value)} className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md p-1" />
                                        </td>
                                        <td className="py-2 px-4 text-center">
                                            <input type="text" value={row.location} onChange={(e) => handleGradingDataChange(rowIndex, 'location', e.target.value)} className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md p-1" />
                                        </td>
                                        <td className="py-2 px-4 text-center">
                                            <input type="text" value={row.rule} onChange={(e) => handleGradingDataChange(rowIndex, 'rule', e.target.value)} className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md p-1" />
                                        </td>
                                        <td className="py-2 px-4 text-center">
                                            <input type="text" value={row.xs} onChange={(e) => handleGradingDataChange(rowIndex, 'xs', e.target.value)} className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md p-1" />
                                        </td>
                                        <td className="py-2 px-4 text-center">
                                            <input type="text" value={row.s} onChange={(e) => handleGradingDataChange(rowIndex, 's', e.target.value)} className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md p-1" />
                                        </td>
                                        <td className="py-2 px-4 text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={row.value}
                                                    readOnly
                                                    onClick={(e) => {
                                                        const pos = calculatePopupPosition(e);
                                                        setPopupData(pos);
                                                    }}
                                                    className={`w-[60px] text-center rounded-md p-1 text-sm cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-blue-300 ${row.color === "red"
                                                        ? "bg-red-500 text-white font-semibold"
                                                        : "bg-white text-black border border-gray-300"
                                                        }`}
                                                />

                                                <span className="text-[13px] text-gray-500 whitespace-nowrap">{row.source}</span>
                                            </div>
                                        </td>

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
