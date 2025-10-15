// src/components/OrderPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPen, FaEye, FaTrashAlt, FaTimes } from "react-icons/fa";
import Navbar from "./Navbar";

const STATUS_OPTIONS = ["Cancelled", "Delivering", "Delivered"];

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [loading, setLoading] = useState(true);

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // ✅ Fetch username by userId
  const fetchUserName = async (userId) => {
    if (!userId || userNames[userId]) return;
    try {
      const res = await axios.get(
        `https://admin-server-2aht.onrender.com/api/products/data/user/${userId}`
      );
      if (res.data && res.data.userName) {
        setUserNames((prev) => ({ ...prev, [userId]: res.data.userName }));
      } else {
        setUserNames((prev) => ({ ...prev, [userId]: userId }));
      }
    } catch (err) {
      console.error("Error fetching user name:", err);
      setUserNames((prev) => ({ ...prev, [userId]: userId }));
    }
  };

  // ✅ Fetch orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const [normalRes, customRes] = await Promise.all([
          axios.get("https://admin-server-2aht.onrender.com/api/orders/normal"),
          axios.get("https://admin-server-2aht.onrender.com/api/orders/custom"),
        ]);

        const normalOrders = normalRes.data.orders || [];
        const customOrdersData = customRes.data.customOrders || [];

        setOrders(normalOrders);
        setCustomOrders(customOrdersData);

        const allUserIds = [
          ...new Set([
            ...normalOrders.map((o) => o.userId),
            ...customOrdersData.map((o) => o.userId),
          ]),
        ];
        allUserIds.forEach((id) => fetchUserName(id));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  // ✅ Product preview
  const handlePreviewOrder = async (productId) => {
    try {
      const res = await axios.get(
        `https://admin-server-2aht.onrender.com/api/products/data/${productId}`
      );
      const product = res.data;
      if (product) {
        setPreviewProduct(product);
        setProductModalOpen(true);
      } else {
        alert("Product not found");
      }
    } catch (err) {
      console.error("Error fetching product details:", err);
      alert("Failed to fetch product details");
    }
  };

  const closeProductModal = () => {
    setProductModalOpen(false);
    setPreviewProduct(null);
  };

  // ✅ Open delete confirmation modal
  const openDeleteModal = (order) => {
    setOrderToDelete(order);
    setDeleteModalOpen(true);
  };

  // ✅ Close delete modal
  const closeDeleteModal = () => {
    setOrderToDelete(null);
    setDeleteModalOpen(false);
  };

  // ✅ Confirm delete
  const confirmDelete = async () => {
    if (!orderToDelete) return;
    try {
      await axios.post(
        `https://admin-server-2aht.onrender.com/api/orders/deln/${orderToDelete._id}`
      );
      setOrders((prev) => prev.filter((o) => o._id !== orderToDelete._id));
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to delete order");
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600">Loading orders...</div>
    );

  return (
    <>
      <Navbar />

      <div className="p-6 space-y-12 max-w-7xl mx-auto">
        {/* ✅ Normal Orders */}
        <section>
          <h2 className="text-2xl font-bold text-blue-700 mb-6 uppercase tracking-widest">
            Normal Orders
          </h2>
          {orders.length === 0 && <p>No normal orders found.</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="p-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl shadow-lg transition-transform transform hover:scale-[1.03]"
              >
                <div className="space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>Order ID:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      {order._id}
                    </span>
                  </p>
                  <p>
                    <strong>User:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      {userNames[order.userId] || "Loading..."}
                    </span>
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      {order.userNumber || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      {order.userLocation || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong>Total:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      ₹{order.totalPrice}
                    </span>
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      {order.products && order.products.length > 0
                        ? order.products[0].status
                        : "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong>Custom Msg:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      {order.cmsg || "N/A"}
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <button
                    onClick={() => handlePreviewOrder(order.productId)}
                    className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-2 rounded-lg shadow"
                  >
                    <FaEye /> Preview
                  </button>

                  {/* ✅ Delete Button opens modal */}
                  <button
                    onClick={() => openDeleteModal(order)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-2 rounded-lg shadow"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ Custom Orders */}
        <section>
          <h2 className="text-2xl font-bold text-orange-700 mb-6 uppercase tracking-widest">
            Custom Orders
          </h2>
          {customOrders.length === 0 && <p>No custom orders found.</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {customOrders.map((order) => (
              <div
                key={order._id}
                className="p-6 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-xl shadow-lg transition-transform transform hover:scale-[1.03]"
              >
                <div className="space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>Custom Order ID:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      {order._id}
                    </span>
                  </p>
                  <p>
                    <strong>User:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      {userNames[order.userId] || "Loading..."}
                    </span>
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      {order.userNumber || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      {order.userLocation || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong>T-Shirt Color:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      {order.tshirtColor || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong>Total:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      ₹{order.totalPrice}
                    </span>
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="bg-pink-200 text-black rounded px-2">
                      {order.status}
                    </span>
                  </p>
                  {order.imageUrl && (
                    <img
                      src={order.imageUrl}
                      alt="Custom design"
                      className="w-32 h-32 object-cover border mt-3 rounded-lg"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ✅ Delete Confirmation Modal */}
      {deleteModalOpen && orderToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative text-center">
            <button
              onClick={closeDeleteModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
            >
              <FaTimes />
            </button>
            <FaTrashAlt className="text-red-500 text-5xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Delete this order?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to permanently delete this order?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-transform transform hover:scale-105"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-5 py-2 rounded-lg shadow transition-transform transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Product Preview Modal */}
      {productModalOpen && previewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="relative bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden animate-slide-in">
            <button
              onClick={closeProductModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-orange-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
              aria-label="Close modal"
            >
              &times;
            </button>

            {previewProduct.url && (
              <img
                src={previewProduct.url}
                alt={previewProduct.name}
                className="w-full h-48 sm:h-56 md:h-60 object-contain"
              />
            )}

            <div className="p-6 space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-center">
                {previewProduct.name}
              </h3>
              <p className="text-gray-700">
                <strong>Description:</strong> {previewProduct.desc || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Price:</strong> ₹{previewProduct.price}
              </p>
              {previewProduct.discount && (
                <p className="text-green-600 font-semibold">
                  Discount: {previewProduct.discount}
                </p>
              )}
              <p className="text-gray-700">
                <strong>Category:</strong> {previewProduct.category || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Stock:</strong> {previewProduct.stock || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPage;
