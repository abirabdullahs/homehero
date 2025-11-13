import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Context";
import { Loader1 } from "../components/Loader/Loader";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user, services, fetchBookingsByEmail } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [currentServiceId, setCurrentServiceId] = useState(null);

  // -------- Fetch Bookings ----------
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
    return () => (mounted = false);
  }, [user?.email, fetchBookingsByEmail]);

  // -------- Cancel Booking ----------
  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This booking will be canceled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_SERVER}/bookings/${id}`);
        setBookings((prev) => prev.filter((s) => s._id !== id));
        Swal.fire("Canceled!", "Your booking has been removed.", "success");
      } catch (err) {
        toast.error("Failed to cancel booking.");
        console.error(err);
      }
    }
  };

  // -------- Review Handling ----------
  const handleChange = (e) => setRating(parseInt(e.target.value, 10));

  const handleReview = async (e, id) => {
    e.preventDefault();
    const reviewText = e.target.review.value;

    if (rating === 0) return toast.error("Please select a rating");
    if (!reviewText.trim()) return toast.error("Please write a review");

    try {
      await axios.post(`${import.meta.env.VITE_SERVER}/services/${id}/review`, {
        rating,
        comment: reviewText,
        userEmail: user.email,
      });

      toast.success("Review submitted successfully!");
      e.target.reset();
      setRating(0);
      document.getElementById("my_modal_5").close();
      setCurrentServiceId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <Loader1 />
      </div>
    );
  }

  return (
    <div>
      {/* -------- Table for Desktop -------- */}
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
                const serviceInfo = services?.find(
                  (s) => s._id === b.serviceId
                );

                return (
                  <tr
                    key={b._id}
                    className="hover:bg-base-100 transition duration-150"
                  >
                    <td>{index + 1}</td>
                    <td className="font-medium">
                      {serviceInfo?.serviceName || "N/A"}
                    </td>
                    <td>{serviceInfo?.category || "N/A"}</td>
                    <td>{serviceInfo?.price || "N/A"}</td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          className="btn btn-sm bg-error text-white hover:bg-error/80"
                          onClick={() => handleCancel(b._id)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-sm bg-primary text-white hover:bg-primary/80"
                          onClick={() => {
                            setCurrentServiceId(b.serviceId);
                            document.getElementById("my_modal_5").showModal();
                          }}
                        >
                          Review
                        </button>
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

      {/* -------- Mobile Cards -------- */}
      <div className="md:hidden space-y-4">
        {!bookings || bookings.length === 0 ? (
          <div className="p-4 bg-base-100 border border-base-300 rounded-lg text-center text-base-content/70">
            No bookings found.
          </div>
        ) : (
          bookings.map((b, idx) => {
            const serviceInfo = services?.find((s) => s._id === b.serviceId);
            return (
              <div
                key={b._id}
                className="p-4 bg-base-100 border border-base-300 rounded-lg shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-base-content/70">
                      #{idx + 1}
                    </div>
                    <h3 className="font-semibold text-base-content">
                      {serviceInfo?.serviceName || "Service"}
                    </h3>
                    <div className="text-sm text-base-content/60">
                      {serviceInfo?.category || "N/A"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-semibold">
                      ৳ {serviceInfo?.price || "N/A"}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    className="btn btn-sm bg-error text-white flex-1 hover:bg-error/80"
                    onClick={() => handleCancel(b._id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm bg-primary text-white flex-1 hover:bg-primary/80"
                    onClick={() => {
                      setCurrentServiceId(b.serviceId);
                      document.getElementById("my_modal_5").showModal();
                    }}
                  >
                    Review
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* -------- Review Modal -------- */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Submit Your Review
          </h2>

          <form onSubmit={(e) => handleReview(e, currentServiceId)}>
            <div className="mb-4">
              <label className="block text-base-content font-medium mb-2">
                Your Rating
              </label>
              <div className="rating rating-lg mb-4">
                {[1, 2, 3, 4, 5].map((val) => (
                  <input
                    key={val}
                    type="radio"
                    name="rating-stars"
                    value={val}
                    className="mask mask-star-2 rating-star-custom"
                    checked={rating === val}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-base-content font-medium mb-2">
                Your Review
              </label>
              <textarea
                className="w-full p-3 border rounded-lg border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
                placeholder="Write your experience here..."
                name="review"
              ></textarea>
            </div>

            <button className="btn bg-primary text-white w-full hover:bg-primary/80">
              Submit Review
            </button>
          </form>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => 
                {setCurrentServiceId(null)
                document.getElementById("my_modal_5").close();
                }
            }
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyBookings;
