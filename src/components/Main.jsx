import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPen, FaTrash, FaSpinner, FaPlus } from "react-icons/fa";
import Navbar from "./Navbar";
import EditProduct from "./EditProduct"; // existing edit modal
import AddProduct from "./AddProduct"; // your add modal component

const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <FaSpinner className="animate-spin text-orange-600 text-5xl" />
  </div>
);

export default function App() {
  const [products, setProducts] = useState([]);
  const [customProducts, setCustomProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null); // selected product for edit
  const [showAdd, setShowAdd] = useState(false); // controls AddProduct modal visibility

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const resData = await axios.get("https://admin-server-2aht.onrender.com/api/products/data");
      const resCustom = await axios.get("https://admin-server-2aht.onrender.com/api/products/custom");
      setProducts(resData.data);
      setCustomProducts(resCustom.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    try {
      await axios.delete(`https://admin-server-2aht.onrender.com/api/products/${type}/${id}`);
      await fetchAllProducts();
    } catch (err) {
      console.error("Delete error:", err);
    }
    setLoading(false);
  };

  const handleEditClick = (product, type) => {
    setEditData({ ...product, type });
  };

  const handleEditClose = () => {
    setEditData(null);
  };

  const handleEditSave = async (updatedProduct) => {
    try {
      await axios.put(
        `https://admin-server-2aht.onrender.com/api/products/${editData.type}/${editData._id}`,
        updatedProduct
      );
      await fetchAllProducts();
      setEditData(null);
    } catch (err) {
      console.error("Edit save error:", err);
      alert("Failed to update product.");
    }
  };

  // New: handle add product modal close
  const handleAddClose = () => setShowAdd(false);

  // New: after successful add, refresh list and close modal
  const handleAddSuccess = () => {
    fetchAllProducts();
    setShowAdd(false);
  };

  const renderCard = (product, type) => (
    <div
      key={product._id}
      className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
      style={{ borderRadius: "16px", width: "280px" }}
    >
      {/* Buttons */}
      <div className="absolute top-3 right-3 flex space-x-3 z-30 opacity-80 hover:opacity-100 transition-opacity">
        <button
          aria-label="Edit"
          className="bg-orange-100 p-1.5 rounded-full text-orange-600 hover:bg-orange-200 hover:text-orange-800 transition"
          onClick={() => handleEditClick(product, type)}
        >
          <FaPen size={18} />
        </button>
        <button
          aria-label="Delete"
          className="bg-red-100 p-1.5 rounded-full text-red-600 hover:bg-red-200 hover:text-red-800 transition"
          onClick={() => handleDelete(product._id, type)}
        >
          <FaTrash size={18} />
        </button>
      </div>

      <div className="w-full h-64 overflow-hidden rounded-t-xl flex justify-center items-center bg-gray-50">
        <img
          src={
            product.url ||
            "https://www.dictionary.com/e/wp-content/uploads/2020/01/Zip_Zero_Zilch_1000x700_jpg_2ZuoCxRf.jpg"
          }
          alt={product.name}
          className="object-contain w-full h-full transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col space-y-2">
        <h3 className="text-xl font-semibold text-orange-600 truncate">{product.name}</h3>
        <p className="text-gray-700 text-sm line-clamp-3">{product.desc || "No description"}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-blue-700 text-lg">
            ₹{product.price}
            {product.discount && (
              <span className="ml-2 text-sm text-orange-400 font-semibold">({product.discount} off)</span>
            )}
          </span>
          <span className="text-gray-500 text-sm">{product.category || "Uncategorized"}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Navbar />

      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Dashboard</h1>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white font-semibold rounded-md shadow-md transition"
          >
            <FaPlus />
            Add Product
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-orange-600 mb-6">All Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => renderCard(p, "data"))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-700 mb-6">Custom Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {customProducts.map((p) => renderCard(p, "custom"))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Modals */}
      {editData && (
        <EditProduct
          initialData={editData}
          onClose={handleEditClose}
          onSave={handleEditSave}
        />
      )}

      {showAdd && <AddProduct onClose={handleAddClose} onSuccess={handleAddSuccess} />}
    </div>
  );
}
