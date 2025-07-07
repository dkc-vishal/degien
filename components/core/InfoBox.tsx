"use client";

import React from "react";

const InfoBox = () => {
    const items = [
        { color: "bg-gray-300", label: "Read-Only" },
        { color: "bg-blue-400", label: "Master folders" },
        { color: "bg-yellow-200", label: "Order files" },
    ];

    return (
        <div className="fixed right-20 top-28 z-50 flex flex-col gap-3 text-sm text-gray-700">
            {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default InfoBox;
