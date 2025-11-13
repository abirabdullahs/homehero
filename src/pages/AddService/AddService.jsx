import React, { useContext } from 'react';
import { AuthContext } from '../../context/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const AddService = () => {

    const { user } = useContext(AuthContext);

    const handleSubmit = async e => {
        e.preventDefault();
        const serviceName = e.target.serviceName.value;
        const category = e.target.category.value;
        const price = e.target.price.value;
        const description = e.target.description.value;
        const imageUrl = e.target.imageUrl.value;
        const name = user.displayName;
        const email = user.email;

        const newService = { serviceName, category, price, description, imageUrl, name, email }

        try {
            const result = await axios.post(`${import.meta.env.VITE_SERVER}/services`, newService)
            console.log(result);
            e.target.reset();

            Swal.fire({
                title: "Your Service has been Added",
                text: "Please Close it",
                imageUrl: imageUrl,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image"
            });
        }
        catch (err) {
            console.log(err);
            toast.error("please try again")
        }



    }
    return (
        <div className="max-w-full sm:max-w-2xl mx-auto p-6 bg-base-100 border border-base-300 rounded-lg shadow-md mt-10 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-base-content">Add New Service</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>

                {/* Service Name */}
                <div>
                    <label className="block mb-1 font-medium text-base-content">Service Name</label>
                    <input
                        type="text"
                        name="serviceName"
                        placeholder="Enter service name"
                        className="input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-1 font-medium text-base-content">Category</label>
                    <input
                        type="text"
                        name="category"
                        placeholder="Enter category"
                        className="input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 font-medium text-base-content">Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        className="input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium text-base-content">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter service description"
                        className="textarea textarea-bordered w-full h-24 resize-none bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    ></textarea>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block mb-1 font-medium text-base-content">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Enter image URL"
                        className="input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                {/* Provider Name */}
                <div>
                    <label className="block mb-1 font-medium text-base-content">Provider Name</label>
                    <input
                        type="text"
                        name="providerName"
                        placeholder="Enter provider name"
                        className="input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        value={user.displayName}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium text-base-content">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        value={user.email}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn-primary-custom w-full mt-4"
                >
                    Add Service
                </button>
            </form>
        </div>
    );
};

export default AddService;
