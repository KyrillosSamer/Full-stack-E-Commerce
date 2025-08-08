import React from 'react';
import Navbar from '../NavBar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { Toaster } from 'react-hot-toast'; // ✅ استيراد Toaster

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ✅ مكون التوست لازم يكون ظاهر في الشجرة */}
      <Toaster position="top-center" reverseOrder={false} />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
