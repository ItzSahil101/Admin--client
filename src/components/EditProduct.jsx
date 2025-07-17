import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function EditProduct({ initialData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    url: initialData.url || "",
    name: initialData.name || "",
    desc: initialData.desc || "",
    price: initialData.price || "",
    discount: initialData.discount || "",
    category: initialData.category || "",
    stock: initialData.stock || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-blue-300 w-full max-w-5xl p-6 sm:p-10 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <FaTimes size={22} />
        </button>

        <h2 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-2">
          Update Product Details
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { key: "url", label: "Image URL", type: "text" },
              { key: "name", label: "Product Name", type: "text" },
              { key: "desc", label: "Description", type: "text" },
              { key: "price", label: "Price", type: "number" },
              { key: "discount", label: "Discount", type: "text" },
              { key: "category", label: "Category", type: "text" },
              { key: "stock", label: "Stock", type: "number" },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder:text-gray-400"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-8 gap-4 flex-wrap">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md border border-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white font-semibold rounded-md shadow-md transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
