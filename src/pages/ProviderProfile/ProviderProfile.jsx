import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader1 } from "../../components/Loader/Loader";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProviderProfile = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [providerData, setProviderData] = useState(null);
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProviderData = async () => {
            setLoading(true);
            try {
                
                const decodedEmail = decodeURIComponent(email);

                
                const servicesRes = await axios.get(
                    `${import.meta.env.VITE_SERVER}/services/${decodedEmail}`
                );
                setServices(servicesRes.data || []);

                
                const bookingsRes = await axios.get(
                    `${import.meta.env.VITE_SERVER}/bookings`
                );
                
               
                const providerBookings = bookingsRes.data.filter(booking =>
                    servicesRes.data?.some(service => service._id === booking.serviceId)
                );
                setBookings(providerBookings || []);

              
                if (servicesRes.data?.length > 0) {
                    const firstService = servicesRes.data[0];
                    setProviderData({
                        name: firstService.name,
                        email: decodedEmail,
                    });
                }
            } catch (error) {
                console.error("Error fetching provider data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (email) {
            fetchProviderData();
        }
    }, [email]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <Loader1 />
            </div>
        );
    }

    if (!providerData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <div className="text-center">
                    <p className="text-base-content/60 text-lg mb-4">Provider not found</p>
                    <button 
                        onClick={() => navigate("/all-services")}
                        className="btn-primary-custom"
                    >
                        Back to Services
                    </button>
                </div>
            </div>
        );
    }

    const totalServices = services.length;
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, booking) => sum + (parseFloat(booking.price) || 0), 0);
    const avgRating = services.length > 0
        ? (services.reduce((sum, service) => sum + (service.avgRating || 0), 0) / services.length).toFixed(1)
        : 0;


    const categoryData = services.reduce((acc, service) => {
        const existing = acc.find(item => item.name === service.category);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ name: service.category, value: 1 });
        }
        return acc;
    }, []);

    const priceRangeData = services.reduce((acc, service) => {
        const price = parseFloat(service.price);
        if (price < 500) acc[0].value += 1;
        else if (price < 1000) acc[1].value += 1;
        else if (price < 2000) acc[2].value += 1;
        else acc[3].value += 1;
        return acc;
    }, [
        { name: "< ৳500", value: 0 },
        { name: "৳500-1000", value: 0 },
        { name: "৳1000-2000", value: 0 },
        { name: "> ৳2000", value: 0 },
    ]);

    const ratingDistribution = services.reduce((acc, service) => {
        const rating = Math.round(service.avgRating || 0);
        const existing = acc.find(item => item.rating === rating);
        if (existing) {
            existing.count += 1;
        } else {
            acc.push({ rating, count: 1 });
        }
        return acc;
    }, []).sort((a, b) => a.rating - b.rating);

    const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

    return (
        <div className="min-h-screen bg-base-100 py-8 px-4">
            <div className="max-w-full sm:max-w-7xl mx-auto">
          
                <div className="mb-10">
                    <button 
                        onClick={() => navigate(-1)}
                        className="mb-6 text-primary hover:text-primary/80 font-medium flex items-center gap-2"
                    >
                        ← Back
                    </button>

                    <div className="bg-base-100 rounded-2xl shadow-lg p-8 border border-base-300">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary to-purple-500 flex items-center justify-center text-4xl">
                                👨‍💼
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-base-content">{providerData.name}</h1>
                                <p className="text-base-content/60 text-lg">{providerData.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-linear-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-300/30">
                        <p className="text-base-content/70 text-sm font-medium mb-2">Total Services</p>
                        <p className="text-4xl font-bold text-blue-600">{totalServices}</p>
                        <p className="text-base-content/50 text-xs mt-2">Active listings</p>
                    </div>

                    <div className="bg-linear-to-br from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-300/30">
                        <p className="text-base-content/70 text-sm font-medium mb-2">Total Bookings</p>
                        <p className="text-4xl font-bold text-green-600">{totalBookings}</p>
                        <p className="text-base-content/50 text-xs mt-2">Service bookings</p>
                    </div>

                    <div className="bg-linear-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-6 border border-purple-300/30">
                        <p className="text-base-content/70 text-sm font-medium mb-2">Total Revenue</p>
                        <p className="text-4xl font-bold text-purple-600">৳{totalRevenue.toLocaleString()}</p>
                        <p className="text-base-content/50 text-xs mt-2">From bookings</p>
                    </div>

                    <div className="bg-linear-to-br from-yellow-500/10 to-yellow-600/10 rounded-xl p-6 border border-yellow-300/30">
                        <p className="text-base-content/70 text-sm font-medium mb-2">Avg Rating</p>
                        <p className="text-4xl font-bold text-yellow-600">{avgRating}</p>
                        <div className="flex text-yellow-500 mt-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 ${i <= Math.round(avgRating) ? "fill-current" : "text-base-300"}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.973c.3.921-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.783.57-1.838-.197-1.538-1.118l1.286-3.973a1 1 0 00-.364-1.118L2.047 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.973z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>

              
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                
                    <div className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300">
                        <h3 className="text-xl font-bold text-base-content mb-6">Services by Category</h3>
                        {categoryData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name} (${value})`}
                                        outerRadius={100}
                                        fill="#8b5cf6"
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-base-content/60 text-center py-12">No category data available</p>
                        )}
                    </div>

                    <div className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300">
                        <h3 className="text-xl font-bold text-base-content mb-6">Services by Price Range</h3>
                        {priceRangeData.some(item => item.value > 0) ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={priceRangeData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-base-content/60 text-center py-12">No price data available</p>
                        )}
                    </div>

                
                    <div className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300">
                        <h3 className="text-xl font-bold text-base-content mb-6">Rating Distribution</h3>
                        {ratingDistribution.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={ratingDistribution}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis 
                                        dataKey="rating" 
                                        label={{ value: 'Rating', position: 'insideBottomRight', offset: -5 }}
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-base-content/60 text-center py-12">No rating data available</p>
                        )}
                    </div>

                    {/* Services List */}
                    <div className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300">
                        <h3 className="text-xl font-bold text-base-content mb-6">Services Overview</h3>
                        <div className="space-y-4 max-h-[350px] overflow-y-auto">
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <div 
                                        key={service._id} 
                                        className="p-4 bg-base-200 rounded-lg hover:bg-base-300 transition cursor-pointer"
                                        onClick={() => navigate(`/service/${service._id}`)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="font-semibold text-base-content">{service.serviceName}</p>
                                                <p className="text-sm text-base-content/60">{service.category}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-green-600">৳{service.price}</p>
                                                <p className="text-sm text-yellow-500 flex items-center justify-end gap-1">
                                                    ⭐ {service.avgRating?.toFixed(1) || "0.0"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-base-content/60 text-center py-8">No services available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;
