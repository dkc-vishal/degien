"use client";
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    const errors = { email: '', password: '' };
    if (!form.email) errors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.email = 'Invalid email address.';
    if (!form.password) errors.password = 'Password is required.';
    else if (form.password.length < 6) errors.password = 'Password must be at least 6 characters.';
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
    setSuccess('Login successful!');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">USER LOGIN</h2>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${fieldErrors.email ? 'border-red-400' : ''}`}
            autoComplete="email"
          />
          {fieldErrors.email && <div className="text-red-500 text-xs mt-1">{fieldErrors.email}</div>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${fieldErrors.password ? 'border-red-400' : ''}`}
            autoComplete="current-password"
          />
          {fieldErrors.password && <div className="text-red-500 text-xs mt-1">{fieldErrors.password}</div>}
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200 shadow-md"
        >
          Login
        </button>
        <div className="text-center mt-2">
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <a href="/Layout/Resistation" className="text-purple-700 hover:underline font-medium text-sm">Register</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;