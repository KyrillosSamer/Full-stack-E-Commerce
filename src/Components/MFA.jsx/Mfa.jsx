import React, { useState } from 'react';

function MFAForm({ onVerify }) {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/verify-mfa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) onVerify();
        else alert('رمز التحقق غير صحيح');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl shadow-md max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">تحقق من الرمز</h2>
      <input
        type="text"
        placeholder="أدخل رمز التحقق"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        تأكيد
      </button>
    </form>
  );
}

export default MFAForm;
