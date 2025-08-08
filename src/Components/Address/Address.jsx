import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Address() {
  const token = localStorage.getItem("userToken");
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    details: "",
    phone: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);

  async function fetchAddresses() {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/addresses",
        { headers: { token } }
      );
      setAddresses(res.data.data || []);
    } catch (err) {
      console.error("Error fetching addresses", err);
    } finally {
      setLoading(false);
    }
  }

  async function addAddress(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/addresses",
        form,
        { headers: { token } }
      );
      setForm({ name: "", details: "", phone: "", city: "" });
      fetchAddresses();
    } catch (err) {
      console.error("Error adding address", err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteAddress(id) {
    try {
      setLoading(true);
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
        { headers: { token } }
      );
      fetchAddresses();
    } catch (err) {
      console.error("Error deleting address", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) fetchAddresses();
  }, [token]);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Please log in to manage your addresses
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 mb-20 text-green-900">
      <h1 className="text-3xl font-extrabold  mb-8 text-center text-[#007a55]">
        Manage Your Addresses
      </h1>

      {/* Address Form */}
      <form onSubmit={addAddress} className="space-y-6 mb-10">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label
            htmlFor="details"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address Details
          </label>
          <textarea
            id="details"
            placeholder="Street, Building, Apartment, etc."
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-4 py-2 resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+20 123 456 7890"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="Cairo"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold transition
            ${
              loading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {loading ? "Saving..." : "Add Address"}
        </button>
      </form>

      {/* Address List */}
      <div>
        {loading && addresses.length === 0 ? (
          <p className="text-center text-gray-500">Loading addresses...</p>
        ) : addresses.length === 0 ? (
          <p className="text-center text-gray-500">No saved addresses yet.</p>
        ) : (
          <ul className="space-y-4">
            {addresses.map((addr) => (
              <li
                key={addr._id}
                className="border rounded-md p-4 flex justify-between items-center shadow-sm hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{addr.name}</h3>
                  <p className="text-gray-700">{addr.details}</p>
                  <p className="text-gray-700">{addr.phone}</p>
                  <p className="text-gray-700">{addr.city}</p>
                </div>
                <button
                  onClick={() => deleteAddress(addr._id)}
                  disabled={loading}
                  className="text-red-600 hover:text-red-800 font-semibold px-4 py-2 border border-red-600 rounded-md transition disabled:opacity-50"
                  aria-label={`Delete address for ${addr.name}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
