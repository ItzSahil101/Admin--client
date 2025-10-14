// src/components/OrderPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPen, FaEye } from "react-icons/fa";
import Navbar from "./Navbar"; // adjust path if needed

const STATUS_OPTIONS = ["Cancelled", "Delivering", "Delivered"];

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);
  const [userNames, setUserNames] = useState({}); // ✅ store userId -> name map
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOrderId, setModalOrderId] = useState(null);
  const [modalOrderType, setModalOrderType] = useState(null);
  const [modalCurrentStatus, setModalCurrentStatus] = useState("");

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);

 // ✅ Function to fetch username by userId
const fetchUserName = async (userId) => {
  if (!userId || userNames[userId]) return; // avoid refetching

  try {
    const res = await axios.get(
      `https://admin-server-2aht.onrender.com/api/products/data/user/${userId}`
    );

    if (res.data && res.data.userName) {
      setUserNames((prev) => ({ ...prev, [userId]: res.data.userName }));
    } else {
      setUserNames((prev) => ({ ...prev, [userId]: userId })); // fallback
    }
  } catch (err) {
    console.error("Error fetching user name:", err);
    setUserNames((prev) => ({ ...prev, [userId]: userId })); // fallback
  }
};


  // Fetch orders
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

        // ✅ fetch usernames for all userIds
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

  // Status modal handlers
  const openModal = (id, currentStatus, type) => {
    setModalOrderId(id);
    setModalOrderType(type);
    setModalCurrentStatus(currentStatus);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalOrderId(null);
    setModalOrderType(null);
    setModalCurrentStatus("");
  };

  const handleStatusChange = async (newStatus) => {
    if (!modalOrderId) return;
    try {
      await axios.put(
        `https://admin-server-2aht.onrender.com/api/orders/${modalOrderType}/${modalOrderId}`,
        { status: newStatus }
      );

      if (modalOrderType === "custom") {
        setCustomOrders((prev) =>
          prev.map((order) =>
            order._id === modalOrderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        setOrders((prev) =>
          prev.map((order) => {
            if (order._id === modalOrderId) {
              const updatedProducts = [...(order.products || [])];
              if (updatedProducts.length > 0)
                updatedProducts[0].status = newStatus;
              return { ...order, products: updatedProducts };
            }
            return order;
          })
        );
      }
      closeModal();
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
    }
  };

  // Product preview modal handlers
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

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600">Loading orders...</div>
    );

  return (
    <>
      <Navbar />

      <div className="p-6 space-y-12 max-w-7xl mx-auto">
        {/* Normal Orders */}
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
                    <FaEye /> Preview Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Orders */}
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

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <button
                    onClick={() => handlePreviewOrder(order.productId)}
                    className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-2 rounded-lg shadow"
                  >
                    <FaEye /> Preview Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Product Preview Modal */}
     {/* Product Preview Modal */}
{productModalOpen && previewProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-auto">
    <div className="relative bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden animate-slide-in">
      {/* Close Button */}
      <button
        onClick={closeProductModal}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-700 hover:text-gray-900 font-bold text-3xl sm:text-4xl transition-transform transform hover:scale-110"
        aria-label="Close modal"
      >
        &times;
      </button>

      {/* Product Image */}
      {previewProduct.url && (
        <img
          src={previewProduct.url}
          alt={previewProduct.name}
          className="w-full h-64 sm:h-72 md:h-80 object-cover"
        />
      )}

      {/* Product Info */}
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
