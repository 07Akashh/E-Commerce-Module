import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../redux/cartSlice";
import ProductCard from "../../components/productlist/ProductCard";
import { fetchAllProducts } from "../../redux/productSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    products,
    loaded,
    loading: storeLoading,
  } = useSelector((s) => s.products);

  const isInCart = useSelector((s) => s.cart.items[id]);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    setProduct(data);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = () => {
    dispatch(addItem({ id: product.id, product, quantity: qty }));
  };

  useEffect(() => {
    console.log(products);
    if (product) {
      const filtered = products.filter((item) => {
        if (item.id === product.id) return false;
        if (item.category !== product.category) return false;
        return true;
      });

      setRelatedProducts(filtered);
    }
  }, [product, products]);

  useEffect(() => {
    if (!loaded) dispatch(fetchAllProducts());
  }, [loaded, dispatch]);

  const handleRemove = () => {
    dispatch(removeItem(product.id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl p-8">
        <div className="flex justify-center items-center">
          <div className="p-5 bg-gray-100 rounded-xl">
            <img
              src={product.image}
              alt={product.title}
              className="w-80 h-80 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {product.description}
          </p>

          <p className="text-2xl font-semibold mb-4 text-black">
            ₹ {product.price}
          </p>

          <p className="text-sm text-gray-600 mb-2">
            Category: <span className="font-medium">{product.category}</span>
          </p>

          <p className="text-sm text-gray-600 mb-6">
            Rating: ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
          </p>

          {!isInCart && (
            <div className="mb-6">
              <label className="text-sm text-gray-700 font-medium">
                Quantity
              </label>
              <div className="flex items-center gap-3 mt-2">
                <button
                  className="px-3 py-1 border rounded-lg"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="text-lg">{qty}</span>
                <button
                  className="px-3 py-1 border rounded-lg"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* CART BUTTON */}
          {isInCart ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleRemove}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition"
              >
                Remove from Cart
              </button>

              <p className="text-green-600 font-medium">
                Added ✓ (Qty: {isInCart.qty})
              </p>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-7 py-3 rounded-lg font-medium hover:bg-gray-900 transition w-full md:w-auto"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-4">You may also like</h2>

        {storeLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : relatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">
            No related products found.
          </div>
        )}
      </div>
    </div>
  );
}