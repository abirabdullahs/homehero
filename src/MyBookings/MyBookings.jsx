import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Context';
import { Loader1 } from '../components/Loader/Loader';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyBookings = () => {


    const { user, services, fetchBookingsByEmail } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true); // Local loading state


    const handleCancel = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This bookings will be cenceled.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_SERVER}/bookings/${id}`);
                setBookings((prev) => prev.filter((s) => s._id !== id));

                Swal.fire("Deleted!", "Your service has been removed.", "success");
            } catch (err) {
                toast.error("Failed to delete. Please try again.");
                console.error(err);
            }
        }
    };



    const [rating, setRating] = useState(0);
    const [currentServiceId, setCurrentServiceId] = useState(null);

    const handleChange = (e) => {
        setRating(parseInt(e.target.value));
    };



    const handleReview = async (e, id) => {
        e.preventDefault();

        const reviewText = e.target.review.value;


        try {
            await axios.post(`${import.meta.env.VITE_SERVER}/services/${id}/review`, {
                rating,
                comment: reviewText,
                userEmail : user.email
            });

            toast.success("Review submitted successfully!");
            e.target.reset(); // clear textarea
            setRating(0); // reset stars
            setCurrentServiceId(null);
            document.getElementById('my_modal_5').close();
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit review. Try again.");
        }



    }


    useEffect(() => {
        let mounted = true;
        if (!user?.email) return;

        const load = async () => {
            setLoading(true);
            try {
                const data = await fetchBookingsByEmail(user.email);
                if (mounted) setBookings(data || []);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                if (mounted) setBookings([]);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        load();

        return () => {
            mounted = false;
        };
        // fetchBookingsByEmail is a stable reference from context, safe to omit from deps
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.email]);


    if (loading) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center">
                <Loader1 />
            </div>
        );
    }

    return (
        <div>
            {/* Desktop/tablet: table view */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-base-300 shadow-md mb-10">
                <table className="table w-full">
                    <thead className="bg-base-200 text-base-content font-semibold">
                        <tr>
                            <th>#</th>
                            <th>Service Name</th>
                            <th>Category</th>
                            <th>Price (৳)</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings && bookings.length > 0 ? (
                            bookings.map((b, index) => {
                                const serviceInfo = services?.find(s => s._id === b.serviceId);

                                return (
                                    <tr key={b._id} className="hover:bg-gray-50 transition duration-150">
                                        <td>{index + 1}</td>
                                        <td className="font-medium">{serviceInfo?.serviceName || "N/A"}</td>
                                        <td>{serviceInfo?.category || "N/A"}</td>
                                        <td>{serviceInfo?.price || "N/A"}</td>
                                        <td>
                                            <div className="flex justify-center gap-2">
                                                <button className="btn-danger-custom btn-sm" onClick={() => handleCancel(b._id)}>Cancel</button>
                                                <button className="btn-primary-custom btn-sm" onClick={() => {
                                                    setCurrentServiceId(b.serviceId);
                                                    document.getElementById('my_modal_5').showModal();
                                                }}>Review</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-base-content/60">
                                    No bookings found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile: stacked bookings */}
            <div className="md:hidden space-y-4">
                {!bookings || bookings.length === 0 ? (
                    <div className="p-4 bg-base-100 border border-base-300 rounded-lg text-center text-base-content/70">No bookings found.</div>
                ) : (
                    bookings.map((b, idx) => {
                        const serviceInfo = services?.find(s => s._id === b.serviceId);
                        return (
                            <div key={b._id} className="p-4 bg-base-100 border border-base-300 rounded-lg shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="text-sm text-base-content/70">#{idx + 1}</div>
                                        <h3 className="font-semibold text-base-content">{serviceInfo?.serviceName || "Service"}</h3>
                                        <div className="text-sm text-base-content/60">{serviceInfo?.category || "N/A"}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-primary font-semibold">৳ {serviceInfo?.price || "N/A"}</div>
                                    </div>
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <button className="btn-danger-custom btn-sm flex-1" onClick={() => handleCancel(b._id)}>Cancel</button>
                                    <button className="btn-primary-custom btn-sm flex-1" onClick={() => {
                                        setCurrentServiceId(b.serviceId);
                                        document.getElementById('my_modal_5').showModal();
                                    }}>Review</button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>


            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="max-w-full sm:max-w-md mx-auto bg-base-100 shadow-lg rounded-xl p-6 border border-base-300">
                        <h2 className="text-2xl font-semibold text-base-content mb-4">
                            Submit Your Review
                        </h2>

                        {/* Rating Input */}
                        <div className="mb-4">
                                <label className="block text-base-content font-medium mb-2">
                                Your Rating
                            </label>
                            <div className="rating rating-lg mb-4">
                                <input
                                    type="radio"
                                    name="rating"
                                    value={1}
                                    className="mask mask-star-2"
                                    aria-label="1 star"
                                    checked={rating === 1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="radio"
                                    name="rating"
                                    value={2}
                                    className="mask mask-star-2"
                                    aria-label="2 star"
                                    checked={rating === 2}
                                    onChange={handleChange}
                                />
                                <input
                                    type="radio"
                                    name="rating"
                                    value={3}
                                    className="mask mask-star-2"
                                    aria-label="3 star"
                                    checked={rating === 3}
                                    onChange={handleChange}
                                />
                                <input
                                    type="radio"
                                    name="rating"
                                    value={4}
                                    className="mask mask-star-2"
                                    aria-label="4 star"
                                    checked={rating === 4}
                                    onChange={handleChange}
                                />
                                <input
                                    type="radio"
                                    name="rating"
                                    value={5}
                                    className="mask mask-star-2"
                                    aria-label="5 star"
                                    checked={rating === 5}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Review Textarea */}
                        <form onSubmit={(e) => handleReview(e,currentServiceId)}>
                            <div className="mb-4">
                                <label className="block text-base-content font-medium mb-2">
                                    Your Review
                                </label>
                                <textarea
                                    className="w-full p-3 border rounded-lg border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                                    rows={4}
                                    placeholder="Write your experience here..."
                                    name='review'
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button className="btn-primary-custom w-full"

                            >
                                Submit Review
                            </button>
                        </form>
                    </div>


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default MyBookings;