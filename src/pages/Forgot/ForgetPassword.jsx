import React from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';

import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { auth } from '../../firebase/firebase.config';

const ForgetPassword = () => {


    const location = useLocation();
    const {email} = location.state || {};

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const email = e.target.email.value;

        if (!email) {
            toast.error("Please enter your email address!");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Password reset email sent! Check your inbox.");
                setTimeout(() => {
                    window.location.href = "https://mail.google.com/";
                }, 2000);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset className='flex flex-col my-10 justify-center items-center'>
                    <div>
                    <label className="label mb-2">Email</label>
                    <input type="email" className="input" name='email' placeholder="Email" defaultValue={email} />
                    </div>
                    <button className="btn btn-neutral mt-4">Reset Password</button>
                </fieldset>
            </form>
        </div>
    );
};

export default ForgetPassword;