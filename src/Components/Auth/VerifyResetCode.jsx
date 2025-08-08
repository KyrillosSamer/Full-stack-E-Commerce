import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

export default function VerifyResetCode() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        { email, resetCode: code }
      );
      // لو تحقق الكود بنجاح، ننتقل لصفحة إعادة تعيين كلمة السر ونمرر الايميل والكود
      navigate('/reset-password', { state: { email, resetCode: code } });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid reset code.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Verify Reset Code</h2>

      <p className="mb-4 text-center">We sent a code to: <strong>{email}</strong></p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="code" className="block mb-1 font-medium">Reset Code</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Enter reset code"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Verify Code'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
    </div>
  );
}
