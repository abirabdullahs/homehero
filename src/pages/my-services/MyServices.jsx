import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Context";
import { Loader1 } from "../../components/Loader/Loader";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyServices = () => {
    const [myServices, setMyServices] = useState([]);
    const [editingService, setEditingService] = useState(null);
    const [loading, setLoading] = useState(true); 
    const { user, fetchServicesByEmail } = useContext(AuthContext);


    useEffect(() => {
        let mounted = true;
        const load = async () => {
            if (!user?.email) return;
            setLoading(true);
            try {
                const data = await fetchServicesByEmail(user.email);
                if (mounted) setMyServices(data || []);
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        load();

        return () => {
            mounted = false;
        };
    }, [user?.email, fetchServicesByEmail]);


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
        
        const id = formData?._id || editingService?._id;
        if (!id) {
            toast.error("No service selected for update.");
            return;
        }

        const updatedService = { ...formData, price: Number(formData.price) };

       
        const payload = { ...updatedService };
        if (payload._id) delete payload._id;

        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_SERVER}/services/${id}`,
                payload
            );

          
            const success =
                (res?.data && res.data.modifiedCount > 0) ||
                res?.status === 200 ||
                (res?.data && (res.data.acknowledged || res.data.updatedCount > 0));

            if (success) {
                
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


    if (loading) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center">
                <Loader1 />
            </div>
        );
    }

    return (
        <div className="max-w-full sm:max-w-5xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">My Services</h2>



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
                                                className="btn-primary-custom btn-sm"
                                                onClick={() => handleEdit(service)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn-danger-custom btn-sm"
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

 
            <div className="md:hidden space-y-4">
                {myServices.length === 0 ? (
                    <div className="p-4 bg-base-100 border border-base-300 rounded-lg text-center text-base-content/70">No services found 😔</div>
                ) : (
                    myServices.map((service, index) => (
                        <div key={service._id} className="p-4 bg-base-100 border border-base-300 rounded-lg shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-sm text-base-content/70">#{index + 1}</div>
                                    <h3 className="font-semibold text-base-content">{service.serviceName}</h3>
                                    <div className="text-sm text-base-content/60">{service.category}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-primary font-semibold">৳ {service.price}</div>
                                </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                                <button className="btn-primary-custom btn-sm flex-1" onClick={() => handleEdit(service)}>Edit</button>
                                <button className="btn-danger-custom btn-sm flex-1" onClick={() => handleDelete(service._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>


            <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4 text-center">Edit Service</h3>
                    <form className="space-y-4" onSubmit={handleUpdate}>
                            <input
                                type="text"
                                name="serviceName"
                                className="input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                value={formData.serviceName}
                                onChange={handleChange}
                                required
                            />
                        <input
                            type="text"
                            name="category"
                            className="input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            className="input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="description"
                            className="textarea textarea-bordered w-full h-24 resize-none bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            className="input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />


                        <button type="submit" className="btn-primary-custom w-full mt-4">
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
