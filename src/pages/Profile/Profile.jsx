import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Context';

const Profile = () => {

    const { user } = useContext(AuthContext);
    const [customData, setCustomData] = useState({
        number: '',
        institute: ''
    });

    const Navigate = useNavigate();
    
    useEffect(() => {
        if (!user) {
            Navigate("/login");
        } else {
            
            const stored = localStorage.getItem(`userProfile_${user.email}`);
            if (stored) {
                try {
                    const data = JSON.parse(stored);
                    setCustomData({
                        number: data.number || '',
                        institute: data.institute || ''
                    });
                } catch (err) {
                    console.error("Error loading custom data:", err);
                }
            }
        }
    }, [user, Navigate]);

    
    const handleClick = () => {
       Navigate("/update-profile")
      };


    return (
        <div>
            <div className="max-w-full sm:max-w-sm mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden p-6 text-center my-5 border border-base-300">
            
                <img
                    className="w-24 h-24 rounded-full mx-auto border-4 border-primary object-cover"
                    src={user?.photoURL || "https://i.postimg.cc/3JN5Kc5Q/default-avatar.png"}
                    alt="Profile"
                />

           
                <h2 className="mt-4 text-xl font-bold text-base-content">{user?.displayName || "User Name"}</h2>

            
                <div className="mt-2 space-y-1 text-base-content/70">
                    <p><strong className="text-base-content">Email:</strong> {user?.email || "user@example.com"}</p>
                    <p><strong className="text-base-content">Phone:</strong> {customData.number || "+880123456789"}</p>
                    <p><strong className="text-base-content">University:</strong> {customData.institute || "Your University"}</p>
                </div>

                <div>
                    <button className='btn-primary-custom mt-7 w-full' onClick={handleClick}>Update Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;