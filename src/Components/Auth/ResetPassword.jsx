import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  // جلب email من الـ state فقط (مش resetCode)
  const { email } = location.state || {};

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email) {
      setError("Email is missing.");
      setLoading(false);
      return;
    }

    try {
      await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        {
          email: email,
          newPassword: password,   // الاسم هنا newPassword وليس password
        }
      );

      // لو ناجح، نوجه المستخدم لصفحة تسجيل الدخول
      navigate('/login');
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  }

  if (!email) {
    return (
      <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded shadow text-center">
        <p className="text-red-600 font-semibold">
          Invalid reset link or missing email.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Reset Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Reset Password'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
    </div>
  );
}
