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
                                                <button className="btn btn-neutral text-white" onClick={()=>handleCancel(b._id)}>Cancel</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookings;