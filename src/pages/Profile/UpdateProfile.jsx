import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import { AuthContext } from '../../context/Context';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // Local state for form fields
    const [editUser, setEditUser] = useState({
        displayName: '',
        photoURL: '',
        number: '',
        institute: ''
    });

   
    useEffect(() => {
        if (user) {
            setEditUser({
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                number: user.number || '', 
                institute: user.institute || '', 
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!auth.currentUser) {
            toast.error("No user logged in");
            return;
        }

        try {
            
            await updateProfile(auth.currentUser, {
                displayName: editUser.displayName,
                photoURL: editUser.photoURL,
            });

           

            toast.success("Profile updated successfully!");
            navigate("/profile");
        } catch (err) {
            toast.error(err.message || "Failed to update profile");
        }
    };

    return (
        <div className='flex justify-center p-20'>
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl p-5 shadow-md rounded bg-base-100 border border-base-300">
                
                <div>
                    <label className="block mb-1 font-medium text-base-content">Profile Image URL</label>
                    <input
                        type="text"
                        name="photoURL"
                        placeholder="Image URL"
                        value={editUser.photoURL}
                        onChange={handleChange}
                        className="w-full border border-base-300 rounded px-3 py-2 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-base-content">Name</label>
                    <input
                        type="text"
                        name="displayName"
                        placeholder="Name"
                        value={editUser.displayName}
                        onChange={handleChange}
                        className="w-full border border-base-300 rounded px-3 py-2 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-base-content">Number</label>
                    <input
                        type="text"
                        name="number"
                        placeholder="Number"
                        value={editUser.number}
                        onChange={handleChange}
                        className="w-full border border-base-300 rounded px-3 py-2 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-base-content">Institute</label>
                    <input
                        type="text"
                        name="institute"
                        placeholder="Institute"
                        value={editUser.institute}
                        onChange={handleChange}
                        className="w-full border border-base-300 rounded px-3 py-2 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <button
                    type="submit"
                    className="btn-primary-custom w-full"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;
