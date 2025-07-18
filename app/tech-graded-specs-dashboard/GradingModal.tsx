"use client";

import React from 'react';
import { RxCross1 } from 'react-icons/rx';

interface GradingModalData {
    id: number;
    fit1: string;
    fit2: string;
    fit3: string;
    pp1: string;
    pp2: string;
    pp3: string;
    top1: string;
    top2: string;
    top3: string;
    web1: string;
    web2: string;
    web3: string;
    web4: string;
}

interface GradingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

// Sample data for the modal - single row
const sampleModalData: GradingModalData = {
    id: 1,
    fit1: "25.5",
    fit2: "26.0",
    fit3: "26.5",
    pp1: "24.8",
    pp2: "25.2",
    pp3: "25.0",
    top1: "26.5",
    top2: "27.0",
    top3: "27.2",
    web1: "28.0",
    web2: "28.5",
    web3: "29.0",
    web4: "29.5"
};

const GradingModal: React.FC<GradingModalProps> = ({
    isOpen,
    onClose,
    title = "Detailed Grading Measurements"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-md"
                onClick={onClose}
            ></div>
            
            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden border border-gray-100">
                {/* Modal Header */}
                <div className="flex items-center justify-end p-3 border-b border-gray-100">
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500 transition-all duration-200 p-2 hover:bg-red-50 rounded-xl transform hover:scale-110 cursor-pointer"
                    >
                        <RxCross1 className='w-5 h-5'/>
                    </button>
                </div>
                
                {/* Modal Body */}
                <div className="p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 text-sm">Fit 1</th>
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 text-sm">Fit 2</th>
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 text-sm">Fit 3</th>
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 text-sm">PP 1</th>
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 text-sm">PP 2</th>
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 text-sm">PP 3</th>
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 text-sm">Top 1</th>
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 text-sm">Top 2</th>
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 text-sm">Top 3</th>
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 text-sm">Web 1</th>
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 text-sm">Web 2</th>
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 text-sm">Web 3</th>
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 text-sm">Web 4</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white hover:bg-blue-50/50 transition-colors">
                                    <td className="px-4 py-3 text-center font-medium text-gray-800 border-b border-gray-100">{sampleModalData.fit1}</td>
                                    <td className="px-4 py-3 text-center font-medium text-gray-800 border-b border-gray-100">{sampleModalData.fit2}</td>
                                    <td className="px-4 py-3 text-center font-medium text-gray-800 border-b border-gray-100">{sampleModalData.fit3}</td>
                                    <td className="px-4 py-3 text-center font-medium text-gray-800 border-b border-gray-100">{sampleModalData.pp1}</td>
                                    <td className="px-4 py-3 text-center font-medium text-gray-800 border-b border-gray-100">{sampleModalData.pp2}</td>
                                    <td className="px-4 py-3 text-center font-medium text-gray-800 border-b border-gray-100">{sampleModalData.pp3}</td>
                                    <td className="px-4 py-3 text-center font-medium text-gray-800 border-b border-gray-100">{sampleModalData.top1}</td>
                                    <td className="px-4 py-3 text-center font-medium text-gray-800 border-b border-gray-100">{sampleModalData.top2}</td>
                                    <td className="px-4 py-3 text-center font-medium text-gray-800 border-b border-gray-100">{sampleModalData.top3}</td>
                                    <td className="px-4 py-3 text-center font-medium text-gray-800 border-b border-gray-100">{sampleModalData.web1}</td>
                                    <td className="px-4 py-3 text-center font-medium text-gray-800 border-b border-gray-100">{sampleModalData.web2}</td>
                                    <td className="px-4 py-3 text-center font-medium text-gray-800 border-b border-gray-100">{sampleModalData.web3}</td>
                                    <td className="px-4 py-3 text-center font-medium text-gray-800 border-b border-gray-100">{sampleModalData.web4}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end p-4 border-t border-gray-100 bg-gray-50/50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-blue-400 text-white rounded-xl hover:bg-blue-500 cursor-pointer transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GradingModal;
