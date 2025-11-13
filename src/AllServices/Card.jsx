import React from "react";
import { Link } from "react-router-dom";

const Card = ({ skill }) => {
 
  const avgRating = skill.avgRating ? skill.avgRating.toFixed(1) : "0.0";

  return (
    <div
      className="group bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-base-300"
      data-aos="fade-up"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={skill.imageUrl || "https://i.postimg.cc/3JN5Kc5Q/default-avatar.png"}
          alt={skill.serviceName}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
        <p className="absolute bottom-2 left-3 text-sm bg-purple-600 text-white px-3 py-1 rounded-full shadow-md">
          {skill.category || "Category"}
        </p>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between h-[280px]">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-base-content">
            {skill.serviceName || "Service Name"}
          </h3>

          {/* Description with fixed height */}
          <p className="text-base-content/60 text-sm mb-3 h-16 overflow-hidden line-clamp-3">
            {skill.description || "Short description..."}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400 mr-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${i <= Math.round(avgRating) ? "fill-current" : "text-base-300"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.973c.3.921-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.783.57-1.838-.197-1.538-1.118l1.286-3.973a1 1 0 00-.364-1.118L2.047 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.973z" />
                </svg>
              ))}
            </div>
            <span className="text-base-content/70 text-sm">{avgRating}</span>
          </div>

          <div className="flex justify-between items-center text-sm text-base-content/70 mb-3">
            <span className="font-semibold text-primary">৳ {skill.price || "N/A"}</span>
            <span className="text-base-content/60">{skill.name || "Provider"}</span>
          </div>
        </div>

        {/* Button */}
        <Link to={`/service/${skill._id}`}>
          <button className="btn-primary-custom w-full">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
