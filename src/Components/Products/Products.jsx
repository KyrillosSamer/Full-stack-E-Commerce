import React from 'react';
import axios from 'axios';
import { FaSpinner, FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useCart } from '../Context/CartContext';



export default function Products() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
const { fetchCart } = useCart();


  // Call Products API
  async function callApi() {
    const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    return res.data.data;
  }

  // Add to Cart Function
  async function addToCart(productId) {
  if (!token) {
    toast.error("Please login first.");
    navigate("/Login");
    return;
  }

  try {
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token: token,
        },
      }
    );

    toast.success("Product added to cart!");
    fetchCart();
  } catch (err) {
    console.error("Failed to add to cart:", err?.response?.data || err.message);
    toast.error("Failed to add to cart: " + (err?.response?.data?.message || err.message));
  }
}


  // Fetching products with React Query
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: callApi,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    refetchInterval: 1000 * 60 * 10,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-green-400" size={40} />
        <span className="ml-4 text-xl">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <h1 className="text-center text-4xl font-bold mb-8 text-emerald-700">
        The Best Brand For You!
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden flex flex-col items-center border border-gray-100 p-3 shadow-md hover:shadow-xl rounded-xl bg-white transition-transform transform hover:-translate-y-1"
          >
            <Link to={`/ProductDetails/${product.id}`} className="w-full flex flex-col items-center">
              <div className="relative w-full h-44 overflow-hidden flex justify-center items-center bg-gray-50 rounded-md">
                {product.priceAfterDiscount && (
                  <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-br-md">
                    SALE
                  </span>
                )}
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h2 className="text-center text-emerald-600 text-lg font-semibold mt-3">
                {product.category.name}
              </h2>

              <div className="flex justify-between items-center w-full mt-2 px-2 text-sm">
                {product.priceAfterDiscount ? (
                  <div className="flex items-center gap-2">
                    <span className="line-through text-red-500 text-xs">
                      {product.price} EGP
                    </span>
                    <span className="text-green-700 font-bold">
                      {product.priceAfterDiscount} EGP
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-800 font-bold">{product.price} EGP</span>
                )}

                <span className="flex items-center gap-1 text-yellow-500">
                  <FaStar />
                  <span className="text-black">{product.ratingsAverage}</span>
                </span>
              </div>
            </Link>

            <button
              onClick={() => addToCart(product.id)}
              className="hover:cursor-pointer mt-4 w-full bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white py-2 px-3 rounded-lg font-semibold transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
