import React from "react";
import { useDispatch } from "react-redux";
import { increase, decrease, removeItem } from "../../redux/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const { product, qty } = item;

  return (
    <div className="flex items-center gap-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-20 h-20 object-contain rounded-md bg-gray-50 p-2"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 text-sm md:text-base">
          {product.title}
        </h3>

        <p className="text-gray-600 text-sm">₹{product.price.toFixed(2)}</p>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => dispatch(decrease(product.id))}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            −
          </button>

          <span classie="min-w-6 text-center font-semibold">{qty}</span>

          <button
            onClick={() => dispatch(increase(product.id))}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            +
          </button>

          <button
            onClick={() => dispatch(removeItem(product.id))}
            className="ml-3 text-red-600 text-sm font-medium hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="text-right font-semibold text-gray-800 w-20">
        ₹{(qty * product.price).toFixed(2)}
      </div>
    </div>
  );
}
