import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSpinner, FaTrashAlt } from 'react-icons/fa';

export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorApi, setErrorApi] = useState(null);
  const token = localStorage.getItem("userToken");

  // Fetch cart data
  useEffect(() => {
    async function fetchCart() {
      if (!token) {
        setErrorApi("Please login to see your cart.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: {
            token: token
          }
        });
        setCartData(res.data);
      } catch (error) {
        setErrorApi(error?.response?.data?.message || "Failed to load cart");
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [token]);

  // Delete item from cart
  async function removeItem(productId) {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
          token: token
        }
      });
      setCartData((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          products: prev.data.products.filter((p) => p.product.id !== productId)
        }
      }));
    } catch (error) {
      alert(" Failed to remove item");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-green-500" size={40} />
        <span className="ml-4 text-xl">Loading cart...</span>
      </div>
    );
  }

if (errorApi) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded relative max-w-md mx-auto shadow-md">
        <strong className="font-bold block text-lg mb-2">⚠️ Oops!</strong>
        <span className="block sm:inline">{errorApi}</span>
        <div className="mt-4 text-center">
          <a
            href="/login"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
}


  if (!cartData || cartData.numOfCartItems === 0) {
    return (
      <div className="text-center mt-10 text-xl text-gray-700">
        🛒 Your cart is empty.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">🛒 Your Cart</h2>

      {cartData.data.products.map((item) => (
        <div key={item._id} className="flex items-center justify-between border-b border-gray-300 py-4">
          <div className="flex items-center space-x-4">
            <img src={item.product.imageCover} alt={item.product.title} className="w-20 h-20 object-contain" />
            <div>
              <h3 className="font-semibold text-lg">{item.product.title}</h3>
              <p className="text-gray-500">Price: {item.price} EGP</p>
              <p className="text-gray-500">Quantity: {item.count}</p>
            </div>
          </div>

          <button
            onClick={() => removeItem(item.product.id)}
            className="text-red-500 hover:text-red-700"
            title="Remove item"
          >
            <FaTrashAlt size={18} />
          </button>
        </div>
      ))}

      <div className="text-right mt-6 text-lg font-semibold">
        Total Price: <span className="text-green-600">{cartData.data.totalCartPrice} EGP</span>
      </div>
    </div>
  );
}
