"use client";
import React, { useState } from "react";
import axios from "axios";

const ModalForm = ({ isOpen, item, onClose }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [formValues, setFormValues] = useState({ quantity: 1, type: "veg" });
  const [loading, setLoading] = useState(false);

  // Function to calculate the total price
  const calculatePrice = (quantity, type) => {
    const basePrice = 10;
    const typePrices = { veg: 20, chicken: 30, pork: 40 };
    return quantity * (basePrice + (typePrices[type] || 0));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);

    // Update price
    setTotalPrice(calculatePrice(Number(updatedValues.quantity) || 1, updatedValues.type));
  };

  // Submit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      item,
      quantity: Number(formValues.quantity),
      type: formValues.type,
      totalPrice,
    };

    try {
      await axios.post("/api/addtocart", payload);
      alert("Item added to cart!");
      onClose();
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex flex-col items-center">
          {item?.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
          )}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Add {item?.name} to Cart
          </h3>
          <p className="text-sm text-gray-500 mb-4">Category: {item?.category}</p>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-gray-700 font-medium mb-2"
            >
              Enter Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={formValues.quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter quantity"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Select Type</label>
            <div className="flex space-x-4">
              {["veg", "chicken", "pork"].map((typeOption) => (
                <label key={typeOption} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value={typeOption}
                    checked={formValues.type === typeOption}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <span>{typeOption.charAt(0).toUpperCase() + typeOption.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
          <p className="text-green-600 font-semibold mb-4">
            Total Price: ₹{totalPrice}
          </p>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
