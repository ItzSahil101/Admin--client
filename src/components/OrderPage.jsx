import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import Navbar from "./Navbar"; // adjust path if needed

const STATUS_OPTIONS = ["Cancelled", "Delivering", "Delivered"];

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOrderId, setModalOrderId] = useState(null);
  const [modalOrderType, setModalOrderType] = useState(null);
  const [modalCurrentStatus, setModalCurrentStatus] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const normalRes = await axios.get(
          "https://admin-server-2aht.onrender.com/api/orders/normal"
        );
        const customRes = await axios.get(
          "https://admin-server-2aht.onrender.com/api/orders/custom"
        );

        setOrders(normalRes.data.orders || []);
        setCustomOrders(customRes.data.customOrders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

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

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;

  return (
    <>
      <Navbar />

      <div className="p-6 space-y-12 max-w-6xl mx-auto">
        {/* Normal Orders */}
        <section>
          <h2 className="text-2xl font-bold text-blue-700 mb-6 uppercase tracking-widest">
            Normal Orders
          </h2>
          {orders.length === 0 && <p>No normal orders found.</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="p-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105 cursor-pointer"
                style={{ textTransform: "small-caps" }}
              >
                <p>
                  <strong>Order ID:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    {order._id}
                  </span>
                </p>
                <p>
                  <strong>User ID:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    {order.userId}
                  </span>
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    {order.userNumber || "N/A"}
                  </span>
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    {order.userLocation || "N/A"}
                  </span>
                </p>
                <p>
                  <strong>Total:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    ₹{order.totalPrice}
                  </span>
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    {order.products && order.products.length > 0
                      ? order.products[0].status
                      : "N/A"}
                  </span>
                </p>
                <p>
                  <strong>Custom Msg:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    {order.cmsg || "N/A"}
                  </span>
                </p>
                {/* <button
                  onClick={() =>
                    openModal(
                      order._id,
                      order.products && order.products.length > 0
                        ? order.products[0].status
                        : "",
                      "normal"
                    )
                  }
                  className="mt-4 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-colors px-3 py-1 rounded text-white text-sm"
                >
                  <FaPen /> Edit Status
                </button> */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customOrders.map((order) => (
              <div
                key={order._id}
                className="p-6 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg shadow-lg transform transition-transform hover:scale-105 cursor-pointer"
                style={{ textTransform: "small-caps" }}
              >
                <p>
                  <strong>Custom Order ID:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    {order._id}
                  </span>
                </p>
                <p>
                  <strong>User ID:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    {order.userId}
                  </span>
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    {order.userNumber || "N/A"}
                  </span>
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    {order.userLocation || "N/A"}
                  </span>
                </p>
                <p>
                  <strong>T-Shirt Color:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    {order.tshirtColor || "N/A"}
                  </span>
                </p>
                <p>
                  <strong>Total:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    ₹{order.totalPrice}
                  </span>
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="bg-pink-200 text-black rounded px-2 py-1">
                    {order.status}
                  </span>
                </p>

                {order.imageUrl && (
                  <img
                    src={order.imageUrl}
                    alt="Custom design"
                    className="w-32 border mt-2 rounded"
                  />
                )}
                {/* <button
                  onClick={() => openModal(order._id, order.status, "custom")}
                  className="mt-4 inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 transition-colors px-3 py-1 rounded text-white text-sm"
                >
                  <FaPen /> Edit Status
                </button> */}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modal Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 max-w-full mx-4 shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Update Order Status
            </h3>
            <div className="space-y-3">
              {STATUS_OPTIONS.map((statusOption) => (
                <button
                  key={statusOption}
                  onClick={() => handleStatusChange(statusOption)}
                  className={`w-full py-2 rounded text-white text-center
                    ${
                      statusOption === "Cancelled"
                        ? "bg-red-500 hover:bg-red-600"
                        : statusOption === "Delivering"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                    }
                    ${
                      modalCurrentStatus === statusOption
                        ? "ring-4 ring-indigo-400"
                        : ""
                    }
                  `}
                >
                  {statusOption}
                </button>
              ))}
            </div>
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-700 hover:text-gray-900 font-bold text-xl"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPage;
