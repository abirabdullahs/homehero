import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Context';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyServices = () => {
    const [myServices, setMyServices] = useState([]);

    const { user } = useContext(AuthContext)
    useEffect(() => {
        if (user?.email) {
            axios.get(`${import.meta.env.VITE_SERVER}/services/${user.email}`)
                .then(res => {
                    console.log(res.data)
                    setMyServices(res.data);
                })
                .catch(err => console.log(err))
        }
    }, [user])


    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const res = axios.delete(`${import.meta.env.VITE_SERVER}/services/${id}`,)
                console.log(res);
                setMyServices(myServices.filter((service) => service._id !== id));

            }
        });

    }

    const [editingService, setEditingService] = useState(null);

    const handleEdit = (service) => {
        setEditingService(service);
        document.getElementById('my_modal_5').showModal()
    }


    const handleUpdate = async (e, id) => {
        e.preventDefault();

        const serviceName = e.target.serviceName.value;
        const description = e.target.description.value;
        const imageURL = e.target.imageURL.value;
        const price = e.target.price.value;
        const category = e.target.category.value;

        const updateBody = { serviceName, category, price, imageURL, description };

        try {
            const res = await axios.patch(`${import.meta.env.VITE_SERVER}/services/${id}`, updateBody);

            if (res.data.modifiedCount > 0) {
                setMyServices(prev =>
                    prev.map(service =>
                        service._id === id ? { ...service, ...updateBody } : service
                    )
                );


                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

            console.log("Updated successfully!");
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myServices.map((service, index) => (
                            <tr key={service._id || index} className={index % 2 === 1 ? "hover:bg-base-300" : ""}>
                                <th>{index + 1}</th>
                                <td>{service.serviceName}</td>
                                <td>{service.category}</td>
                                <td>{service.price}</td>
                                <td>
                                    <div className="flex gap-2 justify-center">
                                        <button className="btn btn-neutral" onClick={() => handleEdit(service)}>Edit</button>
                                        <button className="btn btn-neutral" onClick={() => handleDelete(service._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form className="space-y-4">

                        {/* Service Name */}
                        <div>
                            <label className="block mb-1 font-medium">Service Name</label>
                            <input
                                type="text"
                                name="serviceName"
                                placeholder="Enter service name"
                                className="input input-bordered w-full"
                                defaultValue={editingService?.serviceName || ""}
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block mb-1 font-medium">Category</label>
                            <input
                                type="text"
                                name="category"
                                placeholder="Enter category"
                                className="input input-bordered w-full"
                                defaultValue={editingService?.category || ""}
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block mb-1 font-medium">Price</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="Enter price"
                                className="input input-bordered w-full"
                                defaultValue={editingService?.price || ""}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-1 font-medium">Description</label>
                            <textarea
                                name="description"
                                placeholder="Enter service description"
                                className="textarea textarea-bordered w-full h-24 resize-none"
                                defaultValue={editingService?.description || ""}
                            ></textarea>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block mb-1 font-medium">Image URL</label>
                            <input
                                type="text"
                                name="imageUrl"
                                placeholder="Enter image URL"
                                className="input input-bordered w-full"
                                defaultValue={editingService?.imageURL || ""}
                            />
                        </div>

                        {/* Provider Name */}
                        <div>
                            <label className="block mb-1 font-medium">Provider Name</label>
                            <input
                                type="text"
                                name="providerName"
                                placeholder="Enter provider name"
                                className="input input-bordered w-full"
                                value={user?.displayName}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                value={user?.email}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-4"
                            onClick={() => handleUpdate(editingService._id)}
                        >
                            Update
                        </button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Cencel</button>
                        </form>
                    </div>
                </div>
            </dialog>


        </div>
    );
};

export default MyServices;