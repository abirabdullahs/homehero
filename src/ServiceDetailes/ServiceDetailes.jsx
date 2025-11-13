import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/Context";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { Loader1 } from "../components/Loader/Loader";

const ServiceDetails = () => {

    const [own, setOwn] = useState(false);
    const [booked, setBooked] = useState(false);



    const { id } = useParams();
    const { user, services, fetchBookingsByEmail } = useContext(AuthContext);

    const [service, setService] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingDate, setBookingDate] = useState("");

    useEffect(() => {
        if (user && service) {
            setOwn(user.email === service.email);
        }
    }, [user, service]);


    // Find the service when services or id change
    useEffect(() => {
        if (services?.length) {
            const foundService = services.find((item) => item._id.toString() === id);
            setService(foundService || null);
        }
    }, [services, id]);



    useEffect(() => {
        if (!user) return;

        let mounted = true;
        const load = async () => {
            try {
                const data = await fetchBookingsByEmail(user.email);
                if (mounted) setBookings(data || []);
            } catch (err) {
                console.error("Error fetching bookings:", err);
            }
        };

        load();

        return () => {
            mounted = false;
        };
    }, [user, fetchBookingsByEmail]);


    useEffect(() => {
        if (service && bookings.length > 0) {
            const isBooked = bookings.find(item => item.serviceId === service._id);
            setBooked(!!isBooked);
        }
    }, [bookings, service]);


    if (!service) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-base-100">
                <p className="text-base-content/60 text-lg">service not found</p>
            </div>
        );


    }

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const bookingData = {
            userEmail: user.email,
            serviceId: service._id,
            bookingDate,
            price: service.price,
        };
        // console.log("Booking Confirmed:", bookingData);
        toast("✅ Booking Confirmed Successfully!");
        setIsModalOpen(false);
        setBookingDate("");

        try {
            //
            const result = await axios.post(`${import.meta.env.VITE_SERVER}/bookings`, bookingData)
            console.log(result);
            e.target.reset();

            toast("your booking is completed")

        } catch (error) {
            console.log(error);
        }


        // let content;

        // if(own){
        //     content = 
        // }

    };

    return (
        <div className="min-h-screen bg-base-100 py-8 px-4">
            <div className="max-w-full sm:max-w-6xl mx-auto">
                {/* ✅ Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ✅ LEFT SIDE: SERVICE DETAILS */}
                    <div className="lg:col-span-2">
                        {/* Service Image */}
                        <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden border border-base-300 mb-6">
                            {service?.imageUrl && (
                                <img
                                    src={service?.imageUrl}
                                    alt={service.serviceName}
                                    className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            )}
                        </div>

                        {/* Service Title & Description */}
                        <div className="bg-base-100 rounded-2xl shadow-lg p-8 border border-base-300 mb-6">
                            <h1 className="text-4xl font-bold text-base-content mb-4">
                                {service?.serviceName}
                            </h1>
                            <div className="mb-6">
                                <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                                    {service?.category || "Category"}
                                </span>
                            </div>
                            <p className="text-base-content/70 text-lg leading-relaxed mb-6">
                                {service?.description}
                            </p>

                            {/* Price & Rating */}
                            <div className="flex items-center gap-8 py-6 border-t border-b border-base-300">
                                <div>
                                    <p className="text-sm text-base-content/60 mb-2">Price</p>
                                    <p className="text-3xl font-bold text-green-500">
                                        ৳{service?.price}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-base-content/60 mb-2">Rating</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex text-yellow-400">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <svg
                                                    key={i}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className={`h-5 w-5 ${i <= Math.round(service?.avgRating) ? "fill-current" : "text-base-300"}`}
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.973c.3.921-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.783.57-1.838-.197-1.538-1.118l1.286-3.973a1 1 0 00-.364-1.118L2.047 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.973z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-base-content font-semibold ml-2">
                                            {service?.avgRating?.toFixed(1) || "0.0"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Button */}
                            <div className="mt-8">
                                {!own && !booked && (
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="btn-primary-custom w-full text-lg py-4 px-8 justify-center"
                                    >
                                        📅 Book This Service
                                    </button>
                                )}

                                {booked && (
                                    <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-4 text-center">
                                        <p className="text-green-600 font-bold text-lg">
                                            ✅ You have already booked this service
                                        </p>
                                    </div>
                                )}

                                {own && (
                                    <div className="bg-blue-500/20 border-2 border-blue-500 rounded-xl p-4 text-center">
                                        <p className="text-blue-600 font-bold text-lg">
                                            🧑‍💼 You are the owner of this service
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Provider Info */}
                        <div className="bg-linear-to-br from-primary/10 to-purple-500/10 rounded-2xl shadow-lg p-8 border border-primary/30">
                            <h3 className="text-xl font-bold text-base-content mb-4">About Service Provider</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="text-3xl">👤</span>
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-base-content">{service?.name}</p>
                                    <p className="text-base-content/60">{service?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                   
                    <div className="lg:col-span-1">
                        {/* Rating Card */}
                        <div className="bg-linear-to-br from-yellow-400/20 to-yellow-500/20 rounded-2xl shadow-lg p-6 border border-yellow-400/30 mb-6 top-8">
                            <h3 className="text-lg font-bold text-base-content mb-4 text-center">Overall Rating</h3>
                            <div className="text-center mb-4">
                                <p className="text-5xl font-bold text-primary mb-2">
                                    {service?.avgRating?.toFixed(1) || "0.0"}
                                </p>
                                <p className="text-sm text-base-content/60">out of 5 stars</p>
                            </div>
                            <div className="flex justify-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-6 w-6 ${i <= Math.round(service?.avgRating) ? "text-yellow-400 fill-current" : "text-base-300"}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.973c.3.921-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.783.57-1.838-.197-1.538-1.118l1.286-3.973a1 1 0 00-.364-1.118L2.047 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.973z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-xs text-base-content/60 text-center">
                                {service?.reviews?.length || 0} review{(service?.reviews?.length || 0) !== 1 ? 's' : ''}
                            </p>
                        </div>

                        {/* Reviews List */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-base-content mb-4">Reviews</h3>
                            
                            {service?.reviews && service.reviews.length > 0 ? (
                                service.reviews.map((review, index) => (
                                    <div key={index} className="bg-base-100 rounded-xl shadow-md p-5 border border-base-300 hover:shadow-lg transition-shadow duration-300">
                                        {/* User Email */}
                                        <div className="flex items-start justify-between mb-3">
                                            <p className="font-semibold text-base-content text-sm break-all">{review.userEmail}</p>
                                            <span className="text-xs text-base-content/50 whitespace-nowrap ml-2">
                                                {new Date(review.createdAt).toLocaleDateString('en-US', { 
                                                    year: 'numeric', 
                                                    month: 'short', 
                                                    day: 'numeric'    
                                                })}
                                            </span>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex gap-1 mb-3">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <svg
                                                    key={i}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className={`h-4 w-4 ${i <= review.rating ? "text-yellow-400 fill-current" : "text-base-300"}`}
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.973c.3.921-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.783.57-1.838-.197-1.538-1.118l1.286-3.973a1 1 0 00-.364-1.118L2.047 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.973z" />
                                                </svg>
                                            ))}
                                            <span className="text-xs font-semibold text-base-content ml-1">({review.rating})</span>
                                        </div>

                                        {/* Comment */}
                                        <p className="text-base-content/70 text-sm leading-relaxed">
                                            {review.comment}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-base-100 rounded-xl shadow-md p-8 text-center border border-dashed border-base-300">
                                    <p className="text-base-content/60 text-lg">⭐ No reviews yet</p>
                                    <p className="text-base-content/50 text-sm mt-2">Be the first to share your experience!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Booking Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-base-100 rounded-2xl shadow-xl p-6 w-full max-w-md relative animate-fadeIn border border-base-300">

                        {/* ✅ Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-4 text-base-content/60 hover:text-base-content text-xl font-bold"
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-bold text-base-content mb-4 text-center">
                            Book This Service
                        </h2>

                        {/* ✅ Booking Form */}
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-base-content mb-1">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="w-full border border-base-300 rounded-lg px-3 py-2 bg-base-200 text-base-content"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-1">
                                    Service ID
                                </label>
                                <input
                                    type="text"
                                    value={service._id || ""}
                                    readOnly
                                    className="w-full border border-base-300 rounded-lg px-3 py-2 bg-base-200 text-base-content"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-1">
                                    Booking Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    className="w-full border border-base-300 rounded-lg px-3 py-2 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-1">
                                    Price
                                </label>
                                <input
                                    type="text"
                                    value={service.price || ""}
                                    readOnly
                                    className="w-full border border-base-300 rounded-lg px-3 py-2 bg-base-200 text-base-content"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary-custom w-full py-2.5 px-4 justify-center"
                            >
                                Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

};

export default ServiceDetails;
