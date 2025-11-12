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


  const handleEdit = (service) => {
    setEditingService(service);
    document.getElementById("edit_modal").showModal();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedService = {
      serviceName: form.serviceName.value,
      category: form.category.value,
      price: form.price.value,
      description: form.description.value,
      imageUrl: form.imageUrl.value,
    };

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER}/services/${editingService._id}`,
        updatedService
      );

      if (res.data.modifiedCount > 0) {
      
        setMyServices((prev) =>
          prev.map((s) =>
            s._id === editingService._id ? { ...s, ...updatedService } : s
          )
        );

        toast.success("Service updated successfully!");
        document.getElementById("edit_modal").close();
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


      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md">
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
                        className="btn btn-sm btn-outline"
                        onClick={() => handleEdit(service)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error text-white"
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
            <div>
              <label className="block font-medium mb-1">Service Name</label>
              <input
                type="text"
                name="serviceName"
                className="input input-bordered w-full"
                defaultValue={editingService?.serviceName}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                className="input input-bordered w-full"
                defaultValue={editingService?.category}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                className="input input-bordered w-full"
                defaultValue={editingService?.price}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full h-24 resize-none"
                defaultValue={editingService?.description}
              ></textarea>
            </div>

            <div>
              <label className="block font-medium mb-1">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                className="input input-bordered w-full"
                defaultValue={editingService?.imageUrl}
              />
            </div>

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
