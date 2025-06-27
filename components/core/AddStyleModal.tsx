"use client";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface AddStyleModalProps {
  onClose: () => void;
}

const AddStyleModal: React.FC<AddStyleModalProps> = ({ onClose }) => {
  const [form, setForm] = useState({
    styleName: "",
    styleNumber: "",
    poNumber: "",
    buyerNumber: "",
    samplingMerchant: "",
    productionMerchant: "",
    techName: "",
    vendorName: "",
    qaName: "",
    jcNumber: "",
    xDate: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    styleName: "",
    samplingMerchant: "",
    jcNumber: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    const errors = {
      styleName: "",
      samplingMerchant: "",
      jcNumber: "",
    };
    if (!form.styleName) errors.styleName = "Style Name is required.";
    if (!form.samplingMerchant) errors.samplingMerchant = "Sampling Merchant is required.";
    if (!form.jcNumber) errors.jcNumber = "JC Number is required.";
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (fieldErrors.hasOwnProperty(e.target.name)) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    }
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);

    if (Object.values(errors).some(Boolean)) {
      setError("Please fix the errors below.");
      setSuccess("");
      return;
    }

    setSuccess("Style added successfully!");
    setError("");
  };

  const renderField = (label: string, name: keyof typeof form, type: string = "text") => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
        {label} <span className="text-red-500">{fieldErrors[name] && "*"}</span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className={`w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 ${
          fieldErrors[name]
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-blue-400"
        }`}
      />
      {fieldErrors[name] && <span className="text-xs text-red-500 mt-1">{fieldErrors[name]}</span>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-xl overflow-y-auto max-h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute right-7 top-4 text-gray-600 hover:text-red-500 transition-all duration-200 ease-in-out cursor-pointer"
        >
          <RxCross2 className="w-6 h-6 hover:scale-125 transform transition-transform duration-200 ease-in-out" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-black">Add New Style</h2>

          {error && <div className="text-red-600 text-sm text-center font-medium">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center font-medium">{success}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("Style Name", "styleName")}
            {renderField("Sampling Merchant", "samplingMerchant")}
            {renderField("JC Number", "jcNumber")}
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-md cursor-pointer"
          >
            Add Style
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStyleModal;
