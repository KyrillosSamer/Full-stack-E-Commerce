import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartData, setCartData] = useState(null);
  const token = localStorage.getItem("userToken");

  async function fetchCart() {
    if (!token) return;
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token }
      });
      setCartData(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, [token]);

  return (
    <CartContext.Provider value={{ cartData, setCartData, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
