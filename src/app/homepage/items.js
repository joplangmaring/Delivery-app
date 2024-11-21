"use client";
import React, { useState } from "react";
import Image from "next/image"; // Import the Image component
import ModalForm from "../helper/chickenform";

// Import items array from the new file
import items from "../helper/itemdata"; // Adjust the path as needed

const Items = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleModalSubmit = (data) => {
    console.log("Submitted Data:", data);
    closeModal();
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
          Our Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={400} // Specify width
                height={256} // Specify height
                className="w-full h-64 object-cover"
                priority
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <button
                  className="px-4 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition duration-300"
                  onClick={() => openModal(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form */}
        <ModalForm
          isOpen={isModalOpen}
          item={selectedItem}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      </div>
    </section>
  );
};

export default Items;
