"use client";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { GrPowerReset } from "react-icons/gr";
import ChangePasswordModal from "./ChangePasswordModal";
import UpdateProfileModal from "./UpdateProfileModal";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "sonner";

const MyProfilePage = () => {

    // State to manage modals

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [user, setUser] = useState<{
        username: string;
        email: string;
        department: string;
        is_vendor?: boolean;
    } | null>(null);

    // Load user on mount 

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");

        if (storedUser) {
            const parsed = JSON.parse(storedUser);

            setUser({
                username: parsed.name || parsed.username || "N/A",
                email: parsed.email || "N/A",
                department: parsed.department || "N/A",
                is_vendor: parsed.is_vendor || false
            });
        }
    }, []);


    // Handle password change

    const handlePasswordChange = (data: {
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    }) => {
        console.log("Password change request:", data);
        setShowPasswordModal(false);
        alert("Password changed successfully!");
    };

    // Handle profile update (name only)

    const handleProfileUpdate = (updatedName: string) => {
        setUser((prev) => {
            const updatedUser = { ...prev!, username: updatedName };

            // updating localStorage when user updates profile

            localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
            return updatedUser;
        });
        setShowUpdateModal(false);
    };


    return (
        <main className="flex items-start justify-center min-h-screen bg-gray-50 py-20 px-4 sm:px-6">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 sm:p-10">
                {/* Title */}
                <div className="flex items-center gap-3 mb-6">
                    <CgProfile className="text-3xl text-blue-500" />
                    <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
                </div>

                {/* Profile Info - DKC Staff */}

                {user ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Employee Name</p>
                                <p className="text-lg font-medium text-gray-800">{user.username}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Email</p>
                                <p className="text-lg font-medium text-gray-800">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Department</p>
                                <p className="text-lg font-medium text-gray-800">{user.department}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center justify-between text-gray-500 mb-10">No User Info...</div>
                )}

                {/* Profile Info - Vendor */}

                {user && user.is_vendor && (
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Vendor Status</p>
                        <p className="text-lg font-medium text-gray-800">Yes</p>
                    </div>
                )}


                {/* Buttons */}

                <div className="flex flex-col sm:flex-row gap-4 ">

                    <button
                        onClick={() => setShowUpdateModal(true)}
                        className="bg-blue-500 border border-blue-500 text-white font-semibold px-6 py-2 rounded-md shadow-sm transition-colors duration-200 cursor-pointer hover:bg-white hover:text-blue-500"
                    >
                        <span className="flex items-center gap-2">
                            <FaRegEdit />
                            Update Info
                        </span>
                    </button>

                    <button
                        onClick={() => setShowPasswordModal(true)}
                        className="bg-blue-500 border border-blue-400 text-white font-semibold px-6 py-2 rounded-md shadow-sm transition-colors duration-200 cursor-pointer hover:bg-white hover:text-blue-500"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <GrPowerReset className="text-base" />
                            Change Password
                        </span>
                    </button>
                </div>
            </div>

            {/* Modals */}

            {showPasswordModal && (
                <ChangePasswordModal
                    onClose={() => setShowPasswordModal(false)}
                    onSubmit={handlePasswordChange}
                />
            )}

            {showUpdateModal && user && (
                <UpdateProfileModal
                    username={user.username}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={handleProfileUpdate}
                />
            )}
        </main>
    );
};

export default MyProfilePage;
