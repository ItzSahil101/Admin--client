import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductTable({ type }) {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    name: "",
    desc: "",
    price: "",
    discount: "",
    category: "",
    stock: "", // Added stock here
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:6000/api/products/${type}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [type]);

  // Open modal and prefill form
  const openEditModal = (product) => {
    setEditProduct(product);
    setFormData({
      url: product.url || "",
      name: product.name || "",
      desc: product.desc || "",
      price: product.price || "",
      discount: product.discount || "",
      category: product.category || "",
      stock: product.stock || "", // Include stock
    });
  };

  // Close modal
  const closeEditModal = () => {
    setEditProduct(null);
    setFormData({
      url: "",
      name: "",
      desc: "",
      price: "",
      discount: "",
      category: "",
      stock: "", // Reset stock
    });
  };

  // Form change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editProduct) return;
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:6000/api/products/${type}/${editProduct._id}`,
        formData
      );

      // Update local UI
      setProducts((prev) =>
        prev.map((p) => (p._id === editProduct._id ? { ...p, ...formData } : p))
      );

      closeEditModal();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update product.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 capitalize">{type} Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-orange-200 text-gray-800">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="text-center border-t">
                <td className="px-4 py-2">
                  <img
                    src={product.url}
                    alt={product.name}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.desc}</td>
                <td className="px-4 py-2">₹{product.price}</td>
                <td className="px-4 py-2">{product.discount}%</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Edit Product
            </h3>

            {["url", "name", "desc", "price", "discount", "category", "stock"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "price" || field === "discount" || field === "stock" ? "number" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              )
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeEditModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 rounded"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
