import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-500 to-green-800 text-white py-6 mb-0">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold">ShopMate</h2>
          <p className="text-gray-200 mt-2">Your one-stop shop for everything.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-1">
            <li><a href="/" className="text-gray-200 hover:text-white">Home</a></li>
            <li><a href="/shop" className="text-gray-200 hover:text-white">Shop</a></li>
            <li><a href="/about" className="text-gray-200 hover:text-white">About Us</a></li>
            <li><a href="/contact" className="text-gray-200 hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social & Payment Methods */}
        <div>
          <h3 className="font-semibold">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <FaFacebook className="text-gray-300 hover:text-white cursor-pointer" size={24} />
            <FaInstagram className="text-gray-300 hover:text-white cursor-pointer" size={24} />
            <FaTwitter className="text-gray-300 hover:text-white cursor-pointer" size={24} />
          </div>

          <h3 className="font-semibold mt-4">We Accept</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <FaCcVisa className="text-gray-300" size={32} />
            <FaCcMastercard className="text-gray-300" size={32} />
            <FaCcPaypal className="text-gray-300" size={32} />
          </div>
        </div>
      </div>

      <div className="text-center text-gray-300 text-sm mt-6">
        &copy; {new Date().getFullYear()} ShopMate. All rights reserved.
      </div>
    </footer>
  );
}
