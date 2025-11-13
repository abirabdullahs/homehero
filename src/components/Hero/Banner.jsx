// HeroBanner.jsx
import React from "react";

const HeroBanner = ({
  imageUrl = "https://via.placeholder.com/1200x600",
  title = "Transform Your Home Services",
  subtitle = "Find the best professionals for cleaning, repairs, and more.",
  buttonText = "Get Started",
  onButtonClick = null,
}) => {
  return (
    <section className="relative w-full h-[600px] sm:h-[650px] md:h-[700px] lg:h-[750px] overflow-hidden">
      
      <div
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

   
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/50"></div>


      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 animate-fadeInDown">
          {title}
        </h1>
  <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-8 max-w-full sm:max-w-3xl animate-fadeInUp">
          {subtitle}
        </p>
        {onButtonClick ? (
          <button
            onClick={onButtonClick}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            {buttonText}
          </button>
        ) : (
          <a
            href="#services"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            {buttonText}
          </a>
        )}
      </div>

      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-white/0 to-white/20 pointer-events-none"></div>
    </section>
  );
};

export default HeroBanner;
