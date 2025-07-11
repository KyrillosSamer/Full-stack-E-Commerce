import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FaSpinner } from 'react-icons/fa';

export default function Brands() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-green-500" size={40} />
        <span className="ml-3 text-xl text-gray-600">Loading Brands...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center mt-10">
        Error loading brands: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-center text-4xl font-bold mb-10 text-green-700">Top Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {data.map((brand, i) => (
          <div
            key={brand._id}
            className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ${
              i % 3 === 0
                ? 'bg-green-100'
                : i % 3 === 1
                ? 'bg-blue-100'
                : 'bg-purple-100'
            }`}
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-20 h-20 object-contain mb-2"
            />
            <p className="text-center font-semibold text-gray-800">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
