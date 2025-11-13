import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ skill }) => {

  const Navigate = useNavigate();
  return (
    <div
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
      data-aos="fade-up"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={skill.imageUrl || "https://i.postimg.cc/3JN5Kc5Q/default-avatar.png"}
          alt={skill.serviceName}
          className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-lineart-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
        <p className="absolute bottom-2 left-3 text-sm bg-purple-600 text-white px-3 py-1 rounded-full shadow-md">
          {skill.category || "Category"}
        </p>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-1 text-gray-800">
          {skill.serviceName || "Service Name"}
        </h3>
        <p className="text-gray-500 text-sm mb-3">{skill.description?.slice(0, 60) || "Short description..."}</p>

        <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
          <span className="font-semibold text-purple-600">৳ {skill.price || "N/A"}</span>
          <span className="text-gray-500">{skill.name || "Provider"}</span>
        </div>

        <Link to={`/service/${skill._id}`}>
          <button className="block w-full text-center bg-linear-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-xl font-medium hover:from-purple-700 hover:to-blue-600 transition-all duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
