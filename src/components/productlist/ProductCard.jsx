import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increase, decrease } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const inCart = useSelector((s) => s.cart.items[product.id]);
  const navigate = useNavigate();

  // const total = useMemo(() => {
  //   const qty = inCart?.qty || 0;
  //   return (qty * product.price).toFixed(2);
  // }, [inCart, product.price]);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="
        bg-white p-4 rounded-xl shadow-md 
        hover:shadow-lg transition-all duration-300 
        flex flex-col gap-3 cursor-pointer min-h-[380px]
      "
    >
      <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-36 object-contain"
        />
      </div>

      <h3 className="text-[15px] font-semibold line-clamp-2 min-h-[40px]">
        {product.title}
      </h3>

      <div className="text-lg font-bold text-gray-900">
        ₹{product.price.toFixed(2)}
      </div>

      <p className="text-sm text-gray-500 line-clamp-2 min-h-[32px]">
        {product.description}
      </p>

      {!inCart ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addItem({ id: product.id, product, quantity: 1 }));
          }}
          className="
            w-full bg-black text-white py-2 rounded-lg 
            font-semibold text-sm hover:bg-gray-800 
            active:scale-95 transition-all
          "
        >
          Add to Cart
        </button>
      ) : (
        <div
          className="
            flex items-center justify-between bg-gray-100 
            px-3 py-2 rounded-lg
          "
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(decrease(product.id));
            }}
            className="
              w-7 h-7 text-white bg-black rounded-full 
              flex items-center justify-center text-lg 
              hover:bg-gray-800 active:scale-95 transition-all
            "
          >
            −
          </button>

          <span className="text-base font-semibold">{inCart.qty}</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(increase(product.id));
            }}
            className="
              w-7 h-7 text-white bg-black rounded-full 
              flex items-center justify-center text-lg 
              hover:bg-gray-800 active:scale-95 transition-all
            "
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(ProductCard);
