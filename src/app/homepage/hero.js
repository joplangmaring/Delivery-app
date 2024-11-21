import React from "react";
import Image from "next/image";
import deliver from "../../../public/deli.png";

const Hero = () => {
  return (
    <section>
    <div className="flex flex-col lg:flex-row items-center justify-between px-6 py-12 lg:py-20 bg-gradient-to-r from-orange-100 via-white to-orange-50 shadow-md rounded-lg">
      {/* Text Section */}
      <div className="lg:w-1/2 text-center lg:text-left space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold text-orange-600">
          Roi Ryngkat Are Ready to Deliver Your Goods
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          veritatis fugiat culpa, dolorum, incidunt quas illum consequatur nisi,
          quis minus eveniet iste temporibus minima vitae. Ad facilis nobis
          dignissimos incidunt!
        </p>
        <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300">
          Get Started
        </button>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
        <Image
          src={deliver}
          alt="Delivery"
          className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>
    </div>
    </section>

  );
};

export default Hero;
