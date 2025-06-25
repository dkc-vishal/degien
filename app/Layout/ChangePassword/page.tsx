"use client";
import React, { useState } from 'react';

const ChangePasswordPage: React.FC = () => {
  const [form, setForm] = useState({
    systemPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    systemPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    const errors = { systemPassword: '', newPassword: '', confirmNewPassword: '' };
    if (!form.systemPassword) errors.systemPassword = 'System generated password is required.';
    if (!form.newPassword) errors.newPassword = 'New password is required.';
    else if (form.newPassword.length < 6) errors.newPassword = 'New password must be at least 6 characters.';
    if (!form.confirmNewPassword) errors.confirmNewPassword = 'Please confirm your new password.';
    else if (form.newPassword && form.confirmNewPassword !== form.newPassword) errors.confirmNewPassword = 'Passwords do not match.';
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
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
    setSuccess('Password changed successfully!');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">CHANGED PASSWORD</h2>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="systemPassword">System Generated Password</label>
          <input
            type="password"
            id="systemPassword"
            name="systemPassword"
            value={form.systemPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${fieldErrors.systemPassword ? 'border-red-400' : ''}`}
            autoComplete="current-password"
          />
          {fieldErrors.systemPassword && <div className="text-red-500 text-xs mt-1">{fieldErrors.systemPassword}</div>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${fieldErrors.newPassword ? 'border-red-400' : ''}`}
            autoComplete="new-password"
          />
          {fieldErrors.newPassword && <div className="text-red-500 text-xs mt-1">{fieldErrors.newPassword}</div>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${fieldErrors.confirmNewPassword ? 'border-red-400' : ''}`}
            autoComplete="new-password"
          />
          {fieldErrors.confirmNewPassword && <div className="text-red-500 text-xs mt-1">{fieldErrors.confirmNewPassword}</div>}
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200 shadow-md"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;