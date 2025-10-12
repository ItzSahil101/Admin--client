import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

export default function AddProduct({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    url: "",
    name: "",
    desc: "",
    price: "",
    discount: "",
    category: "ALL",
    stock: "",
  });

  const [productType, setProductType] = useState("custom");

  // When productType changes, update category accordingly
  useEffect(() => {
    if (productType === "custom") {
      // auto set category to 'custom' and clear input field value for category
      setFormData((prev) => ({ ...prev, category: "custom" }));
    } else {
      // reset category for normal product (empty or default to first dropdown option)
      setFormData((prev) => ({ ...prev, category: "tech" }));
    }
  }, [productType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      url:
        formData.url.trim() === ""
          ? "https://www.dictionary.com/e/wp-content/uploads/2020/01/Zip_Zero_Zilch_1000x700_jpg_2ZuoCxRf.jpg"
          : formData.url,
    };

    try {
      await axios.post(
        `https://admin-server-2aht.onrender.com/api/products/${productType}`,
        finalData
      );
      onSuccess(); // refresh list
      onClose(); // close modal
    } catch (err) {
      alert("Failed to create product.");
      console.error(err);
    }
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
          Create New Product
        </h2>

        {/* Type Selector */}
        <div className="mb-6 flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="data"
              checked={productType === "data"}
              onChange={() => setProductType("data")}
            />
            <span className="text-sm font-medium text-gray-700">Normal</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="custom"
              checked={productType === "custom"}
              onChange={() => setProductType("custom")}
            />
            <span className="text-sm font-medium text-gray-700">Custom</span>
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { key: "url", label: "Image URL (optional)", type: "text" },
              { key: "name", label: "Product Name", type: "text" },
              { key: "desc", label: "Description", type: "text" },
              { key: "price", label: "Price", type: "number" },
              { key: "discount", label: "Discount", type: "text" },
              // category will be special case below
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
                  required={true}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder:text-gray-400"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}

            {/* Category field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>

              {productType === "custom" ? (
                // If custom, fixed category (readonly input)
                <input
                  type="text"
                  name="category"
                  value="custom"
                  readOnly
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              ) : (
                // If normal, dropdown select
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                >
                  <option value="ALL">All</option>
                  <option value="ALL">ALL</option>
                  <option value="ALL">ALL</option>
                </select>
              )}
            </div>
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
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
