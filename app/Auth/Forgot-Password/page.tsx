"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RiMailSendLine, RiLockPasswordLine } from "react-icons/ri";
import { useForgotPassword } from "@/lib/api/hooks";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const router = useRouter();

  const ForgotPasswordMutation = useForgotPassword();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    // const res = await fetch(API_ENDPOINTS.resetPasswordSelfRequest.url, {
    //   method: API_ENDPOINTS.resetPasswordSelfRequest.method,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email }),
    // });

    // const data = await res.json();

    // if (!res.ok) {
    //   toast.error(data.message || "Failed to generate OTP");
    //   return;
    // }

    // const token = data.data.token;

    // console.log("token: ", token);

    // Save to localStorage

    // localStorage.setItem("reset_email", email);
    // localStorage.setItem("reset_token", token);

    ForgotPasswordMutation.mutate(email, {
      onSuccess: (data) => {
        setRedirecting(true);

        const token = data.data.token;
        setTimeout(() => {
          router.push(`/Auth/Verify-OTP?token=${token}`);
        }, 500);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSendOtp}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-8 text-center">
          <span className="flex items-center justify-center gap-3">
            <RiLockPasswordLine className="w-6 h-6 text-blue-500" />
            Forgot Password
          </span>
        </h2>

        <label className="block text-sm mb-3 text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your registered email"
          className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={redirecting}
          className={`w-full mt-4 flex items-center justify-center gap-2 text-white font-medium py-2 px-4 rounded-md transition cursor-pointer ${
            redirecting
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <RiMailSendLine className="w-5 h-5" />
          {redirecting ? "Redirecting..." : "Send OTP"}
        </button>

        {/* Back to login */}

        <p className="text-sm text-left text-gray-600 mt-6">
          Changed your mind?{" "}
          <span
            className="text-blue-600 font-medium hover:underline cursor-pointer"
            onClick={() => router.push("/Auth/Login")}
          >
            Back to Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
