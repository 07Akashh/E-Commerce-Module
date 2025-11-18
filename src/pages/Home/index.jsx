import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import ProductCard from "../../components/productlist/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../redux/productSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loaded, loading: storeLoading } = useSelector(
    (s) => s.products
  );

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState([0, 3000]);

  const [filters, setFilters] = useState({
    category: "all",
    price: [0, 3000],
  });

  const observerRef = useRef(null);

  useEffect(() => {
    if (!loaded) dispatch(fetchAllProducts());
  }, [loaded, dispatch]);

  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    return products.filter((item) => {
      if (filters.category !== "all" && item.category !== filters.category)
        return false;
      if (item.price < filters.price[0] || item.price > filters.price[1])
        return false;
      return true;
    });
  }, [products, filters]);

  const loadProducts = useCallback(
    (pageNumber) => {
      const start = (pageNumber - 1) * 8;
      const end = start + 8;

      const pageItems = filteredProducts.slice(start, end);

      if (pageNumber === 1) {
        setItems(pageItems);
      } else {
        setItems((prev) => [...prev, ...pageItems]);
      }

      setHasMore(end < filteredProducts.length);
    },
    [filteredProducts]
  );

  useEffect(() => {
    if (!loaded) return;
    loadProducts(page);
  }, [page, loaded, loadProducts]);

  const applyFilters = () => {
    setFilters({ category, price });
    setPage(1);
  };

  const lastRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((p) => p + 1);
          }
        },
        { threshold: 0.5 }
      );

      if (node) observerRef.current.observe(node);
    },
    [hasMore]
  );

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm items-end">
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All</option>
            <option value="men's clothing">Men Clothing</option>
            <option value="women's clothing">Women Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Price Range
          </label>
          <input
            type="range"
            min="0"
            max="3000"
            value={price[1]}
            onChange={(e) => setPrice([0, Number(e.target.value)])}
            className="accent-black"
          />
          <span className="text-xs mt-1 text-gray-600">Up to ₹{price[1]}</span>
        </div>

        <button
          onClick={applyFilters}
          className="bg-black text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-900 transition"
        >
          Apply
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {items.map((p, i) => {
          const isLast = i === items.length - 1;
          return (
            <div key={p.id} ref={isLast ? lastRef : null}>
              <ProductCard product={p} />
            </div>
          );
        })}

        {storeLoading && items.length === 0 &&
          [...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-72 w-64 bg-gray-200 rounded-xl animate-pulse"
            />
          ))}
      </div>

      {storeLoading && items.length > 0 && (
        <div className="flex justify-center py-6">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      {!hasMore && (
        <div className="text-center text-gray-500 py-6">
          🎉 No more products to show
        </div>
      )}
    </>
  );
}
