

# 🛍️ E-Commerce Module — Assignment (FakeStore API)

This project is a small, fully functional **e-commerce module** built using **React**, **Redux Toolkit**, and the **FakeStore API**.
It includes product listing, product details, cart management, filters, loading states, and clean UI following modern React standards.

---

## 🔗 Live API Used

**FakeStore API:**
[https://fakestoreapi.com/](https://fakestoreapi.com/)

---

# 📚 Features Implemented

Below is the list of assignment requirements and how the project fulfills each one.

---

# ✅ 1. Fetch Products

✔ Fetched all products using:

```
GET https://fakestoreapi.com/products
```

✔ Displayed each product with:

* Image
* Title
* Price
* Category

✔ Store products inside **Redux Toolkit** for global availability.

✔ Implemented loading skeleton while products are being fetched.

---

# ✅ 2. Product Details Page

✔ On clicking a product, user is navigated to:

```
/product/:id
```

✔ Fetched full product details from:

```
GET https://fakestoreapi.com/products/:id
```

✔ Displayed:

* Title
* Description
* Image
* Price
* Category
* Rating (rate + count)

✔ Added a professional, clean UI with animations.

✔ Showed **related products** based on matching category (excluding current product ID).

✔ Added skeleton UI when the store was still loading.

---

# ✅ 3. State Management (Redux Toolkit)

✔ Implemented Redux slices:

### **Product Slice**

* Fetch all products
* Store product list
* Loaded + loading states
* Error handling

### **Cart Slice**

* Add to cart
* Remove from cart
* Track quantity
* Prevent duplicates
* Maintain cart total

✔ Global store setup using Redux Toolkit.

---

# ✅ 4. Add to Cart Feature

✔ On Product Details page:

* Add to Cart button
* Quantity selector (+/-)
* If item already exists → show “Remove from Cart” button
* Display existing quantity if already added

✔ Cart Page includes:

* List of all cart products
* Price & quantity
* Total cart amount
* Remove item functionality

---

# ✅ 5. Clean & Consistent Styling

✔ Used **Tailwind CSS** for modern, responsive UI.

✔ Smooth animations for:

* Product hover
* Image zoom
* Card hover shadows
* Page transitions

✔ Skeleton loaders for:

* Product listing
* Related products
* Product details image loading

---

# ✅ 6. Clean Folder Structure

```
src/
│
├── components/
│     ├── Header/
│     ├── productlist/
│     ├── cart/
│
├── pages/
│     ├── Home/
│     ├── ProductDetail/
│     ├── Cart/
│
├── redux/
│     ├── store.js
│     ├── productSlice.js
│     ├── cartSlice.js
│
├── routes/
│     ├── MainRoutes.jsx
│
├── layouts/
│     ├── Layout.jsx
│
└── App.js
```

✔ UI, business logic, state, and routes are **cleanly separated**.

---

# 🎁 Bonus Features Implemented

✔ **Category-based related products**
✔ **Loading skeleton for related products**
✔ **Global caching of product list (no repeated API calls)**
✔ **Reusable ProductCard component**
✔ **Clean routing with Suspense + Lazy Loading**

---

# 🧪 Technologies Used

| Tech          | Purpose      |
| ------------- | ------------ |
| React.js      | Frontend     |
| Redux Toolkit | Global state |
| React Router  | Navigation   |
| Tailwind CSS  | UI styling   |
| FakeStore API | Data source  |

---

# 🖼️ Screens & Functionality

### **Home Page**

* Displays product list
* Shows loading skeleton initially

### **Product Details Page**

* Fetches product by ID
* Shows full details
* Quantity selector
* Add/Remove from cart
* Related products grid

### **Cart Page**

* List of all cart items
* Qty + total price
* Remove product

---

# 🚀 How to Run the Project

```bash
npm install
npm start
```

---

# 📦 API Endpoints Used

| Feature       | Endpoint        |
| ------------- | --------------- |
| All Products  | `/products`     |
| Product by ID | `/products/:id` |

---
