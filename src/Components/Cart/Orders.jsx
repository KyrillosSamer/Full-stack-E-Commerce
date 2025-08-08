import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdShoppingBag } from "react-icons/md";

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const decoded = parseJwt(token);
    const userId = decoded?.id || decoded?._id;

    if (!userId) {
      console.error("Invalid token: No user ID found");
      setLoading(false);
      return;
    }

    async function fetchUserOrders() {
      try {
        const res = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
          { headers: { token } }
        );
        setOrders(res.data.data || res.data);
      } catch (error) {
        console.error("Failed to fetch user orders", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserOrders();
  }, [token]);

  if (loading) {
    return (
      <p className="p-10 text-center text-lg text-gray-600 font-semibold">
        Loading your orders...
      </p>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <MdShoppingBag size={60} className="mb-6 text-gray-400" />
        <p className="text-xl font-semibold">No orders found yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-[#007a55]">
        My Orders
      </h1>

      <ul className="space-y-8">
        {orders.map(order => (
          <li
            key={order._id}
            className="border border-gray-300 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5">
              <p className="text-gray-700 text-lg font-semibold break-all">
                <span className="text-gray-400 font-normal">Order ID: </span>
                {order._id}
              </p>
              <p className="text-gray-500 text-sm mt-2 md:mt-0">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </p>
            </div>

            <p className="text-xl font-bold text-indigo-600 mb-4">
              Total: ${order.totalOrderPrice?.toFixed(2) || "0.00"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 font-medium mb-6">
              <p>
                Payment Status:{" "}
                <span className={order.isPaid ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {order.isPaid ? "Paid ✅" : "Not Paid ❌"}
                </span>
              </p>
              <p>
                Payment Method:{" "}
                <span className="capitalize">{order.paymentMethodType || "Not specified"}</span>
              </p>
              <p>
                Delivered:{" "}
                <span className={order.isDelivered ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {order.isDelivered ? "Yes" : "No"}
                </span>
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="font-semibold text-gray-800 mb-4 text-lg">Products:</p>
              {order.cartItems.map(item => (
                <div
                  key={item._id}
                  className="flex items-center gap-6 border-b border-gray-200 py-4 last:border-b-0"
                >
                  <img
                    src={item.product?.imageCover || ""}
                    alt={item.product?.title || "Product image"}
                    className="w-20 h-20 object-cover rounded-md shadow-sm"
                  />
                  <div className="flex flex-col">
                    <p className="text-gray-900 font-semibold text-lg">
                      {item.product?.title || "Unknown Product"}
                    </p>
                    <p className="text-gray-600">Quantity: {item.count}</p>
                    <p className="text-gray-600 font-medium">
                      Price: ${item.price?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
