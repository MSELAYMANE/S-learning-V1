import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white fixed top-0 left-0 w-full shadow-md z-50">
      <div className="w-full max-w-none px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <img
            src="/S-learning-logo.png"
            alt="Logo"
            className="h-20 w-auto max-w-[200px] object-contain"
          />
        </Link>
        <div className="hidden md:flex space-x-6 font-bold">
          <Link to="/company" className="text-gray-700 hover:text-blue-500">
            Company
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-500">
            Products
          </Link>
          <Link to="/solutions" className="text-gray-700 hover:text-blue-500">
            Solutions
          </Link>
          <Link to="/career" className="text-gray-700 hover:text-blue-500">
            Career
          </Link>
        </div>
        <div className="hidden md:flex">
          <Link
            to="/login"
            className="px-4 py-2 border border-blue-500 text-blue-500 bg-white rounded-md hover:bg-blue-500 hover:text-white transition"
          >
            Log In
          </Link>
        </div>
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-white py-2">
          <Link to="/company" className="py-2">
            Company
          </Link>
          <Link to="/products" className="py-2">
            Products
          </Link>
          <Link to="/solutions" className="py-2">
            Solutions
          </Link>
          <Link to="/career" className="py-2">
            Career
          </Link>
          <Link
            to="/login"
            className="py-2 px-4 border border-blue-500 text-blue-500 bg-white rounded-md w-32 text-center mt-2"
          >
            Log In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;