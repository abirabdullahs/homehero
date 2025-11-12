import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/Context";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

const ServiceDetails = () => {

    const [own, setOwn] = useState(false);
    const [booked, setBooked] = useState(false);



    const { id } = useParams();
    const { user, services } = useContext(AuthContext);

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

        const fetchBookings = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER}/bookings/${user.email}`);
                console.log(res);

                if (res.data) setBookings(res.data)

            } catch (err) {
                console.error("Error fetching bookings:", err);
            }
        };

        fetchBookings();
    }, [user])


    useEffect(() => {
        if (service && bookings.length > 0) {
            const isBooked = bookings.find(item => item.serviceId === service._id);
            setBooked(!!isBooked);
        }
    }, [bookings, service]);


    if (!service) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500 text-lg">service not found</p>
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* ✅ Service Image */}
                {service?.imageUrl && (
                    <img
                        src={service?.imageUrl}
                        alt={service.serviceName}
                        className="w-full h-80 object-cover"
                    />
                )}

                {/* ✅ Service Details */}
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        {service?.serviceName}
                    </h1>
                    <p className="text-gray-600 mb-4">{service?.description}</p>
                    <p className="text-lg font-semibold text-green-600 mb-6">
                        ৳{service?.price}
                    </p>

                    {/* ✅ Conditional button */}
                    {!own && !booked && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200"
                        >
                            Book This Service
                        </button>
                    )}

                    {/* ✅ Already booked message */}
                    {booked && (
                        <p className="text-green-600 font-medium mt-2">
                            ✅ You have already booked this service.
                        </p>
                    )}

                    {/* ✅ Owner message */}
                    {own && (
                        <p className="text-gray-500 font-medium mt-2">
                            🧑‍💼 You are the owner of this service.
                        </p>
                    )}
                </div>
            </div>

            {/* ✅ Booking Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative animate-fadeIn">

                        {/* ✅ Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                            Book This Service
                        </h2>

                        {/* ✅ Booking Form */}
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Service ID
                                </label>
                                <input
                                    type="text"
                                    value={service._id || ""}
                                    readOnly
                                    className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Booking Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price
                                </label>
                                <input
                                    type="text"
                                    value={service.price || ""}
                                    readOnly
                                    className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition"
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
