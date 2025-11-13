import React, { Suspense, useContext, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../context/Context';
import { Loader1 } from './../components/Loader/Loader';
import Card from "./Card";

const AllServices = () => {
  const { services, loading } = useContext(AuthContext);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Extract unique categories from services
  const categories = [...new Set(services.map(s => s.category).filter(Boolean))];

  useEffect(() => {
    AOS.init({ duration: 800, once: false, easing: 'ease-in-out' });
  }, []);

  useEffect(() => {
    // Apply all filters (search, category, price)
    let filtered = services;

    // Search filter (case-insensitive)
    if (searchTerm.trim()) {
      filtered = filtered.filter(service =>
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Price filter
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : 9999999;
    filtered = filtered.filter(service => {
      const price = parseFloat(service.price);
      return price >= min && price <= max;
    });

    setFilteredServices(filtered);
  }, [services, searchTerm, selectedCategory, minPrice, maxPrice]);

  // Reset all filters
  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="px-6 py-10 max-w-full sm:max-w-7xl mx-auto">
      <h1 className='text-center font-bold text-4xl mb-10 text-base-content'>Explore Home Services</h1>

      {/* Search and Filter Section */}
      <div className="mb-8 p-6 bg-base-100 border border-base-300 rounded-lg shadow-md">
        <div className='flex justify-between items-center flex-col md:flex-row'>
          {/* Search Box */}
          <div className="mb-6 w-full md:mr-2">
            <label className="block text-base-content font-semibold mb-2">Search Services</label>
            <input
              type="text"
              placeholder="Search by service name, category, or description..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full border border-base-300 rounded-lg px-4 py-2 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-6 w-full md:ml-4">
            <label className="block text-base-content font-semibold mb-2">Filter by Category</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full border border-base-300 rounded-lg px-4 py-2 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Range Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-base-content font-semibold mb-2">Min Price (৳)</label>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              className="w-full border border-base-300 rounded-lg px-4 py-2 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-base-content font-semibold mb-2">Max Price (৳)</label>
            <input
              type="number"
              placeholder="9999"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="w-full border border-base-300 rounded-lg px-4 py-2 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="btn-secondary-custom w-full"
        >
          Reset Filters
        </button>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-base-content/70">
        <p className="font-medium">Found <span className="text-primary font-bold">{filteredServices.length}</span> service(s)</p>
      </div>

      {/* Services Grid */}
      {loading && filteredServices.length === 0 ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader1 />
        </div>
      ) : (
        <Suspense fallback={<Loader1 />}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.length === 0 ? (
              <div className="col-span-full text-center text-base-content/60 font-medium py-10">
                <p className="text-lg mb-2">No services found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredServices.map((skill, index) => (
                <div key={skill._id} data-aos="zoom-in" data-aos-delay={index * 100}>
                  <Card skill={skill} />
                </div>
              ))
            )}
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default AllServices;
