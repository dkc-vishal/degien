"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaUserFriends, FaTshirt } from "react-icons/fa";
import { MdDashboard, MdLocalShipping } from "react-icons/md";
import { GiSewingMachine } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { toast } from "sonner";
import { cacheUtils } from "@/lib/api/utils";
import { useRole } from "@/hooks/useRole";
import { roleUtils } from "@/lib/utils/role-utils";
import { UserRole } from "@/lib/types/roles";
import { useLogOut } from "@/lib/api/hooks";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  requiredRoles?: UserRole[];
  unread?: number;
}

export default function Sidebar({ isSidebarOpen }: any) {
  const isOpen: boolean = isSidebarOpen;
  const router = useRouter();
  const pathname = usePathname();
  const { userRole, isLoading, isAuthenticated } = useRole();

  const [unreadCount, setUnreadCount] = useState(0);
  const [navigationLoading, setNavigationLoading] = useState<string | null>(
    null
  );
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    setUnreadCount(2);
  }, []);

  const menuItems: MenuItem[] = [
    { icon: <MdDashboard size={22} />, label: "Dashboard", path: "/dashboard" },
    {
      icon: <FaUserFriends size={22} />,
      label: "User Management",
      path: "/user-detail",
      requiredRoles: ["admin", "sop_manager"], // Only admin and sop_manager can see this
    },
    {
      icon: <GiSewingMachine size={22} />,
      label: "Sampling Styles",
      path: "/sampling-styles",
      // No requiredRoles = visible to all authenticated users
    },
    {
      icon: <FaTshirt size={22} />,
      label: "Production Styles",
      path: "/production-styles",
      // Example: Only certain roles can see production
      // requiredRoles: ["admin", "sop_manager", "tech"],
    },
    {
      icon: <MdLocalShipping size={22} />,
      label: "Shipped Styles",
      path: "/shipped-styles",
      // Example: Only shipping related roles
      // requiredRoles: ["admin", "sop_manager", "merchant"],
    },
  ];

  // Filter menu items based on user permissions using utility function
  const filteredMenuItems = roleUtils.filterMenuItemsByRole(
    menuItems,
    userRole,
    isAuthenticated
  );

  const LogoutMutation = useLogOut();

  console.log(
    `Sidebar - Total menu items: ${menuItems.length}, Filtered: ${filteredMenuItems.length}, User Role: ${userRole}`
  );

  const profileItems = [
    { icon: <CgProfile size={22} />, label: "My Profile", path: "/my-profile" },
  ];

  const handleNavigation = async (path: string, label: string) => {
    if (navigationLoading || logoutLoading) return; // Prevent navigation during loading

    setNavigationLoading(path);

    try {
      await router.push(path);
    } catch (error) {
      console.error(`Navigation to ${label} failed:`, error);
      toast.error(`Failed to navigate to ${label}`);
    } finally {
      // Clear loading state after a short delay to show the loading effect
      setTimeout(() => {
        setNavigationLoading(null);
      }, 300);
    }
  };

  const handleLogout = async () => {
    if (logoutLoading || navigationLoading) return; // Prevent multiple logout attempts

    setLogoutLoading(true);
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      toast.error("No refresh token found.");
      setLogoutLoading(false);
      return;
    }

    LogoutMutation.mutate(
      { refresh: refreshToken },
      {
        onSuccess: () => {
          router.push("/Auth/Login");
        },
        onSettled: () => {
          setLogoutLoading(false);
        },
      }
    );
  };

  return (
    <aside
      className={`transition-all duration-300 fixed h-screen bg-gray-900 text-gray-100 flex flex-col ${
        isOpen ? "w-[15%]" : "w-0 opacity-0 -z-10"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-5.5 border-b border-gray-800">
        <h2 className="text-xl font-bold tracking-wide">Admin</h2>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col px-2 pt-4 space-y-2 flex-grow">
        {isLoading ? (
          // Show loading skeleton while checking permissions
          <div className="space-y-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse bg-gray-800 h-12 rounded-lg flex items-center px-4"
              >
                <div className="w-6 h-6 bg-gray-700 rounded"></div>
                {isOpen && (
                  <div className="ml-4 w-24 h-4 bg-gray-700 rounded"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          filteredMenuItems.map((item: MenuItem, idx) => {
            const isActive = pathname.startsWith(item.path);
            const isNavigating = navigationLoading === item.path;

            return (
              <button
                key={idx}
                onClick={() => handleNavigation(item.path, item.label)}
                disabled={navigationLoading !== null || logoutLoading}
                className={`flex items-center px-4 py-3 rounded-lg text-left transition-all cursor-pointer w-full relative
                ${
                  isActive
                    ? "bg-gray-700 text-white font-semibold"
                    : "hover:bg-gray-800 text-gray-300"
                }
                ${
                  navigationLoading !== null || logoutLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
                `}
              >
                {isNavigating && (
                  <div className="absolute inset-0 bg-gray-800 bg-opacity-50 rounded-lg flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  </div>
                )}

                <div className="flex items-center">
                  <span className="text-[22px]">{item.icon}</span>
                  {isOpen && (
                    <span className="ml-4 text-[15px] font-medium">
                      {item.label}
                    </span>
                  )}
                </div>

                {/* Notification badge */}
                {isOpen &&
                  item.label === "Notifications" &&
                  item.unread &&
                  item.unread > 0 && (
                    <span className="text-xs bg-red-500 text-white px-2 py-[1px] rounded-full font-bold">
                      {item.unread}
                    </span>
                  )}
              </button>
            );
          })
        )}
      </nav>

      {/* Profile + Logout */}
      <div className="px-2 pb-4 space-y-2">
        {profileItems.map((item, idx) => {
          const isActive = pathname.startsWith(item.path);
          const isNavigating = navigationLoading === item.path;

          return (
            <button
              key={idx}
              onClick={() => handleNavigation(item.path, item.label)}
              disabled={navigationLoading !== null || logoutLoading}
              className={`flex items-center px-4 py-3 rounded-lg text-left transition-all cursor-pointer w-full relative
              ${
                isActive
                  ? "bg-gray-700 text-white font-semibold"
                  : "hover:bg-gray-800 text-gray-300"
              }
              ${
                navigationLoading !== null || logoutLoading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
              `}
            >
              {isNavigating && (
                <div className="absolute inset-0 bg-gray-800 bg-opacity-50 rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </div>
              )}

              <span className="text-[22px]">{item.icon}</span>
              {isOpen && (
                <span className="ml-4 text-[15px] font-medium">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={navigationLoading !== null || logoutLoading}
          className={`flex items-center px-4 py-3 rounded-lg text-left transition-all cursor-pointer w-full hover:bg-gray-800 text-gray-300 mb-14 relative
          ${
            navigationLoading !== null || logoutLoading
              ? "opacity-50 cursor-not-allowed"
              : ""
          }
          `}
        >
          {/* Loading overlay for logout */}
          {logoutLoading && (
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            </div>
          )}

          <TbLogout size={22} />
          {isOpen && (
            <span className="ml-4 text-[15px] font-medium">
              {logoutLoading ? "Logging out..." : "Logout"}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
