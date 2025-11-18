import React from "react";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../redux/cartSlice";
import { Link } from "react-router-dom";

const Header = React.memo(function Header() {
  const count = useSelector(selectCartCount);

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src="/logo192.png"
              alt="logo"
              className="w-10 h-10 object-contain"
            />
          </Link>
        </div>

        <nav className="flex gap-4">
          <Link
            to="/"
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="relative text-lg font-medium text-gray-800 hover:text-blue-600 transition"
          >
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
});

export default Header;
