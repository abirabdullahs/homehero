import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyBookings = () => {


    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const { services } = useContext(AuthContext);


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

        if (!user?.email) return;

        const fetchBookingsByEmail = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER}/bookings/${user.email}`);
                setBookings(res.data || []);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookingsByEmail();
    }, [user?.email]);


    return (
        <div>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md mb-10">
                <table className="table w-full">
                    <thead className="bg-gray-100 text-gray-700 font-semibold">
                        <tr>
                            <th>#</th>
                            <th>Service Name</th>
                            <th>Category</th>
                            <th>Price (৳)</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>


                        {
                            bookings.map((b, index) => {
                                const serviceInfo = services.find(s => s._id === b.serviceId);

                                return (
                                    <tr key={b._id} className="hover:bg-gray-50 transition duration-150">
                                        <td>{index + 1}</td>
                                        <td className="font-medium">{serviceInfo?.serviceName}</td>
                                        <td>{serviceInfo?.category}</td>
                                        <td>{serviceInfo?.price}</td>
                                        <td>
                                            <div className="flex justify-center gap-2">
                                                <button className="btn btn-neutral text-white" onClick={() => handleCancel(b._id)}>Cancel</button>
                                                <button className="btn btn-neutral text-white" onClick={() => {
                                                    setCurrentServiceId(b.serviceId);
                                                    document.getElementById('my_modal_5').showModal();
                                                }}>Review</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }


                    </tbody>
                </table>
            </div>


            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                            Submit Your Review
                        </h2>

                        {/* Rating Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
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
                                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                                    Your Review
                                </label>
                                <textarea
                                    className="w-full p-3 border rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    rows={4}
                                    placeholder="Write your experience here..."
                                    name='review'
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"

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