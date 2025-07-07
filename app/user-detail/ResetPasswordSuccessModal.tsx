"use client";

import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import {toast} from "sonner" ; 

interface ResetPasswordSuccessModalProps {
    userInfo: {
        name: string;
        email: string;
        department?: string;
        system_generated_password: string;
        type_of_user?: string; // optional, to conditionally hide department
    };
    onClose: () => void;
}

const ResetPasswordSuccessModal: React.FC<ResetPasswordSuccessModalProps> = ({ userInfo, onClose }) => {

    const copyToClipboard = () => {
        navigator.clipboard.writeText(userInfo.system_generated_password);
        toast.success("Password copied to clipboard.")
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex items-center justify-center px-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-6 sm:p-8 relative">

                {/* Close Icon */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-600 hover:scale-110 hover:bg-gray-200 rounded-md transition cursor-pointer"
                    title="Close"
                >
                    <RxCross2 className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <MdCheckCircle className="text-green-600 w-14 h-14 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Password Reset Successful</h3>
                    <p className="text-sm text-gray-600 mb-10">
                        A system-generated password was emailed to the user and is also shown below:
                    </p>

                    <div className="w-full text-left space-y-2 mb-6">
                        <p><strong>Name:</strong> {userInfo.name}</p>
                        <p><strong>Email:</strong> {userInfo.email}</p>

                        {/* Show department only if not vendor */}
                        {userInfo.type_of_user !== "vendor" && (
                            <p><strong>Department:</strong> {userInfo.department}</p>
                        )}

                        {/* Password + Copy aligned horizontally */}

                        {/* Password + Copy aligned horizontally */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">Password:</p>
                                <span className="text-gray-800 font-mono">{userInfo.system_generated_password}</span>
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="text-blue-500 hover:text-blue-700 transition cursor-pointer bg-gray-100 p-1 px-2 rounded-md text-sm font-medium flex items-center gap-1"
                                title="Copy password"
                            >
                                <FaRegCopy />
                                Copy
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordSuccessModal;
