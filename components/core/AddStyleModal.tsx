"use client";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { SamplingStyleEndPoints } from "@/lib/api/endpoints/sampling";
// import { User } from "lucide-react";
import { userEndPoints } from "@/lib/api/endpoints";
import { GetAllUsersResponse,User } from "@/lib/api/types/auth";
interface AddStyleModalProps {
  onClose: () => void;
  onAddStyle: (newStyle: { styleName: string; image: string }) => void;
}


const AddStyleModal: React.FC<AddStyleModalProps> = ({
  onClose,
  onAddStyle,
}) => {
  const [Samplingusers, setSamplingusers] = useState<User[]>([]);

  const [formData, setFormData] = useState({
    styleName: "",
    jcNumber: "",
    styleNumber: "",
    merchantName: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    styleName: "",
    jcNumber: "",
    styleNumber: "",
    merchantName: "",
  });

  const [error, setError] = useState("");

  const validate = () => {
    const errors = {
      styleName: "",
      jcNumber: "",
      styleNumber: "",
      merchantName: "",
    };

    if (!formData.styleName.trim()) {
      errors.styleName = "Style Name is required.";
    }

    if (!formData.jcNumber.trim()) {
      errors.jcNumber = "JC Number is required.";
    }

    if (!formData.styleNumber.trim()) {
      errors.styleNumber = "Style Number is required.";
    }

    if (!formData.merchantName.trim()) {
      errors.merchantName = "Sampling Merchant is required.";
    }

    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear individual field error if any
    if (fieldErrors.hasOwnProperty(name)) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setError(""); // Clear global error
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();

    const hasErrors = Object.values(errors).some((val) => val !== "");

    if (hasErrors) {
      setFieldErrors(errors);
      setError("Please fill in all required fields.");
      return;
    }
    const res = await SamplingStyleEndPoints.createSamplingStyle({
      name: formData.styleName,
      jc_number: +formData.jcNumber,
      style_number: +formData.styleNumber,
      merchant_name: formData.merchantName,
    });
    onClose();
    setFormData({
      styleName: "",
      jcNumber: "",
      styleNumber: "",
      merchantName: "",
    });
    setFieldErrors({
      styleName: "",
      jcNumber: "",
      styleNumber: "",
      merchantName: "",
    });
    setError("");

    // Proceed with form submission
    console.log("Submitting form", formData);
  };

  const GetUser = async () => {
    try {
      const res: GetAllUsersResponse = await userEndPoints.getUsers();
      if (res.status !== 200) {
        throw new Error("Failed to fetch users");
      }
      if(res.status === 200) {
        setSamplingusers(res.data.filter((user: User) => user.department === "sampling"));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    GetUser();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-xl overflow-y-auto max-h-[90vh] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-4 text-gray-600 hover:text-red-500 transition-all duration-200 ease-in-out cursor-pointer"
        >
          <RxCross2 className="w-6 h-6 hover:scale-125 transform transition-transform duration-200 ease-in-out" />
        </button>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-black">
            Add New Style
          </h2>

          {error && (
            <div className="text-red-600 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div className="rounded-lg p-4 space-y-5">
            <div className="grid grid-cols-1 gap-6">
              {/* Style Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="styleName"
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  Style Name
                </label>
                <input
                  type="text"
                  id="styleName"
                  name="styleName"
                  value={formData.styleName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* JC Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="jcNumber"
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  JC Number
                </label>
                <input
                  type="text"
                  id="jcNumber"
                  name="jcNumber"
                  value={formData.jcNumber}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Style Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="styleNumber"
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  Style Number
                </label>
                <input
                  type="text"
                  id="styleNumber"
                  name="styleNumber"
                  value={formData.styleNumber}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Sampling Merchant Name Dropdown */}
              <div className="flex flex-col">
                <label
                  htmlFor="merchantName"
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  Sampling Merchant Name
                </label>
                <select
                  id="merchantName"
                  name="merchantName"
                  value={formData.merchantName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a Merchant</option>
                  {Samplingusers.map((user: User) => (
                    <option key={user.user_id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-md cursor-pointer"
          >
            Add Style
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStyleModal;
