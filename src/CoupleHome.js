import React from "react";
import { useNavigate } from "react-router-dom";

export default function CoupleHome() {
  const navigate = useNavigate();

  const services = [
    { name: "Venue", icon: "/icons/venue.png" },
    { name: "Catering", icon: "/icons/catering.png" },
    { name: "Photography", icon: "/icons/photography.png" },
    { name: "Beauty & Wellness", icon: "/icons/beauty.png" },
    { name: "Designer", icon: "/icons/designer.png" },
    { name: "Jewelry", icon: "/icons/jewellery.png" },
    { name: "Car Dealers", icon: "/icons/car.png" },
    { name: "Events", icon: "/icons/event.png" },
  ];

  return (
    <div
    className="min-h-screen flex items-center justify-center bg-pink-100"
    style={{ backgroundImage: "url('/bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
  >
       {/* Header */}
       <header className="bg-orange-300 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10 shadow-lg">
          <img src="WEDNEST_LOGO.png" alt="WedNest Logo" className="h-24 w-auto" />
          <div className="flex gap-6">
          <button onClick={() => navigate("/couple-home")} className="text-lg">Home</button>
            <span className="text-lg">🛒</span>
            <span className="text-lg">👤</span>
          </div>
        </header>

        {/* Services Section */}
        <div className="pt-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">SERVICES</h2>
        <div className="max-w-screen-lg mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {services.map((service) => (
            <div key={service.name} className="flex flex-col items-center">
                <img
                src={service.icon}
                alt={service.name}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
                />
                <p className="text-lg font-semibold mt-2">{service.name}</p>
            </div>
            ))}
        </div>
        </div>


      



      </div>
  );
}
