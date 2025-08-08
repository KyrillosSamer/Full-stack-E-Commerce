// src/pages/cart/Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from "../Context/CartContext";
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';



export default function Cart() {
  const { cartData, fetchCart } = useCart();
  const token = localStorage.getItem("userToken");
  const [localCart, setLocalCart] = useState([]);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const navigate = useNavigate();

  // Sync local state with context cartData
  useEffect(() => {
    if (cartData) {
      setLocalCart(cartData.data.products);
    }
  }, [cartData]);

  if (!token) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-[#007a55]">Please log in to view your cart</h2>
      </div>
    );
  }

  // Update product quantity
  async function updateCount(productId, newCount) {
    setLocalCart(prev =>
      prev.map(item =>
        item.product._id === productId
          ? { ...item, count: newCount }
          : item
      )
    );

    try {
      await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers: { token } }
      );
      fetchCart();
    } catch (err) {
      console.error("Failed to update count", err);
    }
  }

  // Delete product from cart
  async function deleteItem(productId) {
    setLocalCart(prev =>
      prev.filter(item => item.product._id !== productId)
    );

    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: { token } }
      );
      fetchCart();
    } catch (err) {
      console.error("Failed to delete item", err);
    }
  }

  // Create order dynamically with user's address
 async function createOrder() {
  if (!selectedAddressId) {
    alert("Please select a shipping address before checkout.");
    return;
  }

  try {
    setLoadingOrder(true);
    const cartId = cartData?.data?._id;
    if (!cartId) {
      alert("No cart found to place an order.");
      return;
    }

    const res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
      {
        url: 'http://localhost:5173/', 
      },
      { headers: { token } }
    );

    if (res.data?.session?.url) {
      window.location.href = res.data.session.url;
    } else {
      alert("Failed to initiate payment session.");
    }
  } catch (error) {
    console.error("Error during order/payment process:", error.response ? error.response.data : error.message);
    alert("Error processing your order/payment. Please try again.");
  } finally {
    setLoadingOrder(false);
  }
}




if (!cartData) {
  return (
    <div className="flex justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-[#007a55]" size={40} />
      <span className="ml-4 text-xl font-semibold text-[#007a55]">Loading cart...</span>
    </div>
  );
}

  return (
    <div className="p-6 text-[#007a55] ">
      <h1 className="text-2xl font-bold mb-4 justify-center items-center flex">Shopping Cart</h1>

      {localCart.length === 0 ? (
        <p className='justify-center items-center flex'>Your cart is empty</p>
      ) : (
        <>
          {localCart.map(item => (
            <div key={item.product._id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center gap-4">
                <img src={item.product.imageCover} className="w-20 h-20 object-cover" alt="" />
                <div>
                  <h2 className="font-semibold">{item.product.title}</h2>
                  <p>{item.price} EGP</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCount(item.product._id, item.count + 1)}
                  className="px-3 py-1 border border-green-600 text-green-600 bg-white rounded hover:bg-green-600 hover:text-white transition"
                >
                  +
                </button>

                <span className="min-w-[20px] text-center">{item.count}</span>

                <button
                  onClick={() => {
                    if (item.count > 1) updateCount(item.product._id, item.count - 1);
                    else deleteItem(item.product._id);
                  }}
                  className="px-3 py-1 border border-red-600 text-red-600 bg-white rounded hover:bg-red-600 hover:text-white transition"
                >
                  -
                </button>

                <button
                  onClick={() => deleteItem(item.product._id)}
                  className="ml-2 text-red-500 hover:text-red-700 transition text-2xl"
                  title="Remove item"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          ))}

          {/* Purchase button */}
          <div className="mt-6 text-right">
        <button
            onClick={createOrder}
            className="px-6 py-2 bg-[#00c650] text-white rounded hover:bg-green-800 
            hover:cursor-pointer transition disabled:opacity-60 flex items-center justify-center gap-2"
            disabled={loadingOrder}
          >
            {loadingOrder && <FaSpinner className="animate-spin" />}
            {loadingOrder ? "Creating order..." : "Buy Now"}
        </button>

          </div>
        </>
      )}
    </div>
  );
}
