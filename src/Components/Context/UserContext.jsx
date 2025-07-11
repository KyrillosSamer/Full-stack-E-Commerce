import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // get token in local storage 
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Log out function
  const logout = () => {
    localStorage.removeItem("userToken");
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ token, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
}
