import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Context";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyServices = () => {
    const [myServices, setMyServices] = useState([]);
    const [editingService, setEditingService] = useState(null);

    const { user } = useContext(AuthContext);


    useEffect(() => {
        if (user?.email) {
            axios
                .get(`${import.meta.env.VITE_SERVER}/services/${user.email}`)
                .then((res) => setMyServices(res.data))
                .catch((err) => console.log(err));
        }
    }, [user]);


    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This service will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_SERVER}/services/${id}`);
                setMyServices((prev) => prev.filter((s) => s._id !== id));

                Swal.fire("Deleted!", "Your service has been removed.", "success");
            } catch (err) {
                toast.error("Failed to delete. Please try again.");
                console.error(err);
            }
        }
    };


    const [formData, setFormData] = useState({
        serviceName: "",
        category: "",
        price: "",
        description: "",
        imageUrl: "",
    });

    const handleEdit = (service) => {
        setEditingService(service);
  
        setFormData({
            ...service,
            price:
                service?.price !== undefined && service?.price !== null
                    ? String(service.price)
                    : "",
        }); 

        const modal = document.getElementById("edit_modal");
        if (modal && typeof modal.showModal === "function") {
            modal.showModal();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        // prefer id from formData (set on edit) and fall back to editingService
        const id = formData?._id || editingService?._id;
        if (!id) {
            toast.error("No service selected for update.");
            return;
        }

        const updatedService = { ...formData, price: Number(formData.price) };

        // remove _id from payload because MongoDB _id is immutable and will cause a 500
        const payload = { ...updatedService };
        if (payload._id) delete payload._id;

        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_SERVER}/services/${id}`,
                payload
            );

            // be flexible about success shape: some servers return modifiedCount, others return acknowledged or the updated object
            const success =
                (res?.data && res.data.modifiedCount > 0) ||
                res?.status === 200 ||
                (res?.data && (res.data.acknowledged || res.data.updatedCount > 0));

            if (success) {
                // try to pick the updated object returned by server, otherwise use what we sent
                const updatedObj = res?.data?.updatedService || updatedService;

                setMyServices((prev) =>
                    prev.map((s) => (s._id === id ? { ...s, ...updatedObj } : s))
                );

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Updated successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });

                const modal = document.getElementById("edit_modal");
                if (modal && typeof modal.close === "function") modal.close();
            } else {
                toast("No changes detected.");
            }
        } catch (err) {
            toast.error("Update failed. Try again.");
            console.error(err);
        }
    };


    return (
        <div className="max-w-5xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">My Services</h2>


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
                        {myServices.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    No services found 😔
                                </td>
                            </tr>
                        ) : (
                            myServices.map((service, index) => (
                                <tr
                                    key={service._id}
                                    className="hover:bg-gray-50 transition duration-150"
                                >
                                    <td>{index + 1}</td>
                                    <td className="font-medium">{service.serviceName}</td>
                                    <td>{service.category}</td>
                                    <td>{service.price}</td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className="btn btn-neutral btn-outline"
                                                onClick={() => handleEdit(service)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-neutral text-white"
                                                onClick={() => handleDelete(service._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>


            <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4 text-center">Edit Service</h3>
                    <form className="space-y-4" onSubmit={handleUpdate}>
                        <input
                            type="text"
                            name="serviceName"
                            className="input input-bordered w-full"
                            value={formData.serviceName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="category"
                            className="input input-bordered w-full"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            className="input input-bordered w-full"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="description"
                            className="textarea textarea-bordered w-full h-24 resize-none"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            className="input input-bordered w-full"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />


                        <button type="submit" className="btn btn-primary w-full mt-4">
                            Save Changes
                        </button>
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyServices;
