import React from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../redux/cartSlice";
import CartItem from "../../components/cart/CartItem";

export default function Cart() {
  const items = useSelector((s) => s.cart.items);
  const total = useSelector(selectCartTotal);
  const arr = Object.values(items);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">🛒 Your Cart</h2>

      {!arr.length ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img
            src="/assets/empty-cart.png"
            alt="empty cart"
            className="w-40 opacity-80 mb-4"
          />
          <p className="text-gray-600 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {arr.map((it) => (
              <li
                key={it.product.id}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
              >
                <CartItem item={it} />
              </li>
            ))}
          </ul>

          <div className="bg-white shadow-md rounded-xl p-5 mt-6 border border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Total</h3>

            <div className="text-2xl font-bold">₹{total.toFixed(2)}</div>
          </div>

          <div className="mt-6 text-right">
            <button className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
