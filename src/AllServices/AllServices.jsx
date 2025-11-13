import React, { Suspense, useContext, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../context/Context';
import { Loader1 } from './../components/Loader/Loader';
import Card from "./Card";
import axios from 'axios';

const AllServices = () => {
  const { services, loading } = useContext(AuthContext);
  const [filteredServices, setFilteredServices] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterLoading, setFilterLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: false, easing: 'ease-in-out' });
  }, []);

  useEffect(() => {
    // Show all services initially
    setFilteredServices(services);
  }, [services]);

  const handleFilter = async () => {
    setFilterLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER}/services`, {
        params: { 
          minPrice: minPrice || 0, 
          maxPrice: maxPrice || 9999999 
        }
      });
      setFilteredServices(res.data);
    } catch (err) {
      console.error(err);
    }
    setFilterLoading(false);
  };

  return (
    <div className="px-6 py-10">
      <h1 className='text-center font-bold text-4xl mb-10'>Explore Home Services</h1>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 items-center">
        <div className="flex gap-2 items-center">
          <label className="font-semibold text-base-content">Min Price:</label>
          <input 
            type="number"
            className="border border-base-300 rounded-lg px-3 py-1 w-24 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-semibold text-base-content">Max Price:</label>
          <input 
            type="number"
            className="border border-base-300 rounded-lg px-3 py-1 w-24 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="9999"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
          />
        </div>
        <button 
          onClick={handleFilter}
          className="btn-primary-custom"
        >
         Filter
        </button>
      </div>

      {/* Services Grid */}
      {loading && filteredServices.length === 0 ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader1 />
        </div>
      ) : (
        <Suspense fallback={<Loader1 />}>
          {filterLoading ? (
            <div className="text-center font-semibold text-lg">Loading filtered services...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 font-medium py-10">
                  No services found in this price range.
                </div>
              ) : (
                filteredServices.map((skill, index) => (
                  <div key={skill._id} data-aos="zoom-in" data-aos-delay={index * 100}>
                    <Card skill={skill} />
                  </div>
                ))
              )}
            </div>
          )}
        </Suspense>
      )}
    </div>
  );
};

export default AllServices;
