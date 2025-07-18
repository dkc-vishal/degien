"use client";

import React, { useState } from 'react';
import GradingModal from './GradingModal';

interface GradingData {
    id: number;
    header: string;
    measurementType: string;
    location: string;
    gradingRule: string;
    tolerance: string;
    xs: string;
    s: string;
    value: string;
}

// Sample data - replace with your actual data
const sampleData: GradingData[] = [
    {
        id: 1,
        header: "Length",
        measurementType: "Total Length",
        location: "At center of tie",
        gradingRule: "1",
        tolerance: "6/8",
        xs: "18.0",
        s: "19.0",
        value: "20.0",
    },
    {
        id: 2,
        header: "Hood",
        measurementType: "Hood Length",
        location: "At Seam",
        gradingRule: "1",
        tolerance: "1/4",
        xs: "26.0",
        s: "26.5",
        value: "27.0",
    },
    {
        id: 3,
        header: "Hood",
        measurementType: "Top Edge",
        location: "C.Front to C.Back",
        gradingRule: "0.25",
        tolerance: "3/8",
        xs: "24.0",
        s: "24.25",
        value: "24.5",
    },
    {
        id: 4,
        header: "Hood",
        measurementType: "Top Edge",
        location: "C.Front to C.Back",
        gradingRule: "0.25",
        tolerance: "3/8",
        xs: "24.0",
        s: "24.25",
        value: "24.5",
    },
    {
        id: 5,
        header: "Hood",
        measurementType: "Top Edge",
        location: "C.Front to C.Back",
        gradingRule: "0.25",
        tolerance: "3/8",
        xs: "24.0",
        s: "24.25",
        value: "24.5",
    },
    {
        id: 6,
        header: "Hood",
        measurementType: "Top Edge",
        location: "C.Front to C.Back",
        gradingRule: "0.25",
        tolerance: "3/8",
        xs: "24.0",
        s: "24.25",
        value: "24.5",
    },
];

interface GradingTableProps {
    data?: GradingData[];
    className?: string;
}

const GradingTable: React.FC<GradingTableProps> = ({
    data = sampleData,
    className = ""
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleValueClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={`w-full ${className}`}>
            {/* Card container for elevated appearance */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">

                {/* Table content */}
                <div className="p-6">
                    <table className="w-full border-collapse table">
                        <thead>
                            <tr>
                                <th className="w-[40px] text-center font-semibold border-b border-gray-200 pb-3">S.No</th>
                                <th className="w-[80px] text-center font-semibold border-b border-gray-200 pb-3">Header</th>
                                <th className="w-[280px] font-semibold text-center break-words border-b border-gray-200 pb-3">Measurement Type</th>
                                <th className="w-[200px] text-center font-semibold border-b border-gray-200 pb-3">Location</th>
                                <th className="w-[80px] text-center font-semibold break-words border-b border-gray-200 pb-3">Grading Rule</th>
                                <th className="w-[80px] text-center font-semibold border-b border-gray-200 pb-3">Tolerance</th>
                                <th className="w-[50px] text-center font-semibold border-b border-gray-200 pb-3">XS</th>
                                <th className="w-[50px] text-center font-semibold border-b border-gray-200 pb-3">S</th>
                                <th className="w-[50px] text-center font-semibold border-b border-gray-200 pb-3">Value</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-100">
                                        <td className="text-center font-medium py-3">{index + 1}</td>
                                        <td className="text-center py-3">{item.header}</td>
                                        <td className="text-center py-3">{item.measurementType}</td>
                                        <td className="text-center py-3">{item.location}</td>
                                        <td className="text-center py-3">{item.gradingRule}</td>
                                        <td className="text-center py-3">{item.tolerance}</td>
                                        <td className="text-center py-3">{item.xs}</td>
                                        <td className="text-center py-3">{item.s}</td>
                                        <td className="text-center py-3">
                                            <span 
                                                onClick={handleValueClick}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-300 cursor-pointer hover:bg-blue-200 hover:border-blue-400 transition-all duration-200 transform hover:scale-105"
                                            >
                                                {item.value}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center text-gray-500 py-8">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Grading Modal */}
            <GradingModal 
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Detailed Grading Measurements"
            />
        </div>
    );
};

export default GradingTable;
