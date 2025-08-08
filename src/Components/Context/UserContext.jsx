import React, { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setToken(storedToken);
      // هنا لو عندك API تجيب منه بيانات المستخدم، استدعيه
      // أو خزّن الـ userId في localStorage وقت الـ login
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    setToken(null);
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ token, setToken, logout, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook جاهز للاستخدام
export function useUserContext() {
  return useContext(UserContext);
}
