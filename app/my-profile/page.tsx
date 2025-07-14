"use client";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { GrPowerReset } from "react-icons/gr";
import ChangePasswordModal from "./ChangePasswordModal";
import UpdateProfileModal from "./UpdateProfileModal";
import { FaRegEdit } from "react-icons/fa";
import { cacheUtils } from "@/lib/api/utils";
import { useProfile } from "@/lib/api/hooks";
import { User } from "@/lib/api/types";

const MyProfilePage = () => {
  // State to manage modals

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { getUser, setUser } = cacheUtils.auth;

  const { data: user, isLoading, isError, error: apiError } = useProfile();

  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
    department: string;
    is_vendor?: boolean;
  } | null>(null);

  useEffect(() => {
    // ✅ First priority: Fresh API data
    if (!isLoading && user?.data) {
      const userData = user.data as User;
      console.log("Setting user data from API:", userData);

      const newUserDetails = {
        name: userData.name || "N/A",
        email: userData.email || "N/A",
        department: userData.department || "N/A",
        is_vendor: userData.is_vendor || false,
      };

      setUserDetails(newUserDetails);

      // ✅ Update cache with fresh data
      setUser(userData);
      return;
    }

    // ✅ Second priority: Cached data (only while loading or if API fails)
    const storedUser = getUser();
    if (storedUser && !userDetails) {
      setUserDetails({
        name: storedUser.name || "N/A",
        email: storedUser.email || "N/A",
        department: storedUser.department || "N/A",
        is_vendor: storedUser.is_vendor || false,
      });
    }
  }, [user, isLoading, userDetails]);

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
    setUserDetails((prev) => {
      const updatedUser = { ...prev!, name: updatedName };
      return updatedUser;
    });
    const currentUser = getUser();
    if (currentUser && userDetails) {
      setUser({
        user_id: currentUser.user_id,
        name: userDetails.name || "N/A",
        email: userDetails.email || "N/A",
        department: userDetails.department || "N/A",
        is_vendor: userDetails.is_vendor || false,
      });
    }
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

        {userDetails ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div>
                <p className="text-sm text-gray-500 mb-1">Employee Name</p>
                <p className="text-lg font-medium text-gray-800">
                  {userDetails.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-lg font-medium text-gray-800">
                  {userDetails.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Department</p>
                <p className="text-lg font-medium text-gray-800">
                  {userDetails.department}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center justify-between text-gray-500 mb-10">
            No User Info...
          </div>
        )}

        {/* Profile Info - Vendor */}

        {userDetails && userDetails.is_vendor && (
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

      {showUpdateModal && userDetails && (
        <UpdateProfileModal
          name={userDetails.name}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </main>
  );
};

export default MyProfilePage;
