"use client";
import React, { useState } from 'react';

const departments = ['', 'IT', 'HR', 'Finance', 'Marketing', 'Sales'];

const page: React.FC = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    department: '',
    designation: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [fieldErrors, setFieldErrors] = useState({
    username: '',
    email: '',
    department: '',
    designation: '',
  });

  const validate = () => {
    const errors = {
      username: '',
      email: '',
      department: '',
      designation: '',
    };

    if (!form.username) errors.username = 'Username is required.';
    if (!form.email) errors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.email = 'Invalid email address.';
    if (!form.department) errors.department = 'Department is required.';
    if (!form.designation) errors.designation = 'Designation is required.';

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
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
    setSuccess('Signup successful!');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg w-full max-w-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">ADD USER FORM</h2>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">{success}</div>}

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="username">Employee Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${fieldErrors.username ? 'border-red-400' : ''}`}
            autoComplete="username"
          />
          {fieldErrors.username && <div className="text-red-500 text-xs mt-1">{fieldErrors.username}</div>}
        </div>

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
          <label className="block text-gray-700 font-medium mb-1" htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={form.department}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${fieldErrors.department ? 'border-red-400' : ''}`}
          >
            {departments.map(dep => (
              <option key={dep} value={dep}>{dep ? dep : 'Select Department'}</option>
            ))}
          </select>
          {fieldErrors.department && <div className="text-red-500 text-xs mt-1">{fieldErrors.department}</div>}
        </div>

        {/* <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="designation">Designation</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${fieldErrors.designation ? 'border-red-400' : ''}`}
            autoComplete="off"
          />
          {fieldErrors.designation && <div className="text-red-500 text-xs mt-1">{fieldErrors.designation}</div>}
        </div> */}

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200 shadow-md"
        >
          Sign Up
        </button>

        <div className="text-center mt-2">
          <span className="text-gray-600 text-sm">Already have an account? </span>
          <a href="/Auth/Login" className="text-purple-700 hover:underline font-medium text-sm">Login</a>
        </div>
      </form>
    </div>
  );
};

export default page;