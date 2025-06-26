"use client";
import React, { useState } from 'react';

const AddStylePage: React.FC = () => {
  const [form, setForm] = useState({
    styleName: '',
    styleNumber: '',
    poNumber: '',
    buyerNumber: '',
    samplingMerchant: '',
    productionMerchant: '',
    techName: '',
    vendorName: '',
    qaName: '',
    jcNumber: '',
    xDate: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    styleName: '',
    samplingMerchant: '',
    jcNumber: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    const errors = {
      styleName: '',
      samplingMerchant: '',
      jcNumber: '',
    };

    if (!form.styleName) errors.styleName = 'Style Name is required.';
    if (!form.samplingMerchant) errors.samplingMerchant = 'Sampling Merchant is required.';
    if (!form.jcNumber) errors.jcNumber = 'JC Number is required.';

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (fieldErrors.hasOwnProperty(e.target.name)) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    }
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);

    if (Object.values(errors).some(Boolean)) {
      setError('Please fix the errors below.');
      setSuccess('');
      return;
    }

    setSuccess('Style added successfully!');
    setError('');
  };

  const renderField = (
    label: string,
    name: keyof typeof form,
    type: string = 'text'
  ) => (
    <div>
      <label className="block text-gray-700 font-medium mb-1" htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${fieldErrors[name as keyof typeof fieldErrors] ? 'border-red-400' : ''}`}
      />
      {fieldErrors[name as keyof typeof fieldErrors] && (
        <div className="text-red-500 text-xs mt-1">
          {fieldErrors[name as keyof typeof fieldErrors]}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen min-w-full flex bg-gray-200">
      <div className="flex-1 flex flex-col">

        {/* <header className="w-full bg-white shadow flex items-center justify-between px-8 py-4">
          <span className="text-lg font-semibold text-purple-700">User Management System</span>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <img src="/public/globe.svg" alt="avatar" className="w-8 h-8 rounded-full bg-purple-200" />
          </div>
        </header> */}

        <main className="flex-1 flex flex-col items-center justify-center p-6 ">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8 space-y-6"
          >
            <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">ADD STYLE</h2>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center">{success}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField("Style Name", "styleName")}
              {renderField("Style Number", "styleNumber")}
              {renderField("PO Number", "poNumber")}
              {renderField("Buyer Number", "buyerNumber")}
              {renderField("Sampling Merchant", "samplingMerchant")}
              {renderField("Production Merchant", "productionMerchant")}
              {renderField("Tech Name", "techName")}
              {renderField("Vendor Name", "vendorName")}
              {renderField("QA Name", "qaName")}
              {renderField("JC Number", "jcNumber")}
              {renderField("X-Date", "xDate", "date")}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200 shadow-md"
            >
              Add Style
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddStylePage;
