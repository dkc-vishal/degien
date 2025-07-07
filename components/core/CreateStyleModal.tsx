"use client";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoCreate } from "react-icons/io5";

interface CreateStyleModalProps {
    onClose: () => void;
    onCreate: (styleName: string) => void;
}

const CreateStyleModal: React.FC<CreateStyleModalProps> = ({ onClose, onCreate }) => {
    const [styleName, setStyleName] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)] px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-red-500 hover:text-red-600 text-xl 
                   transform transition-transform duration-200 ease-in-out hover:bg-gray-100 
                   rounded-full p-1 cursor-pointer"
                >
                    <RxCross2 />
                </button>

                <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">Create New Style</h3>

                {/* Input */}
                <input
                    type="text"
                    value={styleName}
                    onChange={(e) => setStyleName(e.target.value)}
                    placeholder="Enter Style Name"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Create Button */}
                <button
                    onClick={() => {
                        if (styleName.trim()) {
                            onCreate(styleName.trim());
                            setStyleName("");
                        }
                    }}
                    className="w-full bg-blue-400 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition cursor-pointer flex items-center justify-center gap-3"
                >
                    <IoCreate className="w-5 h-5"/>
                    <span>Create Style</span>
                </button>
            </div>
        </div>
    );
};

export default CreateStyleModal;
